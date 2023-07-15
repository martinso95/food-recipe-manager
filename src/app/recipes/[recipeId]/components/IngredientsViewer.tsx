"use client";

import { useState } from "react";
import { RecipeIngredient } from "@/types/typings";
import { sortIngredientsAlphabetically } from "@/utils/Utils";

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
        <ol className="max-w-full md:max-w-3xl mt-2 grid grid-cols-1 auto-rows-[1fr]">
            {sortIngredientsAlphabetically(ingredients).map(
                ({ id, amount, unit, name }) => {
                    const hasAmountAndUnit = amount != null && unit != null;
                    return (
                        <li
                            key={id}
                            className="grid grid-cols-8 md:grid-cols-16 gap-x-1 items-center"
                        >
                            {hasAmountAndUnit ? (
                                <>
                                    <input
                                        type="number"
                                        name={id}
                                        value={parseFloat(
                                            (amount * multiplier).toFixed(4)
                                        )}
                                        onChange={handleInputChange}
                                        className="input text-right col-span-2"
                                    />
                                    <p className="label font-light text-left col-span-1">
                                        {unit}
                                    </p>
                                </>
                            ) : (
                                <p className="label font-light text-left col-span-1 col-start-3">
                                    -
                                </p>
                            )}
                            <p
                                className={`label font-light text-left col-span-5 md:col-span-13 ${
                                    !hasAmountAndUnit && "col-start-4"
                                }`}
                            >
                                {name}
                            </p>
                        </li>
                    );
                }
            )}
        </ol>
    );
}

export default IngredientsViewer;
