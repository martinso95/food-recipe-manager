import { adminFirestore, adminStorageBucket } from "@/firebase/firebaseAdmin";
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
        recipeId,
        name,
        description,
        ingredients,
        instructions,
        oldImage,
        newImage,
    } = req.body;

    if (
        name == null ||
        name === "" ||
        description == null ||
        description === "" ||
        ingredients == null ||
        ingredients === "" ||
        instructions == null ||
        instructions === ""
    ) {
        res.status(400).json({ body: "Bad request" });
        return;
    }

    // Delete old image if it is being replaced by a new one.
    if (newImage != null && oldImage != null) {
        const oldFile = adminStorageBucket.file(oldImage.name);
        await oldFile.delete().catch(() => {
            res.status(400).json({
                body: "Server error: Could not delete old image.",
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

    try {
        await adminFirestore
            .collection("userContent")
            .doc(session.user.id)
            .collection("recipes")
            .doc(recipeId)
            .update({
                name: name,
                description: description,
                ingredients: ingredients,
                instructions: instructions,
                image:
                    newImage != null
                        ? {
                              id: newImageId,
                              url: newImageUrl,
                              name: newImageName,
                          }
                        : oldImage != null
                        ? oldImage
                        : null,
            });
    } catch (error) {
        res.status(400).json({ body: `Server error: ${error}` });
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
                console.error("Image could not be saved.");
            });
    }

    res.status(200).send("Recipe added to the databse.");
}
