import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { getPlaiceholder } from "plaiceholder";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import ImageWithFallback from "../components/ImageWithFallback";
import { ADD_RECIPE, RECIPES } from "@/utils/routes";
import RecipesEmptyState from "./RecipesEmptyState";
import { Recipe, RecipeListCard } from "@/types/typings";

async function RecipeListPage() {
    const user = await getServerSessionUser();
    const recipeDocuments = (
        await adminFirestore
            .collection("userContent")
            .doc(user.id)
            .collection("recipes")
            .get()
    ).docs;

    const recipeList: RecipeListCard[] = await Promise.all(
        recipeDocuments.map(async (recipeDocument) => {
            const recipe: Recipe = recipeDocument.data() as Recipe;
            const recipeListCard: RecipeListCard = {
                ...recipe,
                recipeId: recipeDocument.id,
            };
            if (recipe.image != null) {
                recipeListCard.image = {
                    ...recipe.image,
                    blurData: (await getPlaiceholder(recipe.image.url)).base64,
                };
            }
            return recipeListCard;
        })
    );

    return (
        <main className="page">
            {recipeDocuments.length === 0 ? (
                <RecipesEmptyState />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[1fr]">
                    {recipeList.map(
                        ({ recipeId, image, name, description, time }) => (
                            <Link
                                href={`${RECIPES}/${recipeId}`}
                                key={recipeId}
                                className="flex flex-col mx-auto bg-gray-800 border border-gray-500 rounded-lg shadow min-w-[14rem] w-full"
                            >
                                <ImageWithFallback
                                    src={image?.url}
                                    alt="Recipe image"
                                    width={400}
                                    height={400}
                                    fallback={RECIPE_PLACEHOLDER}
                                    placeholder={
                                        image != null ? "blur" : undefined
                                    }
                                    blurDataURL={
                                        image != null
                                            ? image.blurData
                                            : undefined
                                    }
                                    className="mb-2 rounded-t-lg object-cover h-1/2"
                                />
                                <h5
                                    title={name}
                                    className="mb-2 mx-5 text-xl font-bold text-white line-clamp-2"
                                >
                                    {name}
                                </h5>
                                <p className="mb-2 mx-5 font-normal text-gray-400 line-clamp-4">
                                    {description}
                                </p>
                                <p className="mb-2 mx-5 font-bold text-sm text-gray-300 line-clamp-1">
                                    {time}
                                </p>
                            </Link>
                        )
                    )}
                </div>
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
