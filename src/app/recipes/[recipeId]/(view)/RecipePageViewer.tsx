import ImageWithFallback from "@/app/components/ImageWithFallback";
import { Recipe } from "@/types/typings";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import { ClockIcon } from "@heroicons/react/24/outline";
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
        <div className="flex flex-col space-y-6">
            <div className="relative w-full h-[30vh] md:h-[40vh] lg:h-[50vh]">
                <ImageWithFallback
                    src={image?.url}
                    alt="Recipe image"
                    fallback={RECIPE_PLACEHOLDER}
                    fill={true}
                    sizes="100vw, 100vw, 100vw"
                    className="object-cover"
                />
            </div>
            <h1 className="text-4xl font-bold text-white">{name}</h1>
            {time != null && (
                <div className="flex flex-row space-x-2">
                    <ClockIcon className="w-6 h-6 text-white" />
                    <p className="text-base font-normal text-white">{time}</p>
                </div>
            )}
            <h2 className="text-base font-normal text-white">{description}</h2>
            {servings != null && (
                <div>
                    <p className="label">Servings</p>
                    <p className="text-base font-light text-white">
                        {servings}
                    </p>
                </div>
            )}
            <div>
                <p className="label">Ingredients</p>
                <IngredientsViewer ingredients={ingredients} />
            </div>
            <div>
                <p className="label">Instructions</p>
                <InstructionsViewer instructions={instructions} />
            </div>
        </div>
    );
}

export default RecipePageViewer;
