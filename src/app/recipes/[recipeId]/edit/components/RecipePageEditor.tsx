"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Recipe } from "@/types/typings";
import { RECIPES } from "@/utils/routes";
import {
    deleteRecipe,
    editRecipe,
    getFormErrors,
    isRecipeValid,
    sanitizeRecipe,
} from "@/components/RecipeForm/RecipeForm.utils";
import {
    useRecipeForm,
    useRecipeFormImage,
} from "@/components/RecipeForm/RecipeForm.hooks";
import RecipeFormInputs from "@/components/RecipeForm/RecipeFormInputs";
import Spinner from "@/components/Spinner";

type Props = {
    recipeId: string;
    recipe: Recipe;
};

function RecipePageEditor({ recipeId, recipe: originalRecipe }: Props) {
    const router = useRouter();
    const [saveIsLoading, setSaveIsLoading] = useState(false);
    const [deleteIsLoading, setDeleteIsLoading] = useState(false);
    const {
        recipe,
        formErrors,
        setFormErrors,
        handleInputChange,
        handleSelectProtein,
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
            setFormErrors(getFormErrors(recipeToEdit));
            toast.error("Recipe fields invalid.");
            return;
        }
        setSaveIsLoading(true);

        editRecipe(recipeToEdit, imageFile, imagePreview)
            .then((result) => {
                router.push(`${RECIPES}/${recipeId}`);
                toast.success(result);
            })
            .catch((error) => {
                setSaveIsLoading(false);
                toast.error(error);
            });
    };

    const handleDeleteRecipe = () => {
        setDeleteIsLoading(true);

        deleteRecipe(recipeId, originalRecipe.image)
            .then((result) => {
                router.replace(RECIPES);
                toast.success(result);
            })
            .catch((error) => {
                setDeleteIsLoading(false);
                toast.error(error);
            });
    };

    return (
        <form onSubmit={handleEditRecipe} noValidate>
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
                type="button"
                disabled={saveIsLoading || deleteIsLoading}
                onClick={handleDeleteRecipe}
                className="speed-dial-button bottom-[12.5rem]"
            >
                {deleteIsLoading ? (
                    <Spinner width="8" height="8" />
                ) : (
                    <TrashIcon className="h-8 w-8 text-white" />
                )}
            </button>
            <button
                type="submit"
                disabled={saveIsLoading || deleteIsLoading}
                className="speed-dial-button bottom-[7rem]"
            >
                {saveIsLoading ? (
                    <Spinner width="8" height="8" />
                ) : (
                    <CheckIcon className="h-8 w-8 text-white" />
                )}
            </button>
            <button
                type="button"
                disabled={saveIsLoading || deleteIsLoading}
                onClick={() => router.push(`${RECIPES}/${recipeId}`)}
                className="speed-dial-button"
            >
                <XMarkIcon className="h-8 w-8 text-white" />
            </button>
        </form>
    );
}

export default RecipePageEditor;
