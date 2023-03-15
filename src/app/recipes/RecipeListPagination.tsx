import { RECIPES } from "@/utils/routes";
import Link from "next/link";

type Props = {
    firstRecipeId: string;
    lastRecipeId: string;
    nextDisabled: boolean;
    previousDisabled: boolean;
    className?: string;
};
function RecipeListPagination({
    firstRecipeId,
    lastRecipeId,
    nextDisabled,
    previousDisabled,
    className,
}: Props) {
    return (
        <nav aria-label="Recipe list pagination" className={className}>
            <Link
                href={{
                    pathname: `${RECIPES}`,

                    query: { previousPageEndBefore: firstRecipeId },
                }}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 ${
                    previousDisabled
                        ? "pointer-events-none text-gray-400 font-light"
                        : "text-white font-medium"
                }`}
            >
                Previous
            </Link>
            <Link
                href={{
                    pathname: `${RECIPES}`,

                    query: { nextPageStartAfter: lastRecipeId },
                }}
                className={`inline-flex items-center px-4 py-2 ml-3 text-sm border rounded-lg bg-gray-800 border-gray-700 hover:bg-gray-700 ${
                    nextDisabled
                        ? "pointer-events-none text-gray-400 font-light"
                        : "text-white font-medium"
                }`}
            >
                Next
            </Link>
        </nav>
    );
}

export default RecipeListPagination;
