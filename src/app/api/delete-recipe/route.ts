import { adminFirestore, adminStorageBucket } from "@/firebase/firebaseAdmin";
import { RecipeRequestDeleteBody } from "@/types/typings";
import { NextResponse } from "next/server";
import { getServerSession } from "@/utils/NextAuthSession.utils";

export async function POST(request: Request) {
    const session = await getServerSession();

    if (session == null || session.user.id == null) {
        return NextResponse.json(
            { message: "Not authorized." },
            { status: 403 }
        );
    }

    const { recipeId, image }: RecipeRequestDeleteBody = await request
        .json()
        .then((data) => data)
        .catch(() => {
            return NextResponse.json(
                { message: "Failed to parse JSON request content." },
                { status: 400 }
            );
        });

    if (recipeId == null || recipeId === "") {
        return NextResponse.json(
            { message: "Recipe not found." },
            { status: 400 }
        );
    }

    // Delete image if it exists.
    if (image != null) {
        const oldFile = adminStorageBucket.file(image.name);
        await oldFile.delete().catch(() => {
            return NextResponse.json(
                { message: "Could not delete image." },
                { status: 400 }
            );
        });
    }

    try {
        await adminFirestore
            .collection("userContent")
            .doc(session.user.id)
            .collection("recipes")
            .doc(recipeId)
            .delete();
    } catch (error) {
        return NextResponse.json(
            { message: "Could not delete the recipe." },
            { status: 400 }
        );
    }

    return NextResponse.json({ message: "Recipe deleted." }, { status: 200 });
}
