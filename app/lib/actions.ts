'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CustomerFormState, InvoiceFormState } from './definitions';
import { signIn } from '@/auth';
import { uploadImage } from '../service/cloudinary';

const InvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater thatn $0' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status',
    }),
    date: z.string(),
});

const CustomerSchema = z.object({
    fullName: z
        .string()
        .min(1, { message: 'Please provide customer fullname' }),
    email: z
        .string()
        .min(1, { message: 'Please provide customer email' })
        .email({ message: 'Email format not valid' }),
    profileImage: z.instanceof(File).refine(
        (file) => {
            if (file.type === 'application/octet-stream') return true;
            if (file.type.includes('image')) return true;
            return false;
        },
        {
            message: 'Only image files are allowed.',
        }
    ),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(
    _state: InvoiceFormState,
    formData: FormData
) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
        console.error(
            'Database Error: Failed to creating invoice',
            '\n',
            error
        );
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(
    id: string,
    _state: InvoiceFormState,
    formData: FormData
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create invoice.',
        };
    }
    const { customerId, amount, status } = validatedFields.data;

    const amountInCents = amount * 100;
    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
          `;
    } catch (error) {
        console.error('Database Error: Failure to update invoice', '\n', error);
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
    } catch (error) {
        console.error('Database Error: Failed to delete invoice', '\n', error);
    }
    revalidatePath('/dashboard/invoices');
}

export async function authenticate(
    _prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', Object.fromEntries(formData));
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialSignin';
        }
        throw error;
    }
}

//Customers
export async function addCustomers(
    state: CustomerFormState,
    formData: FormData
) {
    const validatedFields = CustomerSchema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        profileImage: formData.get('profileImage'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to add new customers.',
        };
    }
    const { fullName, email, profileImage } = validatedFields.data;

    try {
        const user = await sql`
        INSERT INTO customers (name, email)
        VALUES (${fullName}, ${email})
      `;
        if (user) {
            // if (profileImage.size > 0) {
            //     const uploadedImage = await uploadImage(profileImage);
            //     await sql`UPDATE customers
            //     SET image_url = '${uploadedImage.secure_url}'
            //     WHERE id = '${user.rows[0].id}'`;
            // }
            revalidatePath('/dashboard/customers');
        }
    } catch (error) {
        console.error(
            'Database Error: Failed to adding customers',
            '\n',
            error
        );
        return {
            ...state,
            message: 'Error adding new customer',
        };
    }
    redirect('/dashboard/customers');
}

export async function updateCustomer(
    id: string,
    state: CustomerFormState,
    formData: FormData
) {
    const validatedFields = CustomerSchema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        profileImage: formData.get('profileImage'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update customer.',
        };
    }
    const { fullName, email, profileImage } = validatedFields.data;

    try {
        const user = await sql`
            UPDATE customers
            SET name=${fullName}, email=${email}
            WHERE id=${id}
          `;
        if (user) {
            // if (profileImage.size > 0) {
            //     const uploadedImage = await uploadImage(profileImage);
            //     await sql`UPDATE customers
            //     SET image_url = '${uploadedImage.secure_url}'
            //     WHERE id = '${user.rows[0].id}'`;
            // }
            revalidatePath('/dashboard/customers');
        }
    } catch (error) {
        console.error(
            'Database Error: Failed to update customers',
            '\n',
            error
        );
        return {
            ...state,
            message: 'Error updating customer',
        };
    }
    redirect('/dashboard/customers');
}
