import { ADD_RECIPE } from "@/utils/routes";
import Link from "next/link";

function RecipesEmptyState() {
    return (
        <div className="flex flex-col space-y-6 items-center mt-20">
            <h1 className="text-4xl text-white font-bold text-center">
                You have not added any recipes yet
            </h1>
            <Link href={ADD_RECIPE} className="button w-fit font-bold text-xl">
                Add new recipe
            </Link>
        </div>
    );
}

export default RecipesEmptyState;
