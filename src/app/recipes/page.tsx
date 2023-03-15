import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { getPlaiceholder } from "plaiceholder";
import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import { ADD_RECIPE } from "@/utils/routes";
import RecipesEmptyState from "./RecipesEmptyState";
import { Recipe, RecipeListCardProps } from "@/types/typings";
import RecipeListCard from "./RecipeListCard";
import RecipeListPagination from "./RecipeListPagination";

type Props = {
    searchParams?: { [key: string]: string | undefined };
};
async function RecipeListPage({ searchParams }: Props) {
    const user = await getServerSessionUser();

    console.log(searchParams);

    const recipesCollection = adminFirestore
        .collection("userContent")
        .doc(user.id)
        .collection("recipes");

    const totalRecipes = (await recipesCollection.count().get()).data().count;

    const recipeDocuments = (
        await recipesCollection
            .orderBy("nameLowerCase")
            .limit(2)
            // .startAt("a6b3e5f8-f35b-4d14-9b52-6c81eb535a41")
            .get()
    ).docs;

    const recipeList: RecipeListCardProps[] = await Promise.all(
        recipeDocuments.map(async (recipeDocument) => {
            const recipe: Recipe = recipeDocument.data() as Recipe;
            const recipeListCard: RecipeListCardProps = {
                ...recipe,
                recipeId: recipeDocument.id,
            };
            if (recipe.image != null) {
                const { img, base64 } = await getPlaiceholder(recipe.image.url);
                recipeListCard.image = {
                    ...recipe.image,
                    url: img.src,
                    blurData: base64,
                };
            }
            return recipeListCard;
        })
    );

    return (
        <main className="page flex flex-col justify-center items-center space-y-6">
            {recipeDocuments.length === 0 ? (
                <RecipesEmptyState />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[1fr]">
                        {recipeList.map((recipe) => (
                            <RecipeListCard
                                key={recipe.recipeId}
                                recipe={recipe}
                            />
                        ))}
                    </div>
                    <RecipeListPagination firstRecipeId="" lastRecipeId="" />
                </>
            )}
            <Link
                href={ADD_RECIPE}
                className="fixed right-6 bottom-6 flex items-center justify-center text-white rounded-lg w-16 h-16 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800"
            >
                <PlusIcon className="h-8 w-8" />
            </Link>
        </main>
    );
}

export default RecipeListPage;
