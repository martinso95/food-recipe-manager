import { adminFirestore, adminStorageBucket } from "@/firebase/firebaseAdmin";
import { RecipeRequestDeleteBody } from "@/types/typings";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

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

    const { recipeId, image }: RecipeRequestDeleteBody = req.body;

    if (recipeId == null || recipeId === "") {
        res.status(400).json({ message: "Recipe not found." });
        return;
    }

    // Delete image if it exists.
    if (image != null) {
        const oldFile = adminStorageBucket.file(image.name);
        await oldFile.delete().catch(() => {
            res.status(400).json({
                message: "Could not delete image.",
            });
            return;
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
        res.status(400).json({ message: "Could not delete the recipe." });
        return;
    }

    res.status(200).json({ message: "Recipe deleted." });
}
