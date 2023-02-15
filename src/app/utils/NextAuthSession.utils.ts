import { nextAuthConfig } from "@/pages/api/auth/[...nextauth]";
import { getServerSession as getServerSessionWithoutConfig } from "next-auth";

export const getServerSession = async () =>
    await getServerSessionWithoutConfig(nextAuthConfig);

export const getServerSessionUser = async () => {
    const session = await getServerSession();
    if (session && session.user) {
        return session.user;
    } else {
        throw new Error("Session user not found.");
    }
};
