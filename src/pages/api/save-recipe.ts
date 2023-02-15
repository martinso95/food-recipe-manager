import { adminFirestore } from "@/firebase/firebaseAdmin";
import { RecipeInterface } from "@/types/typings";
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
    const { name, description, ingredients, instructions }: RecipeInterface =
        req.body;
    try {
        await adminFirestore
            .collection("userContent")
            .doc(session.user.id)
            .collection("recipes")
            .doc(randomUUID())
            .set({
                name: name,
                description: description,
                ingredients: ingredients,
                instructions: instructions,
            });
        res.status(200).send("Recipe added to the databse.");
    } catch (error) {
        res.status(400).json({ body: `Server error: ${error}` });
    }
}
