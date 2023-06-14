import NextAuth, { AuthOptions } from "next-auth";
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";

export const nextAuthConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    adapter: FirestoreAdapter(adminFirestore),
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) {
                return url;
            }
            // Allows relative callback URLs.
            if (url.startsWith("/")) {
                return new URL(url, baseUrl).toString();
            }
            return baseUrl;
        },
        async session({ session, user }) {
            if (user) {
                session.user.id = user.id;
            }
            return session;
        },
        signIn({ account, profile }) {
            const allowedUsers: string[] = JSON.parse(
                process.env.GOOGLE_USERS_WITH_ACCESS!
            );
            if (
                account &&
                account.provider === "google" &&
                profile &&
                profile.email
            ) {
                return allowedUsers.includes(profile.email);
            } else {
                return false;
            }
        },
    },
};

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
