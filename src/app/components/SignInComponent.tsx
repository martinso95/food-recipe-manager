"use client";

import { getProviders, signIn } from "next-auth/react";

type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignInComponent({ providers }: Props) {
    const handleSignIn = async (providerId: string) => {
        try {
            await signIn(providerId, {
                callbackUrl: "/",
            });
        } catch (error) {
            alert("Sign In error");
            console.warn("Error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-5">
            {Object.values(providers!).map((provider) => (
                <button
                    key={provider.name}
                    onClick={() => handleSignIn(provider.id)}
                    className="text-4xl bg-blue-600 w-fit flex items-center justify-center py-4 px-4 rounded-lg text-white font-bold"
                >
                    Sign In with {provider.name}
                </button>
            ))}
        </div>
    );
}

export default SignInComponent;
