import ImageWithFallback from "@/app/components/ImageWithFallback";
import { Recipe } from "@/types/typings";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import IngredientsViewer from "./IngredientsViewer";
import InstructionsViewer from "./InstructionsViewer";

type Props = { recipe: Recipe };

function RecipePageViewer({ recipe }: Props) {
    const {
        name,
        description,
        time,
        servings,
        ingredients,
        instructions,
        image,
    } = recipe;

    return (
        <div>
            <ImageWithFallback
                src={image?.url}
                alt="Recipe image"
                fallback={RECIPE_PLACEHOLDER}
                width={400}
                height={400}
            />
            <h1>Name: {name}</h1>
            <h2>Description: {description}</h2>
            <p>Time: {time}</p>
            <p>Servings: {servings}</p>
            <p>Ingredients:</p>
            <IngredientsViewer ingredients={ingredients} />
            <p>Instructions:</p>
            <InstructionsViewer instructions={instructions} />
        </div>
    );
}

export default RecipePageViewer;
