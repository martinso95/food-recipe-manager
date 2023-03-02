"use client";

import { Recipe } from "@/types/typings";
import { useState } from "react";
import RecipePageEditor from "./(edit)/RecipePageEditor";
import RecipePageViewer from "./(view)/RecipePageViewer";

type Props = {
    recipeId: string;
    recipe: Recipe;
};

function RecipeContainer({ recipeId, recipe }: Props) {
    const [editMode, setEditMode] = useState(false);

    return (
        <>
            {editMode ? (
                <RecipePageEditor
                    recipeId={recipeId}
                    recipe={recipe}
                    onSave={() => setEditMode(false)}
                />
            ) : (
                <RecipePageViewer recipe={recipe} />
            )}
            <button
                onClick={() => setEditMode(!editMode)}
                className="border-2 w-fit px-5"
            >
                {editMode ? "Cancel" : "Edit"}
            </button>
        </>
    );
}

export default RecipeContainer;
