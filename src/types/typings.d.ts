import { DefaultUser } from "next-auth";

export interface RecipeFormErrors {
    name: boolean;
    description: boolean;
    ingredients: boolean;
    instructions: boolean;
}

export interface User extends DefaultUser {
    id: string;
}

export interface RecipeImage {
    id: string;
    url: string;
    name: string;
}

export interface RecipeIngredient {
    id: string;
    amount?: number;
    unit?: string;
    name: string;
}

export interface RecipeInstruction {
    id: string;
    description: string;
}

// Used as the main type for recipes in the app and in the database.
export interface Recipe {
    name: string;
    nameLowerCase: string; // Used for Firestore orderBy, because Firestore has no option to ignore case.
    description: string;
    servings?: number;
    time?: string;
    ingredients: RecipeIngredient[];
    instructions: RecipeInstruction[];
    image?: RecipeImage;
}

// Used for rendering recipes in a list card form.
// Additions:
// blur data url image. Improves image viewing experience.
// recipe id. For easier rendering of the list.
export interface RecipeListCard extends Omit<Recipe, "image"> {
    image?: RecipeImage & {
        blurData?: string;
    };
    recipeId?: string;
}

// Used for passing recipe through API, for adding/editing recipe. It specifically can contain id and image data.
export interface RecipeRequestBody {
    recipeId?: string;
    name: string;
    nameLowerCase: string; // Used for Firestore orderBy, because Firestore has no option to ignore case.
    description: string;
    servings?: number;
    time?: string;
    ingredients: RecipeIngredient[];
    instructions: RecipeInstruction[];
    oldImage?: RecipeImage;
    newImage?: { data: string; type: string };
    removeImage?: boolean;
}

// Used for deleting recipe through API.
export interface RecipeRequestDeleteBody {
    recipeId: string;
    image?: RecipeImage;
}
