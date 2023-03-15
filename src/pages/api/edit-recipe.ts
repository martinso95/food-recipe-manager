import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { randomUUID } from "crypto";
import { adminFirestore, adminStorageBucket } from "@/firebase/firebaseAdmin";
import { Recipe, RecipeImage, RecipeRequestBody } from "@/types/typings";
import {
    FIREBASE_STORAGE_RECIPE_IMAGES_FOLDER,
    getFirebaseStorageImageURL,
    getImageFileExtension,
    MAX_BODY_SIZE,
    toBufferImage,
} from "@/utils/Utils";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10485760", // MAX_BODY_SIZE, ~10MB
        },
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }
    const session = await getSession({ req });

    if (session == null || session.user.id == null) {
        res.status(403).json({ message: "Not authorized." });
        return;
    }

    const {
        recipeId,
        name,
        nameLowerCase,
        description,
        time,
        servings,
        ingredients,
        instructions,
        oldImage,
        newImage,
        removeImage,
    }: RecipeRequestBody = req.body;

    if (
        recipeId == null ||
        recipeId === "" ||
        name == null ||
        name === "" ||
        nameLowerCase == null ||
        nameLowerCase === "" ||
        description == null ||
        description === "" ||
        ingredients == null ||
        ingredients.length === 0 ||
        instructions == null ||
        instructions.length === 0
    ) {
        res.status(400).json({ message: "Fields incorrect." });
        return;
    }

    if (newImage != null && !newImage.type.startsWith("image/")) {
        res.status(400).json({ message: "Only images allowed." });
        return;
    }

    const bodySize = req.headers["content-length"];
    if (Number(bodySize) > MAX_BODY_SIZE) {
        res.status(400).json({ message: "Body too large." });
        return;
    }

    // Delete old image if it is being replaced by a new one, or if the user wants it removed.
    if (oldImage != null && (newImage != null || removeImage)) {
        const oldFile = adminStorageBucket.file(oldImage.name);
        await oldFile.delete().catch(() => {
            res.status(400).json({
                message: "Could not delete old image.",
            });
            return;
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

    const newImageObject: RecipeImage | undefined =
        newImage != null
            ? {
                  id: newImageId,
                  url: newImageUrl,
                  name: newImageName,
              }
            : oldImage;

    const newRecipeObject: Recipe = {
        name: name,
        nameLowerCase,
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
        res.status(400).json({
            message: "Could not save the recipe.",
        });
        return;
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
                res.status(200).json({
                    message: "Recipe saved, but could not save the image.",
                });
            });
    }

    res.status(200).json({ message: "Recipe saved." });
}
