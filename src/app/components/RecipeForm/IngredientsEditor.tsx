"use client";

import { RecipeIngredient } from "@/types/typings";
import { useState } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { isIngredientValid } from "./RecipeForm.utils";

const NEW_INGREDIENT_INITIAL_VALUE: RecipeIngredient = {
    id: "",
    name: "",
};

type Props = {
    ingredients: RecipeIngredient[];
    onAddIngredient: (ingredient: RecipeIngredient) => void;
    onRemoveIngredient: (ingredientId: string) => void;
};

function IngredientsEditor({
    ingredients,
    onAddIngredient,
    onRemoveIngredient,
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
            alert(message);
            return;
        }
        const id = crypto.randomUUID();
        onAddIngredient({ ...newIngredient, id });
        setNewIngredient(NEW_INGREDIENT_INITIAL_VALUE);
    };

    return (
        <div className={"flex flex-col"}>
            <p className="label mb-1">Ingredients</p>
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
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={newIngredient.name}
                    onChange={handleInputChange}
                    className="input col-span-6"
                />
                <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="button row-span-2 self-end col-span-2 px-0 flex justify-center"
                >
                    <PlusIcon className="h-6 w-6" />
                </button>
            </div>
            <ul className="mt-2 space-y-2">
                {ingredients.map(({ id, amount, unit, name }) => (
                    <li
                        key={id}
                        className="grid grid-cols-13 gap-x-1 items-center"
                    >
                        <p className="label font-light col-span-3 text-right">
                            {amount}
                        </p>
                        <p className="label font-light col-span-2">{unit}</p>
                        <p className="label font-light col-span-6">{name}</p>
                        <button
                            type="button"
                            onClick={() => onRemoveIngredient(id)}
                            className="button col-span-2 px-0 flex justify-center"
                        >
                            <TrashIcon className="h-6 w-6" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IngredientsEditor;
