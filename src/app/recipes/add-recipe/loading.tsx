import RecipePageSkeleton from "@/app/components/Skeletons/RecipePageSkeleton";

export default function AddReipePageLoading() {
    return (
        <RecipePageSkeleton screenReaderMessage="Loading add recipe page..." />
    );
}
