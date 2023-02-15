"use client";

import { signOut } from "next-auth/react";

type Props = {
    className?: string | undefined;
};
function SignOutComponent({ className }: Props) {
    return (
        <button
            className={className}
            onClick={() => signOut({ callbackUrl: "/" })}
        >
            Sign Out
        </button>
    );
}

export default SignOutComponent;
