"use client";

import { RecipeIngredient } from "@/types/typings";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { isIngredientValid } from "@/utils/Utils";

const NEW_INGREDIENT_INITIAL_VALUE: RecipeIngredient = {
    id: "",
    name: "",
};

type Props = {
    ingredients: RecipeIngredient[];
    onAddIngredient: (ingredient: RecipeIngredient) => void;
    onRemoveIngredient: (ingredientId: string) => void;
};

function IngredientsList({
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
        onAddIngredient(newIngredient);
        setNewIngredient(NEW_INGREDIENT_INITIAL_VALUE);
    };

    return (
        <div className="flex flex-col">
            <p>Ingredients:</p>
            <div className="flex flex-row">
                <label>Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={newIngredient.amount || ""}
                    onChange={handleInputChange}
                    className="border-2"
                />
                <label>Unit</label>
                <input
                    type="text"
                    name="unit"
                    value={newIngredient.unit || ""}
                    onChange={handleInputChange}
                    className="border-2"
                />
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={newIngredient.name}
                    onChange={handleInputChange}
                    className="border-2"
                />
                <button type="button" onClick={handleAddIngredient}>
                    Add
                </button>
            </div>
            <ul>
                {ingredients.map(({ id, amount, unit, name }) => (
                    <li
                        key={id}
                        className="flex flex-row  space-x-2 items-center"
                    >
                        <p>{`${amount ?? ""} ${unit ?? ""} ${name}`.trim()}</p>
                        <button
                            type="button"
                            onClick={() => onRemoveIngredient(id)}
                        >
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IngredientsList;
