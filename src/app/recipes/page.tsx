import Image from "next/image";
import Link from "next/link";
import { getTestRecipes } from "./testData";

async function Recipes() {
    const recipes = await getTestRecipes();
    return (
        <main className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto auto-rows-[1fr] py-10">
            {recipes.map((recipe) => (
                <Link
                    href={`/recipes/${recipe.id}`}
                    key={recipe.id}
                    className="flex flex-col space-y-2 p-4 border-2 rounded-md"
                >
                    <Image
                        src={recipe.image}
                        alt="test"
                        width={400}
                        height={400}
                        className="mx-auto"
                    />
                    <p>{recipe.name}</p>
                    <p>{recipe.description}</p>
                </Link>
            ))}
        </main>
    );
}

export default Recipes;
