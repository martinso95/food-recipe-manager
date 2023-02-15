import { DefaultUser } from "next-auth";

declare module "next-auth" {
    // Add id to session user.
    interface Session {
        user: DefaultUser & {
            id: string;
        };
    }
}
