"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { RecipeIngredient } from "@/types/typings";
import { isIngredientValid } from "./RecipeForm.utils";
import { sortIngredientsAlphabetically } from "@/utils/Utils";

const NEW_INGREDIENT_INITIAL_VALUE: RecipeIngredient = {
    id: "",
    name: "",
};

type Props = {
    ingredients: RecipeIngredient[];
    onAddIngredient: (ingredient: RecipeIngredient) => void;
    onRemoveIngredient: (ingredientId: string) => void;
    hasFormError: boolean;
};

function IngredientsEditor({
    ingredients,
    onAddIngredient,
    onRemoveIngredient,
    hasFormError,
}: Props) {
    const [newIngredient, setNewIngredient] = useState<RecipeIngredient>(
        NEW_INGREDIENT_INITIAL_VALUE
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewIngredient((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddIngredient = () => {
        const { isValid, message } = isIngredientValid(newIngredient);
        if (!isValid) {
            toast.error(message);
            return;
        }
        const id = crypto.randomUUID();
        onAddIngredient({ ...newIngredient, id });
        setNewIngredient(NEW_INGREDIENT_INITIAL_VALUE);
    };

    return (
        <div className={"flex flex-col"}>
            <p className="label mb-1">
                Ingredients
                <span className="ml-1 text-red-500">*</span>
            </p>
            <div className="grid grid-flow-col grid-cols-13 gap-x-1">
                <label
                    htmlFor="amount"
                    className="label mb-0 font-light col-span-3"
                >
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newIngredient.amount || ""}
                    onChange={handleInputChange}
                    className="input col-span-3 text-right"
                />
                <label
                    htmlFor="unit"
                    className="label mb-0 font-light col-span-2"
                >
                    Unit
                </label>
                <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={newIngredient.unit || ""}
                    onChange={handleInputChange}
                    className="input col-span-2"
                />
                <label
                    htmlFor="name"
                    className="label mb-0 font-light col-span-6"
                >
                    Name
                    <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    maxLength={50}
                    value={newIngredient.name}
                    onChange={handleInputChange}
                    className="input col-span-6"
                />
                <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="primary-icon-button row-span-2 self-end col-span-2"
                >
                    <PlusIcon className="h-6 w-6" />
                </button>
            </div>
            <ul className="mt-2 space-y-2">
                {sortIngredientsAlphabetically(ingredients).map(
                    ({ id, amount, unit, name }) => (
                        <li
                            key={id}
                            className="grid grid-cols-13 gap-x-1 items-center"
                        >
                            <p className="label font-light col-span-3 text-right">
                                {amount}
                            </p>
                            <p className="label font-light col-span-2">
                                {unit}
                            </p>
                            <p className="label font-light col-span-6">
                                {name}
                            </p>
                            <button
                                type="button"
                                onClick={() => onRemoveIngredient(id)}
                                className="primary-icon-button col-span-2"
                            >
                                <TrashIcon className="h-6 w-6" />
                            </button>
                        </li>
                    )
                )}
            </ul>
            {hasFormError ? (
                <p className="text-sm text-red-500 font-semibold">
                    Please add ingredients.
                </p>
            ) : (
                <div className="h-5 w-full" />
            )}
        </div>
    );
}

export default IngredientsEditor;
