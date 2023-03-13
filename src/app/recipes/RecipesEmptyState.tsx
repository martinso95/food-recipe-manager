import Link from "next/link";
import { ADD_RECIPE } from "@/utils/routes";

function RecipesEmptyState() {
    return (
        <div className="flex flex-col space-y-6 items-center mt-10 sm:mt-20">
            <h1 className="pageTitle text-center">
                You have not added any recipes yet
            </h1>
            <Link href={ADD_RECIPE} className="button w-fit font-bold text-xl">
                Add new recipe
            </Link>
        </div>
    );
}

export default RecipesEmptyState;
