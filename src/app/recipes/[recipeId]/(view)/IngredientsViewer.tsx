"use client";

import { RecipeIngredient } from "@/types/typings";
import { useState } from "react";

type Props = {
    ingredients: RecipeIngredient[];
};
function IngredientsViewer({ ingredients }: Props) {
    const [multiplier, setMultiplier] = useState(1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentIngredientOriginalAmount = ingredients.find(
            (ingredient) => ingredient.id === e.target.name
        )?.amount;

        if (currentIngredientOriginalAmount != null) {
            setMultiplier(
                Number(e.target.value) / currentIngredientOriginalAmount
            );
        }
    };

    return (
        <ul>
            {ingredients.map(({ id, amount, unit, name }) => (
                <li key={id} className="flex flex-row space-x-2">
                    {amount != null && unit != null && (
                        <>
                            <input
                                type="number"
                                name={id}
                                value={parseFloat(
                                    (amount * multiplier).toFixed(4)
                                )}
                                onChange={handleInputChange}
                                className="border-2 text-right"
                            />
                            <p className="text-left">{unit}</p>
                        </>
                    )}
                    <p className="text-left">{name}</p>
                </li>
            ))}
        </ul>
    );
}

export default IngredientsViewer;
