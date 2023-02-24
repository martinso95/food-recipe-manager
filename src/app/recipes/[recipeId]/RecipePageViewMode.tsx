import ImageWithFallback from "@/app/components/ImageWithFallback";
import { Recipe } from "@/types/typings";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";

type Props = { recipe: Recipe };

function RecipePageViewMode({ recipe }: Props) {
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
            <ul>
                {ingredients.map(({ id, amount, unit, name }) => (
                    <li key={id}>{`${amount} ${unit} ${name}`.trim()}</li>
                ))}
            </ul>
            <p>Instructions:</p>
            <p>{instructions}</p>
        </div>
    );
}

export default RecipePageViewMode;
