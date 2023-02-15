"use client";

export default function RootError({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    console.error(error);

    return (
        <html>
            <head></head>
            <body>
                <h2>Something went wrong!</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    );
}
