function RecipesNotFound() {
    return (
        <div className="flex flex-col space-y-6 items-center mt-10 sm:mt-20">
            <h2 className="page-title text-center">
                Could not find any recipes
            </h2>
        </div>
    );
}

export default RecipesNotFound;
