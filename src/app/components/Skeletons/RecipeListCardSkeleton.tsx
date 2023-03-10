function RecipeListCardSkeleton() {
    return (
        <div
            role="status"
            className="flex flex-col mx-auto animate-pulse bg-gray-800 border border-gray-700 rounded-lg shadow min-w-[14rem] h-full w-full"
        >
            <div className="flex items-center justify-center mb-6 bg-gray-700 h-1/2">
                <svg
                    className="w-32 h-32 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
            </div>
            <div className="h-6 rounded-full bg-gray-500 mb-6 mx-5"></div>
            <div className="h-3 rounded-full bg-gray-500 mb-3 mx-5"></div>
            <div className="h-3 rounded-full bg-gray-500 mb-3 mx-5"></div>
            <div className="h-3 rounded-full bg-gray-500 mb-6 mx-5"></div>
            <div className="h-3 rounded-full bg-gray-500 mb-24 mx-5"></div>
            <span className="sr-only">Loading recipe card...</span>
        </div>
    );
}

export default RecipeListCardSkeleton;
