/**
 * Firebase firestore querying utils.
 * - Basic prefix search
 *
 * - Next/previous pagination
 * This pagination is limited to only being able to go to next or previous. And we start at page 1.
 * Firestore does not provide a good solution for a numbered pagination.
 * It is possible to do it, but it would cost a lot of reads. So we lose on cost and performance.
 * Firestore reads will be expensive if you have to read thousands of items on every pagination.
 */

export type RecipeListPageSearchParams = Record<
    "nextPageStartAfter" | "previousPageEndBefore" | "searchValue",
    string
>;

const PAGE_LIMIT = 20;

export type ListData = {
    items: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[];
    firstItem: string;
    lastItem: string;
    previousDisabled: boolean;
    nextDisabled: boolean;
};

const emptyListData = {
    items: [],
    firstItem: "",
    lastItem: "",
    previousDisabled: true,
    nextDisabled: true,
};

export const getListData = async (
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    searchValue?: string
): Promise<ListData> => {
    let query = recipesCollection.orderBy("orderValue");

    if (searchValue) {
        query = query
            .startAt(searchValue.toLowerCase())
            .endAt(searchValue.toLowerCase() + "~");
    }

    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await query
                .limit(PAGE_LIMIT + 1) // Intentionally fetch one more than the page limit, to find out if there are more items in next or previous.
                .get()
        ).docs;

    if (recipeDocuments.length === 0) {
        return emptyListData;
    }

    // If we were able to fetch more than the page limit, then we can go to next or previos.
    // Otherwise, disable the next or previous buttons.
    const nextDisabled = recipeDocuments.length <= PAGE_LIMIT;

    if (recipeDocuments.length === PAGE_LIMIT + 1) {
        recipeDocuments.splice(-1);
    }

    const firstRecipeDocument = recipeDocuments[0].data().orderValue;
    const lastRecipeDocument =
        recipeDocuments[recipeDocuments.length - 1].data().orderValue;

    return {
        items: recipeDocuments,
        firstItem: firstRecipeDocument,
        lastItem: lastRecipeDocument,
        previousDisabled: true, // Disable previous button by default on page 1.
        nextDisabled: nextDisabled,
    };
};

export const getNextListData = async (
    currentLastItem: string,
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    searchValue?: string
): Promise<ListData> => {
    let query = recipesCollection.orderBy("orderValue");

    if (searchValue) {
        query = query
            .startAt(searchValue.toLowerCase())
            .endAt(searchValue.toLowerCase() + "~");
    }

    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await query
                .startAfter(currentLastItem)
                .limit(PAGE_LIMIT + 1) // Intentionally fetch one more than the page limit, to find out if there are more items in next or previous.
                .get()
        ).docs;

    if (recipeDocuments.length === 0) {
        return emptyListData;
    }

    // If we were able to fetch more than the page limit, then we can go to next or previos.
    // Otherwise, disable the next or previous buttons.
    const nextDisabled = recipeDocuments.length <= PAGE_LIMIT;

    if (recipeDocuments.length === PAGE_LIMIT + 1) {
        recipeDocuments.splice(-1);
    }

    const firstRecipeDocument = recipeDocuments[0].data().orderValue;
    const lastRecipeDocument =
        recipeDocuments[recipeDocuments.length - 1].data().orderValue;

    return {
        items: recipeDocuments,
        firstItem: firstRecipeDocument,
        lastItem: lastRecipeDocument,
        previousDisabled: false,
        nextDisabled: nextDisabled,
    };
};

export const getPreviousListData = async (
    currentFirstItem: string,
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    searchValue?: string
): Promise<ListData> => {
    let query = recipesCollection.orderBy("orderValue");

    if (searchValue) {
        query = query
            .startAt(searchValue.toLowerCase())
            .endAt(searchValue.toLowerCase() + "~");
    }

    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await query
                .endBefore(currentFirstItem)
                .limitToLast(PAGE_LIMIT + 1) // Intentionally fetch one more than the page limit, to find out if there are more items in next or previous.
                .get()
        ).docs;

    if (recipeDocuments.length === 0) {
        return emptyListData;
    }

    // If we were able to fetch more than the page limit, then we can go to next or previos.
    // Otherwise, disable the next or previous buttons.
    const previousDisabled = recipeDocuments.length <= PAGE_LIMIT;

    if (recipeDocuments.length === PAGE_LIMIT + 1) {
        recipeDocuments.splice(0, 1);
    }

    const firstRecipeDocument = recipeDocuments[0].data().orderValue;
    const lastRecipeDocument =
        recipeDocuments[recipeDocuments.length - 1].data().orderValue;

    return {
        items: recipeDocuments,
        firstItem: firstRecipeDocument,
        lastItem: lastRecipeDocument,
        previousDisabled: previousDisabled,
        nextDisabled: false,
    };
};

export const getRecipeListData = async (
    searchParams: RecipeListPageSearchParams | undefined,
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
): Promise<ListData> => {
    if (searchParams != null && searchParams.nextPageStartAfter != null) {
        return await getNextListData(
            searchParams.nextPageStartAfter,
            recipesCollection,
            searchParams.searchValue
        );
    }
    if (searchParams != null && searchParams.previousPageEndBefore != null) {
        return await getPreviousListData(
            searchParams.previousPageEndBefore,
            recipesCollection,
            searchParams.searchValue
        );
    }

    return await getListData(recipesCollection, searchParams?.searchValue);
};
