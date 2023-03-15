import { randomUUID } from "crypto";
import { Recipe } from "@/types/typings";
import AddRecipeForm from "./AddRecipeForm";

const INITIAL_RECIPE: Recipe = {
    name: "",
    nameLowerCase: "",
    description: "",
    ingredients: [],
    instructions: [{ id: randomUUID(), description: "" }],
};

function AddReipePage() {
    return (
        <main className="page">
            <AddRecipeForm initialRecipe={INITIAL_RECIPE} />
        </main>
    );
}

export default AddReipePage;
