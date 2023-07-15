import Link from "next/link";
import { notFound } from "next/navigation";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { ClockIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Recipe } from "@/types/typings";
import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import { RECIPES } from "@/utils/routes";
import ImageWithFallback from "@/components/ImageWithFallback";
import IngredientsViewer from "./components/IngredientsViewer";
import InstructionsViewer from "./components/InstructionsViewer";

const getRecipe = async (recipeId: string) => {
    const user = await getServerSessionUser();

    const recipe: Recipe = (
        await adminFirestore
            .collection("userContent")
            .doc(user.id)
            .collection("recipes")
            .doc(recipeId)
            .get()
    ).data() as Recipe;

    return recipe;
};

type Props = {
    params: { recipeId: string };
};

async function RecipePage({ params: { recipeId } }: Props) {
    const recipe = await getRecipe(recipeId);

    if (recipe == null) {
        notFound();
    }

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
        <main className="page flex flex-col space-y-6">
            <div className="relative mx-auto w-full md:w-[95%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] h-[35vh] md:h-[45vh] lg:h-[55vh]">
                <ImageWithFallback
                    src={image?.url}
                    alt="Recipe image"
                    fallback={RECIPE_PLACEHOLDER}
                    fill={true}
                    sizes="100vw, 100vw, 100vw"
                    placeholder={image != null ? "blur" : undefined}
                    blurDataURL={image?.blurImageData}
                    className="object-cover rounded-lg"
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
            <div>
                <p className="label">Proteins</p>
                <p className="text-base font-light text-white">
                    {recipe.proteins.join(", ")}
                </p>
            </div>
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

            <Link
                href={`${RECIPES}/${recipeId}/edit`}
                prefetch={false}
                className="speed-dial-button"
            >
                <PencilIcon className="h-8 w-8" />
            </Link>
        </main>
    );
}

export default RecipePage;
