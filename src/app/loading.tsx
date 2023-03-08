import Spinner from "./components/Spinner";

function LoadingRoot() {
    return (
        <div className="flex justify-center mt-20">
            <Spinner width="16" height="16" />
            <span className="sr-only">Loading Food Recipe Manager</span>
        </div>
    );
}

export default LoadingRoot;
