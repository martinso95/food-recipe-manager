"use client";

import { Recipe } from "@/types/typings";
import { PencilIcon } from "@heroicons/react/24/outline";
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
                    onExit={() => setEditMode(false)}
                />
            ) : (
                <RecipePageViewer recipe={recipe} />
            )}
            {!editMode && (
                <button
                    onClick={() => setEditMode(!editMode)}
                    className="speed-dial-button"
                >
                    <PencilIcon className="h-8 w-8" />
                </button>
            )}
        </>
    );
}

export default RecipeContainer;
