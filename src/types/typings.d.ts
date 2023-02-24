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

// Used as the main type for recipes in the app and in the database.
export interface Recipe {
    name: string;
    description: string;
    servings?: number;
    time?: string;
    ingredients: RecipeIngredient[];
    instructions: string;
    image?: RecipeImage;
}

// Used for passing recipe through API. It specifically can contain id and image data.
export interface RecipeRequestBody {
    recipeId?: string;
    name: string;
    description: string;
    servings?: number;
    time?: string;
    ingredients: RecipeIngredient[];
    instructions: string;
    oldImage?: RecipeImage;
    newImage?: { data: string; type: string };
}
