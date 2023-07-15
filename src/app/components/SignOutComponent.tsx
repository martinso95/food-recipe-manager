"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

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
            toast.error("Could not sign out.");
        }
    };
    return (
        <button
            disabled={signOutLoading}
            onClick={handleSignOut}
            className="primary-button text-xl disabled:cursor-not-allowed w-full"
        >
            {signOutLoading ? <Spinner width="8" height="8" /> : "Sign Out"}
        </button>
    );
}

export default SignOutComponent;
