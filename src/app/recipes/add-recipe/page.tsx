import { randomUUID } from "crypto";
import { Recipe } from "@/types/typings";
import AddRecipeForm from "./AddRecipeForm";

const INITIAL_RECIPE: Recipe = {
    name: "",
    description: "",
    ingredients: [],
    instructions: [{ id: randomUUID(), description: "" }],
};

async function AddReipePage() {
    return (
        <main className="page">
            <AddRecipeForm initialRecipe={INITIAL_RECIPE} />
        </main>
    );
}

export default AddReipePage;
