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
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleAddIngredient: (ingredient: RecipeIngredient) => void;
    handleRemoveIngredient: (ingredientId: string) => void;
    handleInstructionsChange: (instructions: RecipeInstruction[]) => void;
    imagePreview: string | undefined;
    handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: () => void;
};

function RecipeFormInputs({
    recipe,
    handleInputChange,
    handleAddIngredient,
    handleRemoveIngredient,
    handleInstructionsChange,
    imagePreview,
    handleAddImage,
    handleRemoveImage,
}: Props) {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (imageInputRef.current != null) {
            imageInputRef.current.click();
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col items-center w-full h-[30vh] md:h-[40vh] lg:h-[50vh]">
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*" // TODO: Handle file types restrictions properly in the backend.
                    onChange={handleAddImage}
                    className="hidden"
                />
                {imagePreview != null ? (
                    <>
                        <div className="relative w-full h-full cursor-pointer">
                            <ImageWithFallback
                                src={imagePreview}
                                alt="Recipe image"
                                fallback={RECIPE_PLACEHOLDER}
                                fill={true}
                                sizes="100vw, 100vw, 100vw"
                                onClick={handleImageClick}
                                className="object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="button mt-4"
                        >
                            Remove image
                        </button>
                    </>
                ) : (
                    <>
                        <PhotoIcon
                            onClick={handleImageClick}
                            className="w-full h-full cursor-pointer text-gray-200"
                        />
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="button mt-4"
                        >
                            Add image
                        </button>
                    </>
                )}
            </div>
            <div>
                <label htmlFor="name" className="label mb-1">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={recipe.name}
                    onChange={handleInputChange}
                    className="input"
                />
            </div>
            <div>
                <label htmlFor="description" className="label mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={recipe.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="textarea"
                />
            </div>
            <div>
                <label htmlFor="time" className="label mb-1">
                    Time
                </label>
                <input
                    type="text"
                    id="time"
                    name="time"
                    value={recipe.time || ""}
                    onChange={handleInputChange}
                    className="input"
                />
            </div>
            <div>
                <label htmlFor="servings" className="label mb-1">
                    Servings
                </label>
                <input
                    type="number"
                    id="servings"
                    name="servings"
                    value={recipe.servings || ""}
                    onChange={handleInputChange}
                    className="input"
                />
            </div>
            <IngredientsEditor
                ingredients={recipe.ingredients}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
            />
            <InstructionsEditor
                instructions={recipe.instructions}
                onInstructionsChange={handleInstructionsChange}
            />
        </div>
    );
}

export default RecipeFormInputs;
