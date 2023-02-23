import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { Recipe } from "@/types/typings";
import RecipeContainer from "./RecipeContainer";

type Props = {
    params: { recipeId: string };
};

async function RecipePage({ params: { recipeId } }: Props) {
    const user = await getServerSessionUser();
    const recipe: Recipe = (
        await adminFirestore
            .collection("userContent")
            .doc(user.id)
            .collection("recipes")
            .doc(recipeId)
            .get()
    ).data() as Recipe;

    return (
        <main className="flex flex-col space-y-3">
            <RecipeContainer recipeId={recipeId} recipe={recipe} />
        </main>
    );
}

export default RecipePage;
