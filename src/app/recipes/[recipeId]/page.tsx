import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { RecipeInterface } from "@/types/typings";
import Image from "next/image";

type Props = {
    params: { recipeId: string };
};

async function RecipePage({ params: { recipeId } }: Props) {
    const user = await getServerSessionUser();
    const {
        name,
        description,
        image,
        ingredients,
        instructions,
    }: RecipeInterface = (
        await adminFirestore
            .collection("userContent")
            .doc(user.id)
            .collection("recipes")
            .doc(recipeId)
            .get()
    ).data() as RecipeInterface;

    return (
        <main className="flex flex-col space-y-3">
            <Image
                src={image || RECIPE_PLACEHOLDER}
                alt="test"
                width={400}
                height={400}
            />
            <h1>Name: {name}</h1>
            <h2>Description: {description}</h2>

            <p>Ingredients:</p>
            {ingredients}
            <p>Instructions:</p>
            <p>{instructions}</p>
        </main>
    );
}

export default RecipePage;
