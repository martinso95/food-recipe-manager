import Link from "next/link";
import { Recipe } from "@/types/typings";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import { RECIPES } from "@/utils/routes";
import ImageWithFallback from "@/components/ImageWithFallback";

type Props = {
    recipe: Recipe;
};

function RecipeListCard({ recipe }: Props) {
    const { recipeId, image, name, description, time } = recipe;
    return (
        <Link
            href={`${RECIPES}/${recipeId}`}
            className="flex flex-col mx-auto bg-gray-800 border border-gray-500 rounded-lg shadow min-w-[14rem] w-full max-w-[30rem] h-full"
        >
            <ImageWithFallback
                src={image?.url}
                alt="Recipe image"
                width={600}
                height={600}
                fallback={RECIPE_PLACEHOLDER}
                placeholder={image != null ? "blur" : undefined}
                blurDataURL={image != null ? image.blurImageData : undefined}
                className="mb-2 object-cover rounded-t-lg mx-auto h-1/2"
            />
            <h5
                title={name}
                className="mb-2 mx-5 text-xl font-bold text-white line-clamp-2 shrink-0"
            >
                {name}
            </h5>
            <p className="mb-2 mx-5 font-normal text-gray-400 line-clamp-4 shrink-0">
                {description}
            </p>
            <p className="mb-4 mt-auto mx-5 font-bold text-sm text-gray-300 line-clamp-1 shrink-0">
                {time}
            </p>
        </Link>
    );
}

export default RecipeListCard;
