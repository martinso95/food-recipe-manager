import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { Recipe } from "@/types/typings";
import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import { ADD_RECIPE } from "@/utils/routes";
import {
    RecipeListPageSearchParams,
    getRecipeListData,
} from "./RecipeList.utils";
import RecipesEmptyState from "./components/RecipesEmptyState";
import RecipeListCard from "./components/RecipeListCard";
import RecipeListPagination from "./components/RecipeListPagination";
import RecipeListSearch from "./components/RecipeListSearch";
import RecipesNotFound from "./components/RecipesNotFound";

type Props = {
    searchParams?: RecipeListPageSearchParams;
};

async function RecipeListPage({ searchParams }: Props) {
    const user = await getServerSessionUser();

    const recipesCollection = adminFirestore
        .collection("userContent")
        .doc(user.id)
        .collection("recipes");

    const {
        items: recipeDocuments,
        firstItem,
        lastItem,
        nextDisabled,
        previousDisabled,
    } = await getRecipeListData(searchParams, recipesCollection);

    const recipeList: Recipe[] = recipeDocuments.map(
        (recipeDocument) => recipeDocument.data() as Recipe
    );

    return (
        <main className="page flex flex-col justify-center items-center space-y-6">
            {recipeList.length === 0 && searchParams?.searchValue == null ? (
                <RecipesEmptyState />
            ) : (
                <>
                    <div className="flex flex-wrap w-full items-center gap-2 justify-between">
                        <RecipeListSearch
                            initialValue={searchParams?.searchValue}
                        />
                    </div>
                    {recipeList.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[1fr]">
                                {recipeList.map((recipe) => (
                                    <RecipeListCard
                                        key={recipe.recipeId}
                                        recipe={recipe}
                                    />
                                ))}
                            </div>
                            <RecipeListPagination
                                currentSearchValue={searchParams?.searchValue}
                                firstRecipeId={firstItem}
                                lastRecipeId={lastItem}
                                nextDisabled={nextDisabled}
                                previousDisabled={previousDisabled}
                            />
                        </>
                    ) : (
                        <RecipesNotFound />
                    )}
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
