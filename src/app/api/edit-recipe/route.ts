import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { randomUUID } from "crypto";
import { getPlaiceholder } from "plaiceholder";
import { adminFirestore, adminStorageBucket } from "@/firebase/firebaseAdmin";
import { Recipe, RecipeImage, RecipeRequestBody } from "@/types/typings";
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
        time,
        servings,
        ingredients,
        instructions,
        oldImage,
        newImage,
        removeImage,
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

    if (newImage != null && !newImage.type.startsWith("image/")) {
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

    // Delete old image if it is being replaced by a new one, or if the user wants it removed.
    if (oldImage != null && (newImage != null || removeImage)) {
        const oldFile = adminStorageBucket.file(oldImage.name);
        await oldFile.delete().catch(() => {
            return NextResponse.json(
                { message: "Could not delete old image." },
                { status: 400 }
            );
        });
    }

    const newImageId = randomUUID();

    const newImageName =
        newImage != null
            ? `${FIREBASE_STORAGE_RECIPE_IMAGES_FOLDER}/${newImageId}.${getImageFileExtension(
                  newImage.type
              )}`
            : "";

    const newImageUrl =
        newImage != null
            ? getFirebaseStorageImageURL(
                  adminStorageBucket.name,
                  newImageName,
                  newImageId
              )
            : "";

    const blurImageData =
        newImage != null
            ? (await getPlaiceholder(toBufferImage(newImage.data))).base64
            : undefined;

    const newImageObject: RecipeImage | undefined =
        newImage != null
            ? {
                  id: newImageId,
                  url: newImageUrl,
                  name: newImageName,
                  blurImageData: blurImageData!,
              }
            : oldImage;

    const newRecipeObject: Recipe = {
        recipeId: recipeId,
        name: name,
        orderValue: orderValue,
        description: description,
        time: time,
        servings: servings,
        ingredients: ingredients,
        instructions: instructions,
        image: removeImage ? undefined : newImageObject,
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

    if (newImage != null && newImage.data != null && newImage.type != null) {
        const newFile = adminStorageBucket.file(newImageName);

        await newFile
            .save(toBufferImage(newImage.data), {
                resumable: false,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: newImageId,
                    },
                },
            })
            .catch(() => {
                return NextResponse.json(
                    {
                        message: "Recipe saved, but could not save the image.",
                    },
                    { status: 200 }
                );
            });
    }

    return NextResponse.json(
        {
            message: "Recipe saved.",
        },
        { status: 200 }
    );
}
