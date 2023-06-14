import { nextAuthConfig } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession as getServerSessionDefault } from "next-auth";
import { User } from "@/types/typings";

export const getServerSession = async () =>
    await getServerSessionDefault(nextAuthConfig);

export const getServerSessionUser = async (): Promise<User> => {
    const session = await getServerSession();
    if (session && session.user) {
        return session.user;
    } else {
        throw new Error("Session user not found.");
    }
};
