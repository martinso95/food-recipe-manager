import { RECIPE_PLACEHOLDER } from "@/app/utils/Utils";
import Image from "next/image";
import React from "react";
import { getTestRecipe } from "../testData";

type Props = {
    params: { recipe: string };
};

async function RecipePage({ params: { recipe } }: Props) {
    const { name, description, image, ingredients, instructions } =
        await getTestRecipe(recipe);

    return (
        <main className="flex flex-col space-y-3">
            <Image
                src={image || RECIPE_PLACEHOLDER}
                alt="test"
                width={400}
                height={400}
            />
            <h1>Name: {name}</h1>
            <h2>Description: {description}</h2>

            <p>Ingredients:</p>
            {ingredients}
            <p>Instructions:</p>
            <p>{instructions}</p>
        </main>
    );
}

export default RecipePage;
