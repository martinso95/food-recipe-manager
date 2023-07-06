"use client";

export default function EditRecipePageError({ reset }: { reset: () => void }) {
    return (
        <div className="page space-y-6">
            <h1 className="page-title">Something went wrong</h1>
            <button onClick={() => reset()} className="primary-button">
                Try again
            </button>
        </div>
    );
}
