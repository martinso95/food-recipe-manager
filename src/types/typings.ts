import { DefaultUser } from "next-auth";

export interface RecipeFormErrors {
    name: boolean;
    description: boolean;
    protein: boolean;
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
    blurImageData: string;
}

export enum RecipeProtein {
    BEEF = "Beef",
    CHICKEN = "Chicken",
    FISH = "Fish",
    LAMB = "Lamb",
    PORK = "Pork",
    SEAFOOD = "Seafood",
    VEGETARIAN = "Vegetarian",
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
    recipeId: string;
    name: string;
    orderValue: string; // Used for Firestore name ordering and pagination. Consists of name in lower case plus recipe id.
    description: string;
    proteins: RecipeProtein[];
    servings?: number;
    time?: string;
    ingredients: RecipeIngredient[];
    instructions: RecipeInstruction[];
    image?: RecipeImage;
}

// Used for passing recipe through API, for adding/editing recipe. Specifically for handling old and new images.
export interface RecipeRequestBody {
    recipeId: string;
    name: string;
    orderValue: string; // Used for Firestore name ordering and pagination. Consists of name in lower case plus recipe id.
    description: string;
    proteins: RecipeProtein[];
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
