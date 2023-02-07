import Image from "next/image";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getTestRecipes } from "./testData";
import { RECIPE_PLACEHOLDER } from "../utils/Utils";

async function RecipeListPage() {
    const recipes = await getTestRecipes();
    return (
        <main className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto auto-rows-[1fr] px-10 py-10">
            {recipes.map((recipe) => (
                <Link
                    href={`/recipes/${recipe.id}`}
                    key={recipe.id}
                    className="flex flex-col space-y-2 p-4 border-2 rounded-md min-w-fit"
                >
                    <Image
                        src={recipe.image || RECIPE_PLACEHOLDER}
                        alt="test"
                        width={400}
                        height={400}
                        className="mx-auto"
                    />
                    <p>{recipe.name}</p>
                    <p>{recipe.description}</p>
                </Link>
            ))}
            <Link
                href="/recipes/add-recipe"
                className="fixed right-6 bottom-6 bg-black rounded-full hover:bg-gray-800 border-white border-2"
            >
                <PlusIcon className="h-14 w-14 text-white" />
            </Link>
        </main>
    );
}

export default RecipeListPage;
