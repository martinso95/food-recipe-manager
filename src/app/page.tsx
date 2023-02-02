import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col space-y-5 items-center justify-center h-screen">
            <h1 className="text-6xl font-bold">
                Welcome to Food Recipe Manager
            </h1>
            <Link
                className="text-4xl bg-blue-600 w-44 flex items-center justify-center py-4 rounded-lg text-white font-bold"
                href="/recipes"
            >
                Login
            </Link>
        </main>
    );
}
