import Link from "next/link";
import SignOutComponent from "../components/SignOutComponent";

function RecipeListLayout({ children }: { children: React.ReactNode }) {
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
                    <div className="flex items-center">
                        <SignOutComponent className="text-white font-bold mx-2" />
                    </div>
                </nav>
            </header>
            {children}
        </div>
    );
}

export default RecipeListLayout;
