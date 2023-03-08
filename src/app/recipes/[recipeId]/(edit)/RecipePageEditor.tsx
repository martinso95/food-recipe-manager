"use client";

import { Recipe } from "@/types/typings";
import { useRouter } from "next/navigation";
import {
    deleteRecipe,
    editRecipe,
    getFormErrors,
    isRecipeValid,
    sanitizeRecipe,
} from "@/app/components/RecipeForm/RecipeForm.utils";
import RecipeFormInputs from "@/app/components/RecipeForm/RecipeFormInputs";
import {
    useRecipeForm,
    useRecipeFormImage,
} from "@/app/components/RecipeForm/RecipeForm.hooks";
import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";
import { RECIPES } from "@/utils/routes";

type Props = {
    recipeId: string;
    recipe: Recipe;
    onExit: () => void;
};

function RecipePageEditor({ recipeId, recipe: originalRecipe, onExit }: Props) {
    const router = useRouter();
    const [saveIsLoading, setSaveIsLoading] = useState(false);
    const [deleteIsLoading, setDeleteIsLoading] = useState(false);
    const {
        recipe,
        formErrors,
        setFormErrors,
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
            setFormErrors(getFormErrors(recipeToEdit));
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

    const handleDeleteRecipe = () => {
        setDeleteIsLoading(true);

        deleteRecipe(recipeId, originalRecipe.image)
            .then(() => {
                onExit();
                router.replace(RECIPES);
            })
            .catch((error) => {
                setDeleteIsLoading(false);
                alert(error);
            });
    };

    return (
        <form onSubmit={handleEditRecipe} noValidate>
            <RecipeFormInputs
                recipe={recipe}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
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
                onClick={onExit}
                className="speed-dial-button"
            >
                <XMarkIcon className="h-8 w-8 text-white" />
            </button>
        </form>
    );
}

export default RecipePageEditor;
