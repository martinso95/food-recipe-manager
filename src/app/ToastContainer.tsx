"use client";

import { ToastContainer as ToastifyToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

function ToastContainer() {
    return (
        <ToastifyToastContainer
            theme="dark"
            position="bottom-left"
            hideProgressBar={true}
            pauseOnFocusLoss={false}
        />
    );
}

export default ToastContainer;
