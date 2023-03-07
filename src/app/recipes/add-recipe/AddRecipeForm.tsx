"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    useRecipeForm,
    useRecipeFormImage,
} from "@/app/components/RecipeForm/RecipeForm.hooks";
import RecipeFormInputs from "@/app/components/RecipeForm/RecipeFormInputs";
import {
    addNewRecipe,
    isRecipeValid,
    sanitizeRecipe,
} from "@/app/components/RecipeForm/RecipeForm.utils";
import { RECIPES } from "@/utils/routes";
import Spinner from "@/app/components/Spinner";
import { Recipe } from "@/types/typings";

type Props = {
    initialRecipe: Recipe;
};
function AddRecipeForm({ initialRecipe }: Props) {
    const router = useRouter();
    const [saveIsLoading, setSaveIsLoading] = useState(false);
    const {
        recipe,
        handleInputChange,
        handleAddIngredient,
        handleRemoveIngredient,
        handleInstructionsChange,
    } = useRecipeForm(initialRecipe);

    const { imagePreview, imageFile, handleAddImage, handleRemoveImage } =
        useRecipeFormImage();

    const handleAddNewRecipe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const recipeToAdd = sanitizeRecipe(recipe);

        if (!isRecipeValid(recipeToAdd)) {
            alert("Recipe fields invalid.");
            return;
        }
        setSaveIsLoading(true);

        addNewRecipe(recipeToAdd, imageFile)
            .then((recipeId) => {
                router.push(`${RECIPES}/${recipeId}`);
            })
            .catch((error) => {
                setSaveIsLoading(false);
                alert(error);
            });
    };

    return (
        <form onSubmit={handleAddNewRecipe}>
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
                    <CheckIcon className="h-8 w-8" />
                )}
            </button>
            <button
                type="button"
                disabled={saveIsLoading}
                onClick={() => router.push(RECIPES)}
                className="speed-dial-button"
            >
                <XMarkIcon className="h-8 w-8" />
            </button>
        </form>
    );
}

export default AddRecipeForm;
