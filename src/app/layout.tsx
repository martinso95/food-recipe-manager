import "./globals.css";

import type { Metadata } from "next";
import { getServerSession } from "@/utils/NextAuthSession.utils";
import Providers from "./Providers";
import PublicNavBar from "./components/PublicNavBar";
import UserNavBar from "./components/UserNavBar";
import ToastContainer from "./ToastContainer";

export const metadata: Metadata = {
    title: "Food Recipe Manager",
    description: "Save your recipes here",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
    themeColor: "black",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang="en" className="dark">
            <head />
            <body className="bg-gray-600">
                {session?.user != null ? (
                    <UserNavBar user={session?.user} />
                ) : (
                    <PublicNavBar />
                )}
                <Providers session={session}>{children}</Providers>
                <ToastContainer />
            </body>
        </html>
    );
}
