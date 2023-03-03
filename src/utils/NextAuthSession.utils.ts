import { nextAuthConfig } from "@/pages/api/auth/[...nextauth]";
import { getServerSession as getServerSessionWithoutConfig } from "next-auth";
import { User } from "@/types/typings";

export const getServerSession = async () =>
    await getServerSessionWithoutConfig(nextAuthConfig);

export const getServerSessionUser = async (): Promise<User> => {
    const session = await getServerSession();
    if (session && session.user) {
        return session.user;
    } else {
        throw new Error("Session user not found.");
    }
};
