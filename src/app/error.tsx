"use client";

export default function RootError({ reset }: { reset: () => void }) {
    return (
        <div className="page space-y-6">
            <h1 className="page-title">Something went wrong</h1>
            <button onClick={() => reset()} className="button">
                Try again
            </button>
        </div>
    );
}
