"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Recipe, RecipeIngredient, RecipeRequestBody } from "@/types/typings";
import {
    INITIAL_RECIPE_STATE,
    isRecipeValid,
    toBase64Image,
} from "@/utils/Utils";
import IngredientsList from "@/app/components/IngredientsList";

function AddRecipeForm() {
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe>(INITIAL_RECIPE_STATE);
    const [preview, setPreview] = useState<string>();
    const [image, setImage] = useState<File>();
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (imageInputRef.current != null) {
            imageInputRef.current.click();
        }
    };

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setPreview(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddIngredient = (ingredient: RecipeIngredient) => {
        const id = crypto.randomUUID();
        setRecipe((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, { ...ingredient, id }],
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

    const handleSaveRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, description, time, servings, ingredients, instructions } =
            recipe;

        if (!isRecipeValid(recipe)) {
            alert("Recipe fields invalid.");
            return;
        }

        const requestBody: RecipeRequestBody = {
            name,
            description,
            time,
            servings,
            ingredients,
            instructions,
        };

        if (image) {
            try {
                const base64Image = await toBase64Image(image);
                requestBody.newImage = {
                    data: base64Image,
                    type: image.type,
                };
            } catch (error) {
                console.error("Could not process image.");
                return;
            }
        }

        const response = await fetch("/api/add-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (response.ok) {
            // Force refresh after push, so that the new recipe appears in the list.
            router.push("/recipes");
            router.refresh();
        } else {
            console.error(
                "Something went wrong!",
                response.status,
                response.statusText
            );
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
                    onChange={handleAddImage}
                    className="hidden"
                />
                {preview != null ? (
                    <Image
                        src={preview}
                        width={400}
                        height={400}
                        alt="Recipe image"
                        onClick={handleImageClick}
                    />
                ) : (
                    <PhotoIcon
                        onClick={handleImageClick}
                        className="w-96 h-96"
                    />
                )}
            </div>
            <label>Name</label>
            <input
                type="text"
                name="name"
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Description</label>
            <input
                type="text"
                name="description"
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Time</label>
            <input
                type="text"
                name="time"
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Servings</label>
            <input
                type="number"
                name="servings"
                onChange={handleInputChange}
                className="border-2"
            />
            <div className="col-span-2">
                <IngredientsList
                    ingredients={recipe.ingredients}
                    onAddIngredient={handleAddIngredient}
                    onRemoveIngredient={handleRemoveIngredient}
                />
            </div>
            <label>Instructions</label>
            <input
                type="text"
                name="instructions"
                onChange={handleInputChange}
                className="border-2"
            />

            <button
                type="submit"
                className="col-span-2 border-2 w-fit px-5 justify-self-center"
            >
                Save
            </button>
        </form>
    );
}

export default AddRecipeForm;
