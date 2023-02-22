import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import { getServerSessionUser } from "@/utils/NextAuthSession.utils";
import ImageWithFallback from "../components/ImageWithFallback";

async function RecipeListPage() {
    const user = await getServerSessionUser();
    const recipeDocuments = (
        await adminFirestore
            .collection("userContent")
            .doc(user.id)
            .collection("recipes")
            .get()
    ).docs;

    return (
        <main className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto auto-rows-[1fr] px-10 py-10">
            {recipeDocuments.map((recipeDocument) => (
                <Link
                    href={`/recipes/${recipeDocument.id}`}
                    key={recipeDocument.id}
                    className="flex flex-col space-y-2 p-4 border-2 rounded-md min-w-fit"
                >
                    <ImageWithFallback
                        src={recipeDocument.data().image?.url}
                        alt="Recipe image"
                        width={400}
                        height={400}
                        fallback={RECIPE_PLACEHOLDER}
                        className="mx-auto"
                    />
                    <p>{recipeDocument.data().name}</p>
                    <p>{recipeDocument.data().description}</p>
                </Link>
            ))}
            <Link
                href="/recipes/add-recipe"
                className="fixed right-6 bottom-6 bg-black rounded-full hover:bg-gray-800 border-white border-2"
            >
                <PlusIcon className="h-14 w-14 text-white" />
            </Link>
        </main>
    );
}

export default RecipeListPage;
