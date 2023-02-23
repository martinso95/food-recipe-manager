"use client";

import { Recipe } from "@/types/typings";
import { useState } from "react";
import EditRecipeForm from "./RecipePageEditMode";
import RecipePageViewMode from "./RecipePageViewMode";

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
            <button onClick={() => setEditMode(!editMode)}>
                {editMode ? "Cancel" : "Edit"}
            </button>
        </>
    );
}

export default RecipeContainer;
