"use client";

import { useRef, useState } from "react";
import { Recipe, RecipeRequestBody } from "@/types/typings";
import {
    isRecipeValid,
    RECIPE_PLACEHOLDER,
    toBase64Image,
} from "@/utils/Utils";
import ImageWithFallback from "@/app/components/ImageWithFallback";
import { useRouter } from "next/navigation";

type Props = {
    recipeId: string;
    recipe: Recipe;
    onSave: () => void;
};

function RecipePageEditMode({ recipeId, recipe, onSave }: Props) {
    const router = useRouter();
    const [preview, setPreview] = useState<string | undefined>(
        recipe.image?.url
    );
    const [newImage, setNewImage] = useState<File>();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [newRecipe, setNewRecipe] = useState<Recipe>(recipe);

    const handleImageClick = () => {
        if (imageInputRef.current != null) {
            imageInputRef.current.click();
        }
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setPreview(URL.createObjectURL(e.target.files[0]));
            setNewImage(e.target.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isRecipeValid(newRecipe)) {
            alert("Recipe fields invalid.");
            return;
        }

        const requestBody: RecipeRequestBody = {
            recipeId: recipeId,
            name: newRecipe.name,
            description: newRecipe.description,
            time: newRecipe.time,
            servings: newRecipe.servings,
            ingredients: newRecipe.ingredients,
            instructions: newRecipe.instructions,
            oldImage: recipe.image != null ? recipe.image : undefined,
        };

        if (newImage) {
            try {
                const base64Image = await toBase64Image(newImage);
                requestBody.newImage = {
                    data: base64Image,
                    type: newImage.type,
                };
            } catch (error) {
                alert("Could not process image.");
                return;
            }
        }

        const response = await fetch("/api/edit-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            onSave();
            router.refresh();
        } else {
            alert("Could not save.");
        }
    };

    return (
        <form
            onSubmit={handleSaveRecipe}
            className="grid grid-cols-[max-content,1fr] gap-5"
        >
            <div className="col-span-2 border w-fit p-5 justify-self-center">
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*" // TODO: Handle file types restrictions properly in the backend.
                    onChange={handleChangeImage}
                    className="hidden"
                />
                <ImageWithFallback
                    src={preview}
                    alt="Recipe image"
                    fallback={RECIPE_PLACEHOLDER}
                    width={400}
                    height={400}
                    onClick={handleImageClick}
                />
            </div>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={newRecipe.name}
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Description</label>
            <input
                type="text"
                name="description"
                value={newRecipe.description}
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Time</label>
            <input
                type="text"
                name="time"
                value={newRecipe.time}
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Servings</label>
            <input
                type="number"
                name="servings"
                value={newRecipe.servings}
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Ingredients</label>
            <input
                type="text"
                name="ingredients"
                value={newRecipe.ingredients}
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Instructions</label>
            <input
                type="text"
                name="instructions"
                value={newRecipe.instructions}
                onChange={handleInputChange}
                className="border-2"
            />

            <button
                type="submit"
                className="border-2 w-fit px-5 justify-self-center"
            >
                Save
            </button>
        </form>
    );
}

export default RecipePageEditMode;
