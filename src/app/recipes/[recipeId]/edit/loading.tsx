import RecipePageSkeleton from "@/app/components/Skeletons/RecipePageSkeleton";

export default function RecipePageLoading() {
    return (
        <RecipePageSkeleton screenReaderMessage="Loading edit recipe page..." />
    );
}
