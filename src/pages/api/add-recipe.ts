import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { randomUUID } from "crypto";
import { adminFirestore, adminStorageBucket } from "@/firebase/firebaseAdmin";
import { Recipe, RecipeRequestBody } from "@/types/typings";
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

    if (image != null && !image.type.startsWith("image/")) {
        res.status(400).json({ body: "Bad request: Only images allowed." });
        return;
    }

    const bodySize = req.headers["content-length"];
    if (Number(bodySize) > MAX_BODY_SIZE) {
        res.status(400).json({ body: "Bad request: Body too large." });
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

    res.status(200).json({
        recipeId: recipeId,
        message: "Recipe added to the databse.",
    });
}
