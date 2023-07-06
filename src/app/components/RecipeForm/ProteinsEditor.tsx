"use client";

import { RecipeProtein } from "@/types/typings";
import Checkbox from "../Checkbox";

type Props = {
    proteins: RecipeProtein[];
    onSelectProtein: (protein: RecipeProtein) => void;
    hasFormError: boolean;
};

function ProteinsEditor({ proteins, onSelectProtein, hasFormError }: Props) {
    return (
        <div className="flex flex-col">
            <p className="label mb-1">
                Proteins
                <span className="ml-1 text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
                {Object.values(RecipeProtein).map((recipeProtein) => (
                    <Checkbox
                        key={recipeProtein}
                        label={recipeProtein}
                        checked={proteins.includes(recipeProtein)}
                        onChange={() => onSelectProtein(recipeProtein)}
                    />
                ))}
            </div>
            {hasFormError ? (
                <p className="text-sm text-red-500 font-semibold">
                    Please select at least one protein.
                </p>
            ) : (
                <div className="h-5 w-full" />
            )}
        </div>
    );
}

export default ProteinsEditor;
