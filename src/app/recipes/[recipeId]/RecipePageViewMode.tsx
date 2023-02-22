import ImageWithFallback from "@/app/components/ImageWithFallback";
import { RecipeInterface } from "@/types/typings";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";

type Props = { recipe: RecipeInterface };

function RecipePageViewMode({ recipe }: Props) {
    const { name, description, ingredients, instructions, image } = recipe;

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
            <p>Ingredients:</p>
            {ingredients}
            <p>Instructions:</p>
            <p>{instructions}</p>
        </div>
    );
}

export default RecipePageViewMode;
