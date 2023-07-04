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
        <div className={"flex flex-col"}>
            <p className="label mb-1">
                Proteins
                <span className="ml-1 text-red-500">*</span>
            </p>
            <div className="flex flex-wrap space-x-2">
                <Checkbox
                    label={RecipeProtein.BEEF}
                    checked={proteins.includes(RecipeProtein.BEEF)}
                    onChange={() => onSelectProtein(RecipeProtein.BEEF)}
                />
                <Checkbox
                    label={RecipeProtein.CHICKEN}
                    checked={proteins.includes(RecipeProtein.CHICKEN)}
                    onChange={() => onSelectProtein(RecipeProtein.CHICKEN)}
                />
                <Checkbox
                    label={RecipeProtein.FISH}
                    checked={proteins.includes(RecipeProtein.FISH)}
                    onChange={() => onSelectProtein(RecipeProtein.FISH)}
                />
                <Checkbox
                    label={RecipeProtein.LAMB}
                    checked={proteins.includes(RecipeProtein.LAMB)}
                    onChange={() => onSelectProtein(RecipeProtein.LAMB)}
                />
                <Checkbox
                    label={RecipeProtein.PORK}
                    checked={proteins.includes(RecipeProtein.PORK)}
                    onChange={() => onSelectProtein(RecipeProtein.PORK)}
                />
                <Checkbox
                    label={RecipeProtein.SEAFOOD}
                    checked={proteins.includes(RecipeProtein.SEAFOOD)}
                    onChange={() => onSelectProtein(RecipeProtein.SEAFOOD)}
                />
                <Checkbox
                    label={RecipeProtein.VEGETARIAN}
                    checked={proteins.includes(RecipeProtein.VEGETARIAN)}
                    onChange={() => onSelectProtein(RecipeProtein.VEGETARIAN)}
                />
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
