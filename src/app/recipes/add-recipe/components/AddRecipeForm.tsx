"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Recipe } from "@/types/typings";
import { RECIPES } from "@/utils/routes";
import Spinner from "@/components/Spinner";
import {
    useRecipeForm,
    useRecipeFormImage,
} from "@/components/RecipeForm/RecipeForm.hooks";
import {
    addNewRecipe,
    getFormErrors,
    isRecipeValid,
    sanitizeRecipe,
} from "@/components/RecipeForm/RecipeForm.utils";
import RecipeFormInputs from "@/components/RecipeForm/RecipeFormInputs";

type Props = {
    initialRecipe: Recipe;
};

function AddRecipeForm({ initialRecipe }: Props) {
    const router = useRouter();
    const [saveIsLoading, setSaveIsLoading] = useState(false);
    const {
        recipe,
        formErrors,
        setFormErrors,
        handleInputChange,
        handleSelectProtein,
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
            setFormErrors(getFormErrors(recipeToAdd));
            toast.error("Recipe fields invalid.");
            return;
        }
        setSaveIsLoading(true);

        addNewRecipe(recipeToAdd, imageFile)
            .then((result) => {
                router.push(`${RECIPES}/${result.recipeId}`);
                toast.success(result.message);
            })
            .catch((result) => {
                setSaveIsLoading(false);
                toast.error(result.message);
            });
    };

    return (
        <form onSubmit={handleAddNewRecipe} noValidate>
            <RecipeFormInputs
                recipe={recipe}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                handleSelectProtein={handleSelectProtein}
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
