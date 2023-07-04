import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { randomUUID } from "crypto";
import { getPlaiceholder } from "plaiceholder";
import { adminFirestore, adminStorageBucket } from "@/firebase/firebaseAdmin";
import { Recipe, RecipeRequestBody } from "@/types/typings";
import {
    FIREBASE_STORAGE_RECIPE_IMAGES_FOLDER,
    getFirebaseStorageImageURL,
    getImageFileExtension,
    MAX_BODY_SIZE,
    toBufferImage,
} from "@/utils/Utils";
import { getServerSession } from "@/utils/NextAuthSession.utils";

export async function POST(request: Request) {
    const session = await getServerSession();

    if (session == null || session.user.id == null) {
        return NextResponse.json(
            { message: "Not authorized." },
            { status: 403 }
        );
    }

    const {
        recipeId,
        name,
        orderValue,
        description,
        proteins,
        time,
        servings,
        ingredients,
        instructions,
        newImage: image,
    }: RecipeRequestBody = await request
        .json()
        .then((data) => data)
        .catch(() => {
            return NextResponse.json(
                { message: "Failed to parse JSON request content." },
                { status: 400 }
            );
        });

    if (
        recipeId == null ||
        recipeId === "" ||
        name == null ||
        name === "" ||
        orderValue == null ||
        orderValue === "" ||
        description == null ||
        description === "" ||
        proteins == null ||
        proteins.length === 0 ||
        ingredients == null ||
        ingredients.length === 0 ||
        instructions == null ||
        instructions.length === 0
    ) {
        return NextResponse.json(
            { message: "Fields incorrect." },
            { status: 400 }
        );
    }

    if (image != null && !image.type.startsWith("image/")) {
        return NextResponse.json(
            { message: "Only images allowed." },
            { status: 400 }
        );
    }

    const bodySize = headers().get("content-length");
    if (Number(bodySize) > MAX_BODY_SIZE) {
        return NextResponse.json(
            { message: "Body too large." },
            { status: 400 }
        );
    }

    const imageId = randomUUID();

    const imageName =
        image != null
            ? `${FIREBASE_STORAGE_RECIPE_IMAGES_FOLDER}/${imageId}.${getImageFileExtension(
                  image.type
              )}`
            : "";
    const imageUrl =
        image != null
            ? getFirebaseStorageImageURL(
                  adminStorageBucket.name,
                  imageName,
                  imageId
              )
            : "";

    const blurImageData =
        image != null
            ? (await getPlaiceholder(toBufferImage(image.data))).base64
            : undefined;

    const newRecipeObject: Recipe = {
        recipeId,
        name,
        orderValue,
        description,
        proteins,
        time,
        servings,
        ingredients,
        instructions,
        image:
            image != null
                ? {
                      id: imageId,
                      url: imageUrl,
                      name: imageName,
                      blurImageData: blurImageData!,
                  }
                : undefined,
    };

    try {
        await adminFirestore
            .collection("userContent")
            .doc(session.user.id)
            .collection("recipes")
            .doc(recipeId)
            .set(newRecipeObject);
    } catch (error) {
        return NextResponse.json(
            { message: "Could not save the recipe." },
            { status: 400 }
        );
    }

    if (image != null && image.data != null && image.type != null) {
        const file = adminStorageBucket.file(imageName);

        await file
            .save(toBufferImage(image.data), {
                resumable: false,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: imageId,
                    },
                },
            })
            .catch(() => {
                return NextResponse.json(
                    {
                        recipeId: recipeId,
                        message: "Recipe saved, but could not save the image.",
                    },
                    { status: 200 }
                );
            });
    }

    return NextResponse.json(
        {
            recipeId: recipeId,
            message: "Recipe saved.",
        },
        { status: 200 }
    );
}
