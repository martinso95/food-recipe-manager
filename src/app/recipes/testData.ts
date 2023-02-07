import { RecipeInterface } from "../types";

const testRecipes: RecipeInterface[] = [
    {
        id: "1",
        name: "Test 1",
        description: "Test description",
        ingredients: "",
        instructions: "",
    },
    {
        id: "2",
        name: "Test 2",
        description: "Test description",
        ingredients: "",
        instructions: "",
    },
    {
        id: "3",
        name: "Test 3",
        description: "Test description",
        ingredients: "",
        instructions: "",
    },
    {
        id: "4",
        name: "Test 4",
        description: "Test description",
        ingredients: "",
        instructions: "",
    },
    {
        id: "5",
        name: "Test 5",
        description: "Test description",
        ingredients: "",
        instructions: "",
    },
    {
        id: "6",
        name: "Test 6",
        description: "Test description",
        ingredients: "",
        instructions: "",
    },
    {
        id: "7",
        name: "Test 7",
        description: "Test description",
        ingredients: "",
        instructions: "",
    },
    {
        id: "8",
        name: "Test 8",
        description: "Test description",
        ingredients: "",
        instructions: "",
    },
];

export const getTestRecipes = (): Promise<RecipeInterface[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testRecipes);
        }, 1000);
    });
};

export const getTestRecipe = (id: string): Promise<RecipeInterface> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recipe = testRecipes.find(
                (testRecipe) => testRecipe.id === id
            );
            if (recipe) {
                resolve(recipe);
            } else {
                reject("recipe undefined");
            }
        }, 1000);
    });
};
