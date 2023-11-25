import { unstable_noStore as noStore } from 'next/cache';
import { sql } from "@vercel/postgres";
import { Customer, CustomersTable } from "@/app/lib/definitions";
import { formatCurrency } from '@/app/lib/utils';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredCustomers(
    query: string,
    currentPage: number
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

        const customers = data.rows.map((customer) => ({
            ...customer,
            total_pending: formatCurrency(customer.total_pending),
            total_paid: formatCurrency(customer.total_paid),
        }));

        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customer table.');
    }
}

export async function fetchCustomerById(id: string) {
    noStore();
    try {
        const customer = await sql`SELECT * FROM customers
        WHERE id = ${id}`;
        return customer.rows[0] as Customer;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch customer with id ${id}`);
    }
}

export async function fetchCustomersTotal() {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
    FROM customers
  `;
        const totalPages = Math.ceil(
            Number(count.rows[0].count) / ITEMS_PER_PAGE
        );
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of customers.');
    }
}