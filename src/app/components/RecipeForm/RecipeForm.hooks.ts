"use client";

import { Recipe, RecipeIngredient, RecipeInstruction } from "@/types/typings";
import { useState } from "react";

export const useRecipeFormImage = (initialImage?: string) => {
    const [imagePreview, setImagePreview] = useState<string | undefined>(
        initialImage
    );
    const [imageFile, setImageFile] = useState<File>();

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(undefined);
        setImageFile(undefined);
    };

    return {
        imagePreview,
        imageFile,
        handleAddImage,
        handleRemoveImage,
    };
};

export const useRecipeForm = (initialRecipe: Recipe) => {
    const [recipe, setRecipe] = useState<Recipe>(initialRecipe);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddIngredient = (ingredient: RecipeIngredient) => {
        setRecipe((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, ingredient],
        }));
    };

    const handleRemoveIngredient = (ingredientId: string) => {
        setRecipe((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter(
                ({ id }) => id !== ingredientId
            ),
        }));
    };

    const handleInstructionsChange = (instructions: RecipeInstruction[]) => {
        setRecipe((prev) => ({
            ...prev,
            instructions,
        }));
    };

    return {
        recipe,
        handleInputChange,
        handleAddIngredient,
        handleRemoveIngredient,
        handleInstructionsChange,
    };
};
