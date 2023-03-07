"use client";

import { Recipe } from "@/types/typings";
import { useRouter } from "next/navigation";
import {
    editRecipe,
    isRecipeValid,
    sanitizeRecipe,
} from "@/app/components/RecipeForm/RecipeForm.utils";
import RecipeFormInputs from "@/app/components/RecipeForm/RecipeFormInputs";
import {
    useRecipeForm,
    useRecipeFormImage,
} from "@/app/components/RecipeForm/RecipeForm.hooks";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";

type Props = {
    recipeId: string;
    recipe: Recipe;
    onExit: () => void;
};

function RecipePageEditor({ recipeId, recipe: originalRecipe, onExit }: Props) {
    const router = useRouter();
    const [saveIsLoading, setSaveIsLoading] = useState(false);
    const {
        recipe,
        handleInputChange,
        handleAddIngredient,
        handleRemoveIngredient,
        handleInstructionsChange,
    } = useRecipeForm(originalRecipe);

    const { imagePreview, imageFile, handleAddImage, handleRemoveImage } =
        useRecipeFormImage(originalRecipe.image?.url);

    const handleEditRecipe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const recipeToEdit = sanitizeRecipe(recipe);

        if (!isRecipeValid(recipeToEdit)) {
            alert("Recipe fields invalid.");
            return;
        }
        setSaveIsLoading(true);

        editRecipe(recipeId, recipeToEdit, imageFile, imagePreview)
            .then(() => {
                onExit();
                router.refresh();
            })
            .catch((error) => {
                setSaveIsLoading(false);
                alert(error);
            });
    };

    return (
        <form onSubmit={handleEditRecipe}>
            <RecipeFormInputs
                recipe={recipe}
                handleInputChange={handleInputChange}
                handleAddIngredient={handleAddIngredient}
                handleRemoveIngredient={handleRemoveIngredient}
                handleInstructionsChange={handleInstructionsChange}
                imagePreview={imagePreview}
                handleAddImage={handleAddImage}
                handleRemoveImage={handleRemoveImage}
            />
            <button
                type="submit"
                disabled={saveIsLoading}
                className="speed-dial-button bottom-28"
            >
                {saveIsLoading ? (
                    <Spinner width="8" height="8" />
                ) : (
                    <CheckIcon className="h-8 w-8 text-white" />
                )}
            </button>
            <button
                type="button"
                disabled={saveIsLoading}
                onClick={onExit}
                className="speed-dial-button"
            >
                <XMarkIcon className="h-8 w-8 text-white" />
            </button>
        </form>
    );
}

export default RecipePageEditor;
