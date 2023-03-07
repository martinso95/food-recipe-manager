import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import NavBar from "../components/NavBar";

async function RecipeListLayout({ children }: { children: React.ReactNode }) {
    const user = await getServerSessionUser();

    return (
        <div className="flex flex-col">
            <NavBar user={user} />
            {children}
        </div>
    );
}

export default RecipeListLayout;
