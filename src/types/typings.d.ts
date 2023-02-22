export interface RecipeImage {
    id: string;
    url: string;
    name: string;
}

export interface RecipeInterface {
    name: string;
    description: string;
    image?: RecipeImage;
    ingredients: string;
    instructions: string;
}
