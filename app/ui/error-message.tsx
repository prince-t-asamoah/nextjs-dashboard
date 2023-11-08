export default function ErrorMessage({
    id,
    message,
}: {
    id?: string;
    message: string;
}) {
    return (
        <div id={id} aria-live="polite" className="mt-2 text-sm text-red-500">
            <p>{message}</p>
        </div>
    );
}
