import Link from "next/link";
import { notFound } from "next/navigation";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { ClockIcon, PencilIcon } from "@heroicons/react/24/outline";
import { getPlaiceholder } from "plaiceholder";
import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import { Recipe } from "@/types/typings";
import ImageWithFallback from "@/app/components/ImageWithFallback";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import { RECIPES } from "@/utils/routes";
import IngredientsViewer from "./IngredientsViewer";
import InstructionsViewer from "./InstructionsViewer";

type Props = {
    params: { recipeId: string };
};

async function RecipePage({ params: { recipeId } }: Props) {
    const user = await getServerSessionUser();
    const recipe: Recipe = (
        await adminFirestore
            .collection("userContent")
            .doc(user.id)
            .collection("recipes")
            .doc(recipeId)
            .get()
    ).data() as Recipe;

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

    const plaiceholderData =
        image?.url != null ? await getPlaiceholder(image?.url) : undefined;

    return (
        <main className="page flex flex-col space-y-6">
            <div className="relative mx-auto w-full md:w-[95%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] h-[35vh] md:h-[45vh] lg:h-[55vh]">
                <ImageWithFallback
                    src={plaiceholderData?.img.src}
                    alt="Recipe image"
                    fallback={RECIPE_PLACEHOLDER}
                    fill={true}
                    sizes="100vw, 100vw, 100vw"
                    placeholder={plaiceholderData != null ? "blur" : undefined}
                    blurDataURL={plaiceholderData?.base64}
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
