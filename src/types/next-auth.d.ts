import { User } from "./typings";

declare module "next-auth" {
    // Add id to session user.
    interface Session {
        user: User;
    }
}
