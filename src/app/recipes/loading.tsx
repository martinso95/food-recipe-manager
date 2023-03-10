import RecipeListCardSkeleton from "../components/Skeletons/RecipeListCardSkeleton";

export default function RecipeListLoading() {
    return (
        <div className="page grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[1fr]">
            {[...Array(5)].map((_, i) => (
                <RecipeListCardSkeleton key={i} />
            ))}
        </div>
    );
}
