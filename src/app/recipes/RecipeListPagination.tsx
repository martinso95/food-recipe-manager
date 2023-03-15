import { RECIPES } from "@/utils/routes";
import Link from "next/link";

type Props = {
    firstRecipeId: string;
    lastRecipeId: string;
    className?: string;
};
function RecipeListPagination({
    firstRecipeId,
    lastRecipeId,
    className,
}: Props) {
    return (
        <nav aria-label="Recipe list pagination" className={className}>
            <Link
                href={{
                    pathname: `${RECIPES}`,

                    query: { pageStartBefore: firstRecipeId },
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                Previous
            </Link>
            <Link
                href={{
                    pathname: `${RECIPES}`,

                    query: { pageStartAfter: lastRecipeId },
                }}
                className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                Next
            </Link>
        </nav>
    );
}

export default RecipeListPagination;
