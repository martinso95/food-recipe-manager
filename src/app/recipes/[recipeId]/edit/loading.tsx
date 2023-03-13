import RecipePageSkeleton from "@/app/components/Skeletons/RecipePageSkeleton";

export default function EditRecipePageLoading() {
    return (
        <RecipePageSkeleton screenReaderMessage="Loading edit recipe page..." />
    );
}
