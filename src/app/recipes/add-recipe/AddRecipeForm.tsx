"use client";

import { useRouter } from "next/navigation";
import {
    useRecipeForm,
    useRecipeFormImage,
} from "@/app/components/RecipeForm/RecipeForm.hooks";
import RecipeForm from "@/app/components/RecipeForm/RecipeForm";
import {
    addNewRecipe,
    isRecipeValid,
    sanitizeRecipe,
} from "@/app/components/RecipeForm/RecipeForm.utils";
import { Recipe } from "@/types/typings";
import { RECIPES } from "@/utils/routes";

export const INITIAL_RECIPE: Recipe = {
    name: "",
    description: "",
    ingredients: [],
    instructions: [{ id: crypto.randomUUID(), description: "" }],
};

function AddRecipeForm() {
    const router = useRouter();
    const {
        recipe,
        handleInputChange,
        handleAddIngredient,
        handleRemoveIngredient,
        handleInstructionsChange,
    } = useRecipeForm(INITIAL_RECIPE);

    const { imagePreview, imageFile, handleAddImage, handleRemoveImage } =
        useRecipeFormImage();

    const handleAddNewRecipe = () => {
        const recipeToAdd = sanitizeRecipe(recipe);

        if (!isRecipeValid(recipeToAdd)) {
            alert("Recipe fields invalid.");
            return;
        }

        addNewRecipe(recipeToAdd, imageFile)
            .then(() => {
                // Force refresh after push, so that the new recipe appears in the list.
                router.push(RECIPES);
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

export default AddRecipeForm;
