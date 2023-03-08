"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Spinner from "./components/Spinner";

function SignOutComponent() {
    const [signOutLoading, setSignOutLoading] = useState(false);

    const handleSignOut = async () => {
        setSignOutLoading(true);
        try {
            await signOut({
                callbackUrl: "/",
            });
        } catch (error) {
            setSignOutLoading(false);
            alert("Sign Out error");
            console.warn("Error:", error);
        }
    };
    return (
        <button
            disabled={signOutLoading}
            onClick={handleSignOut}
            className="button text-xl leading-8 font-bold disabled:cursor-not-allowed flex justify-center w-full"
        >
            {signOutLoading ? <Spinner width="8" height="8" /> : "Sign Out"}
        </button>
    );
}

export default SignOutComponent;
