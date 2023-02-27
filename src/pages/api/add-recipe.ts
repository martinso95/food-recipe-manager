import { adminFirestore, adminStorageBucket } from "@/firebase/firebaseAdmin";
import { Recipe, RecipeRequestBody } from "@/types/typings";
import {
    FIREBASE_STORAGE_RECIPE_IMAGES_FOLDER,
    getFirebaseStorageImageURL,
    getImageFileExtension,
    toBufferImage,
} from "@/utils/Utils";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ body: "Method not allowed." });
        return;
    }
    const session = await getSession({ req });

    if (session == null || session.user.id == null) {
        res.status(403).json({ body: "Not authorized." });
        return;
    }

    const {
        name,
        description,
        time,
        servings,
        ingredients,
        instructions,
        newImage: image,
    }: RecipeRequestBody = req.body;

    if (
        name == null ||
        name === "" ||
        description == null ||
        description === "" ||
        ingredients == null ||
        ingredients.length === 0 ||
        instructions == null ||
        instructions.length === 0
    ) {
        res.status(400).json({ body: "Bad request" });
        return;
    }

    const recipeId = randomUUID();
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

    const newRecipeObject: Recipe = {
        name,
        description,
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
        res.status(400).json({ body: `Server error: ${error}` });
        return;
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
                console.error("Image could not be saved.");
            });
    }

    res.status(200).send("Recipe added to the databse.");
}
