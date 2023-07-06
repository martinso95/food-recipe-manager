"use client";

import { useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import {
    Recipe,
    RecipeFormErrors,
    RecipeIngredient,
    RecipeInstruction,
    RecipeProtein,
} from "@/types/typings";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import ImageWithFallback from "../ImageWithFallback";
import ProteinsEditor from "./ProteinsEditor";
import IngredientsEditor from "./IngredientsEditor";
import InstructionsEditor from "./InstructionsEditor";

type Props = {
    recipe: Recipe;
    formErrors: RecipeFormErrors;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSelectProtein: (protein: RecipeProtein) => void;
    handleAddIngredient: (ingredient: RecipeIngredient) => void;
    handleRemoveIngredient: (ingredientId: string) => void;
    handleInstructionsChange: (instructions: RecipeInstruction[]) => void;
    imagePreview: string | undefined;
    handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: () => void;
};

function RecipeFormInputs({
    recipe,
    formErrors,
    handleInputChange,
    handleSelectProtein,
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
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col items-center mx-auto w-full md:w-[95%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] h-[35vh] md:h-[45vh] lg:h-[55vh]">
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
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
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <PhotoIcon
                            onClick={handleImageClick}
                            className="w-full h-full cursor-pointer text-gray-200"
                        />
                    </>
                )}
            </div>
            <div className="mx-auto">
                {imagePreview != null ? (
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="primary-button"
                    >
                        Remove image
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleImageClick}
                        className="primary-button"
                    >
                        Add image
                    </button>
                )}
            </div>
            <div>
                <label htmlFor="name" className="label mb-1">
                    Name
                    <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    value={recipe.name}
                    onChange={handleInputChange}
                    className="input"
                />
                {formErrors["name"] === true ? (
                    <p className="text-sm text-red-500 font-semibold">
                        Please add name.
                    </p>
                ) : (
                    <div className="h-5 w-full" />
                )}
            </div>
            <div>
                <label htmlFor="description" className="label mb-1">
                    Description
                    <span className="ml-1 text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    maxLength={500}
                    value={recipe.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="textarea"
                />
                {formErrors["description"] === true ? (
                    <p className="text-sm text-red-500 font-semibold">
                        Please add description.
                    </p>
                ) : (
                    <div className="h-5 w-full" />
                )}
            </div>
            <ProteinsEditor
                proteins={recipe.proteins}
                onSelectProtein={handleSelectProtein}
                hasFormError={formErrors["protein"] === true}
            />
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
                <div className="h-5 w-full" />
            </div>
            <div>
                <label htmlFor="servings" className="label mb-1">
                    Servings
                </label>
                <input
                    type="number"
                    inputMode="decimal"
                    id="servings"
                    name="servings"
                    value={recipe.servings || ""}
                    onChange={handleInputChange}
                    className="input"
                />
                <div className="h-5 w-full" />
            </div>
            <IngredientsEditor
                ingredients={recipe.ingredients}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                hasFormError={formErrors["ingredients"] === true}
            />
            <InstructionsEditor
                instructions={recipe.instructions}
                onInstructionsChange={handleInstructionsChange}
                hasFormError={formErrors["instructions"] === true}
            />
        </div>
    );
}

export default RecipeFormInputs;
