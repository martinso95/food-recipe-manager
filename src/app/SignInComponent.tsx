"use client";

import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import Spinner from "./components/Spinner";

type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignInComponent({ providers }: Props) {
    const [signInLoading, setSignInLoading] = useState(false);
    const handleSignIn = async (providerId: string) => {
        setSignInLoading(true);
        try {
            await signIn(providerId, {
                callbackUrl: "/",
            });
        } catch (error) {
            setSignInLoading(false);
            alert("Sign In error");
            console.warn("Error:", error);
        }
    };

    return (
        <div className="flex flex-col space-y-4 border rounded-lg w-full sm:w-80 p-4 bg-gray-700 border-gray-600">
            <p className="label text-lg">Sign in with</p>
            {Object.values(providers!).map((provider) => (
                <button
                    key={provider.name}
                    disabled={signInLoading}
                    onClick={() => handleSignIn(provider.id)}
                    className="button text-xl leading-8 font-bold disabled:cursor-not-allowed flex justify-center"
                >
                    {signInLoading ? (
                        <Spinner width="8" height="8" />
                    ) : (
                        provider.name
                    )}
                </button>
            ))}
        </div>
    );
}

export default SignInComponent;
