import Link from "next/link";

function RecipesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header className="bg-black py-2">
                <nav className="flex justify-between items-center">
                    <Link
                        href={"/recipes"}
                        className="text-2xl text-white font-bold mx-2"
                    >
                        Food Recipe Manager
                    </Link>
                    <Link href={"/"} className="text-white font-bold mx-2">
                        Logout
                    </Link>
                </nav>
            </header>
            {children}
        </div>
    );
}

export default RecipesLayout;
