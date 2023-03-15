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

const PAGE_LIMIT = 2;
type PaginationData = {
    items: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[];
    firstItem: string;
    lastItem: string;
    previousDisabled: boolean;
    nextDisabled: boolean;
};

const getInitialPaginationItems = async (
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
): Promise<PaginationData> => {
    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await recipesCollection
                .orderBy("orderValue")
                .limit(PAGE_LIMIT + 1)
                .get()
        ).docs;
    const nextDisabled = recipeDocuments.length <= PAGE_LIMIT;
    if (recipeDocuments.length === PAGE_LIMIT + 1) {
        recipeDocuments.splice(-1);
    }

    const firstRecipeDocument = recipeDocuments[0].data().orderValue;
    const lastRecipeDocument =
        recipeDocuments[recipeDocuments.length - 1].data().orderValue;

    console.log("what is first:", recipeDocuments[0].data().name);
    console.log(
        "what is last:",
        recipeDocuments[recipeDocuments.length - 1].data().name
    );
    console.log("items:", recipeDocuments.map((x) => x.data().name).toString());
    return {
        items: recipeDocuments,
        firstItem: firstRecipeDocument,
        lastItem: lastRecipeDocument,
        previousDisabled: true,
        nextDisabled: nextDisabled,
    };
};

const getNextItems = async (
    currentLastItem: string,
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
): Promise<PaginationData> => {
    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await recipesCollection
                .orderBy("orderValue")
                .startAfter(currentLastItem)
                .limit(PAGE_LIMIT + 1)
                .get()
        ).docs;
    const nextDisabled = recipeDocuments.length <= PAGE_LIMIT;
    if (recipeDocuments.length === PAGE_LIMIT + 1) {
        recipeDocuments.splice(-1);
    }

    const firstRecipeDocument = recipeDocuments[0].data().orderValue;
    const lastRecipeDocument =
        recipeDocuments[recipeDocuments.length - 1].data().orderValue;

    console.log("what is first:", recipeDocuments[0].data().name);
    console.log(
        "what is last:",
        recipeDocuments[recipeDocuments.length - 1].data().name
    );
    console.log("items:", recipeDocuments.map((x) => x.data().name).toString());
    return {
        items: recipeDocuments,
        firstItem: firstRecipeDocument,
        lastItem: lastRecipeDocument,
        previousDisabled: false,
        nextDisabled: nextDisabled,
    };
};

const getPreviousItems = async (
    currentFirstItem: string,
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
): Promise<PaginationData> => {
    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await recipesCollection
                .orderBy("orderValue")
                .endBefore(currentFirstItem)
                .limitToLast(PAGE_LIMIT + 1)
                .get()
        ).docs;
    const previousDisabled = recipeDocuments.length <= PAGE_LIMIT;
    if (recipeDocuments.length === PAGE_LIMIT + 1) {
        recipeDocuments.splice(0, 1);
    }

    const firstRecipeDocument = recipeDocuments[0].data().orderValue;
    const lastRecipeDocument =
        recipeDocuments[recipeDocuments.length - 1].data().orderValue;

    console.log("what is first:", recipeDocuments[0].data().name);
    console.log(
        "what is last:",
        recipeDocuments[recipeDocuments.length - 1].data().name
    );

    console.log("items:", recipeDocuments.map((x) => x.data().name).toString());

    return {
        items: recipeDocuments,
        firstItem: firstRecipeDocument,
        lastItem: lastRecipeDocument,
        previousDisabled: previousDisabled,
        nextDisabled: false,
    };
};

type Props = {
    searchParams?: { [key: string]: string | undefined };
};
async function RecipeListPage({ searchParams }: Props) {
    const user = await getServerSessionUser();

    const recipesCollection = adminFirestore
        .collection("userContent")
        .doc(user.id)
        .collection("recipes");

    let currentPaginationData: PaginationData;

    if (searchParams != null && searchParams.nextPageStartAfter != null) {
        console.log("next");
        currentPaginationData = await getNextItems(
            searchParams.nextPageStartAfter,
            recipesCollection
        );
    } else if (
        searchParams != null &&
        searchParams.previousPageEndBefore != null
    ) {
        console.log("prev");
        currentPaginationData = await getPreviousItems(
            searchParams.previousPageEndBefore,
            recipesCollection
        );
    } else {
        console.log("initial");
        currentPaginationData = await getInitialPaginationItems(
            recipesCollection
        );
    }

    const {
        items: recipeDocuments,
        firstItem,
        lastItem,
        nextDisabled,
        previousDisabled,
    } = currentPaginationData;

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
                    <RecipeListPagination
                        firstRecipeId={firstItem}
                        lastRecipeId={lastItem}
                        nextDisabled={nextDisabled}
                        previousDisabled={previousDisabled}
                    />
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
