"use client";

import { Recipe } from "@/types/typings";
import { useState } from "react";
import EditRecipeForm from "./(edit-mode)/RecipePageEditMode";
import RecipePageViewMode from "./(view-mode)/RecipePageViewMode";

type Props = {
    recipeId: string;
    recipe: Recipe;
};

function RecipeContainer({ recipeId, recipe }: Props) {
    const [editMode, setEditMode] = useState(false);

    return (
        <>
            {editMode ? (
                <EditRecipeForm
                    recipeId={recipeId}
                    recipe={recipe}
                    onSave={() => setEditMode(false)}
                />
            ) : (
                <RecipePageViewMode recipe={recipe} />
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
