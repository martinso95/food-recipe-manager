import { Recipe } from "@/types/typings";

export const RECIPE_PLACEHOLDER = "/recipe-placeholder.png";

export const FIREBASE_STORAGE_RECIPE_IMAGES_FOLDER = "recipeImages";

/**
 *
 * @param imageFileType Must be a image file type, e.g. image/png.
 * @returns The extension of the file.
 */
export function getImageFileExtension(imageFileType: string) {
    return imageFileType.split("/")[1];
}

/**
 * Takes in an image and converts it into a base64 string.
 * The return value will not include the "data:image/extension;base64," in the beginning.
 *
 * @param image Image of File type. Can for example come from browser input.
 * @returns base64Image of type string.
 */
export const toBase64Image = (image: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const regex = new RegExp(`^data:${image.type};base64,`);
            const trimmedBase64Image = (reader.result as string).replace(
                regex,
                ""
            );
            resolve(trimmedBase64Image);
        };
        reader.onerror = () => reject(undefined);
        reader.readAsDataURL(image);
    });

/**
 * Create a buffer from a base64 image. To be used in Firebase storage save.
 *
 * @param base64Image A base64Image string.
 * @returns Buffer.
 */
export const toBufferImage = (base64Image: string) => {
    return Buffer.from(base64Image, "base64");
};

/**
 * Construct a publicly accessible firebase storage url to the image.
 * While it is publicly available, it is still secured by a token.
 * This is needed since Firebase admin does provide this kind of url.
 *
 * @param bucketName Name of the Firebase storage bucket name.
 * @param fileName Name of the file name in the storage.
 * @param token The Firebase storage image access token.
 * @returns
 */
export const getFirebaseStorageImageURL = (
    bucketName: string,
    fileName: string,
    token: string
) =>
    "https://firebasestorage.googleapis.com/v0/b/" +
    bucketName +
    "/o/" +
    encodeURIComponent(fileName) +
    "?alt=media&token=" +
    token;

export const INITIAL_RECIPE_STATE: Recipe = {
    name: "",
    description: "",
    instructions: "",
    ingredients: "",
};

export const isRecipeValid = (recipe: Recipe) => {
    const { name, description, ingredients, instructions } = recipe;
    return (
        name !== "" &&
        description !== "" &&
        ingredients !== "" &&
        instructions !== ""
    );
};
