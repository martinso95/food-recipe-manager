import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import NavBar from "../components/NavBar";

async function RecipeListLayout({ children }: { children: React.ReactNode }) {
    const user = await getServerSessionUser();

    return (
        // 60px is the height of the NavBar.
        <div className="flex flex-col space-y-[60px]">
            <NavBar user={user} />
            {children}
        </div>
    );
}

export default RecipeListLayout;
