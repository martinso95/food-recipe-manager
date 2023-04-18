/**
 * This is fully utilizing Firebase firestore pagination strategy.
 * This pagination is limited to only being able to go to next or previous. And we start at page 1.
 * Firestore does not provide a good solution for a numbered pagination.
 * It is possible to do it, but it would cost a lot of reads. So we lose on cost and performance.
 * Firestore reads will be expensive if you have to read thousands of items on every pagination.
 */

const PAGE_LIMIT = 20;

export type PaginationPageSearchParams = Record<
    "nextPageStartAfter" | "previousPageEndBefore",
    string
>;

export type PaginationData = {
    items: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[];
    firstItem: string;
    lastItem: string;
    previousDisabled: boolean;
    nextDisabled: boolean;
};

const emptyPaginationData = {
    items: [],
    firstItem: "",
    lastItem: "",
    previousDisabled: true,
    nextDisabled: true,
};

export const getInitialPaginationData = async (
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
): Promise<PaginationData> => {
    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await recipesCollection
                .orderBy("orderValue")
                .limit(PAGE_LIMIT + 1) // Intentionally fetch one more than the page limit, to find out if there are more items in next or previous.
                .get()
        ).docs;

    if (recipeDocuments.length === 0) {
        return emptyPaginationData;
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

export const getNextPaginationData = async (
    currentLastItem: string,
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
): Promise<PaginationData> => {
    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await recipesCollection
                .orderBy("orderValue")
                .startAfter(currentLastItem)
                .limit(PAGE_LIMIT + 1) // Intentionally fetch one more than the page limit, to find out if there are more items in next or previous.
                .get()
        ).docs;

    if (recipeDocuments.length === 0) {
        return emptyPaginationData;
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

export const getPreviousPaginationData = async (
    currentFirstItem: string,
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
): Promise<PaginationData> => {
    const recipeDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
        (
            await recipesCollection
                .orderBy("orderValue")
                .endBefore(currentFirstItem)
                .limitToLast(PAGE_LIMIT + 1) // Intentionally fetch one more than the page limit, to find out if there are more items in next or previous.
                .get()
        ).docs;

    if (recipeDocuments.length === 0) {
        return emptyPaginationData;
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

export const getPaginationData = async (
    searchParams: PaginationPageSearchParams | undefined,
    recipesCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
): Promise<PaginationData> => {
    if (searchParams != null && searchParams.nextPageStartAfter != null) {
        return await getNextPaginationData(
            searchParams.nextPageStartAfter,
            recipesCollection
        );
    }
    if (searchParams != null && searchParams.previousPageEndBefore != null) {
        return await getPreviousPaginationData(
            searchParams.previousPageEndBefore,
            recipesCollection
        );
    }

    return await getInitialPaginationData(recipesCollection);
};
