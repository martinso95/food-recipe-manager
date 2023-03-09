"use client";

import { useState } from "react";
import {
    Recipe,
    RecipeFormErrors,
    RecipeIngredient,
    RecipeInstruction,
} from "@/types/typings";
import { MAX_IMAGE_SIZE } from "@/utils/Utils";

export const useRecipeFormImage = (initialImage?: string) => {
    const [imagePreview, setImagePreview] = useState<string | undefined>(
        initialImage
    );
    const [imageFile, setImageFile] = useState<File>();

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if (imageFile) {
            if (imageFile.size > MAX_IMAGE_SIZE) {
                alert("Image too large. Max size 5MB.");
                return;
            }
            setImagePreview(URL.createObjectURL(imageFile));
            setImageFile(imageFile);
        }
        // This allows for adding the same image again in case it was removed.
        e.target.value = "";
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
    const [formErrors, setFormErrors] = useState<RecipeFormErrors>({
        name: false,
        description: false,
        ingredients: false,
        instructions: false,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
        formErrors,
        setFormErrors,
        handleInputChange,
        handleAddIngredient,
        handleRemoveIngredient,
        handleInstructionsChange,
    };
};
