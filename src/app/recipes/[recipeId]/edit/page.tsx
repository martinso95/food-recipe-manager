import { adminFirestore } from "@/firebase/firebaseAdmin";
import { notFound } from "next/navigation";
import { Recipe } from "@/types/typings";
import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import RecipePageEditor from "./components/RecipePageEditor";

const getRecipe = async (recipeId: string) => {
    const user = await getServerSessionUser();

    const recipe: Recipe = (
        await adminFirestore
            .collection("userContent")
            .doc(user.id)
            .collection("recipes")
            .doc(recipeId)
            .get()
    ).data() as Recipe;

    return recipe;
};

type Props = {
    params: { recipeId: string };
};

async function EditRecipePage({ params: { recipeId } }: Props) {
    const recipe = await getRecipe(recipeId);

    if (recipe == null) {
        notFound();
    }

    return (
        <main className="page">
            <RecipePageEditor recipeId={recipeId} recipe={recipe} />
        </main>
    );
}

export default EditRecipePage;
