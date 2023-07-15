import Link from "next/link";
import { RECIPES } from "@/utils/routes";

function RecipesNotFound() {
    return (
        <div className="flex flex-col space-y-6 items-center mt-10 sm:mt-20">
            <h2 className="page-title text-center">
                Could not find the recipe you searched for
            </h2>
            <Link
                href={RECIPES}
                className="primary-button w-fit font-bold text-xl"
            >
                Clear search
            </Link>
        </div>
    );
}

export default RecipesNotFound;
