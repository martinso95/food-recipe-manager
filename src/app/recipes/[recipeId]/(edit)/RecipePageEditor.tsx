"use client";

import { Recipe } from "@/types/typings";
import { useRouter } from "next/navigation";
import {
    editRecipe,
    isRecipeValid,
    sanitizeRecipe,
} from "@/app/components/RecipeForm/RecipeForm.utils";
import RecipeForm from "@/app/components/RecipeForm/RecipeForm";
import {
    useRecipeForm,
    useRecipeFormImage,
} from "@/app/components/RecipeForm/RecipeForm.hooks";

type Props = {
    recipeId: string;
    recipe: Recipe;
    onSave: () => void;
};

function RecipePageEditor({ recipeId, recipe: originalRecipe, onSave }: Props) {
    const router = useRouter();
    const {
        recipe,
        handleInputChange,
        handleAddIngredient,
        handleRemoveIngredient,
        handleInstructionsChange,
    } = useRecipeForm(originalRecipe);

    const { imagePreview, imageFile, handleAddImage, handleRemoveImage } =
        useRecipeFormImage(originalRecipe.image?.url);

    const handleAddNewRecipe = () => {
        const recipeToEdit = sanitizeRecipe(recipe);

        if (!isRecipeValid(recipeToEdit)) {
            alert("Recipe fields invalid.");
            return;
        }

        editRecipe(recipeId, recipeToEdit, imageFile, imagePreview)
            .then(() => {
                onSave();
                router.refresh();
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <RecipeForm
            recipe={recipe}
            handleInputChange={handleInputChange}
            handleAddIngredient={handleAddIngredient}
            handleRemoveIngredient={handleRemoveIngredient}
            handleInstructionsChange={handleInstructionsChange}
            imagePreview={imagePreview}
            handleAddImage={handleAddImage}
            handleRemoveImage={handleRemoveImage}
            handleSaveRecipe={handleAddNewRecipe}
        />
    );
}

export default RecipePageEditor;
