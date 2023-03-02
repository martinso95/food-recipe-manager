"use client";

import { Recipe, RecipeIngredient, RecipeInstruction } from "@/types/typings";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import ImageWithFallback from "../ImageWithFallback";
import IngredientsEditor from "./IngredientsEditor";
import InstructionsEditor from "./InstructionsEditor";

type Props = {
    recipe: Recipe;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddIngredient: (ingredient: RecipeIngredient) => void;
    handleRemoveIngredient: (ingredientId: string) => void;
    handleInstructionsChange: (instructions: RecipeInstruction[]) => void;
    imagePreview: string | undefined;
    handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: () => void;
    handleSaveRecipe: () => void;
};

function RecipeForm({
    recipe,
    handleInputChange,
    handleAddIngredient,
    handleRemoveIngredient,
    handleInstructionsChange,
    imagePreview,
    handleAddImage,
    handleRemoveImage,
    handleSaveRecipe,
}: Props) {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (imageInputRef.current != null) {
            imageInputRef.current.click();
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSaveRecipe();
            }}
            className="grid grid-cols-[max-content,1fr] gap-5"
        >
            <div className="col-span-2 flex flex-col border w-fit p-5 justify-self-center items-center">
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*" // TODO: Handle file types restrictions properly in the backend.
                    onChange={handleAddImage}
                    className="hidden"
                />
                {imagePreview != null ? (
                    <ImageWithFallback
                        src={imagePreview}
                        alt="Recipe image"
                        fallback={RECIPE_PLACEHOLDER}
                        width={400}
                        height={400}
                        onClick={handleImageClick}
                    />
                ) : (
                    <PhotoIcon
                        onClick={handleImageClick}
                        className="w-96 h-96"
                    />
                )}
                {imagePreview && (
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="border-2 w-fit px-5"
                    >
                        Remove image
                    </button>
                )}
            </div>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={recipe.name}
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Description</label>
            <input
                type="text"
                name="description"
                value={recipe.description}
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Time</label>
            <input
                type="text"
                name="time"
                value={recipe.time || ""}
                onChange={handleInputChange}
                className="border-2"
            />
            <label>Servings</label>
            <input
                type="number"
                name="servings"
                value={recipe.servings || ""}
                onChange={handleInputChange}
                className="border-2"
            />
            <IngredientsEditor
                className="col-span-2"
                ingredients={recipe.ingredients}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
            />
            <InstructionsEditor
                className="col-span-2"
                instructions={recipe.instructions}
                onInstructionsChange={handleInstructionsChange}
            />

            <button type="submit" className="col-span-2 border-2 w-fit px-5">
                Save
            </button>
        </form>
    );
}

export default RecipeForm;
