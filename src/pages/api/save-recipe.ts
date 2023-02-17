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
        recipe: { name, description, ingredients, instructions },
        image,
    } = req.body;
    if (
        name == null ||
        description == null ||
        ingredients == null ||
        instructions == null
    ) {
        res.status(400).json({ body: "Bad request" });
    }

    const uuid = randomUUID();

    const imageName =
        image != null
            ? `${FIREBASE_STORAGE_RECIPE_IMAGES_FOLDER}/${uuid}.${getImageFileExtension(
                  image.type
              )}`
            : "";

    const imageUrl =
        image != null
            ? getFirebaseStorageImageURL(
                  adminStorageBucket.name,
                  imageName,
                  uuid
              )
            : "";
    console.log(uuid);
    try {
        await adminFirestore
            .collection("userContent")
            .doc(session.user.id)
            .collection("recipes")
            .doc(uuid)
            .set({
                name: name,
                description: description,
                ingredients: ingredients,
                instructions: instructions,
                image: image != null ? imageUrl : null,
            });
    } catch (error) {
        res.status(400).json({ body: `Server error: ${error}` });
    }

    if (image != null && image.data != null && image.type != null) {
        const file = adminStorageBucket.file(imageName);

        await file
            .save(toBufferImage(image.data), {
                resumable: false,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: uuid,
                    },
                },
            })
            .then(() => {
                console.log("Recipe image added to the storage.");
            })
            .catch(() => {
                console.error("File save failed!");
                return null;
            });
    }

    res.status(200).send("Recipe added to the databse.");
}
