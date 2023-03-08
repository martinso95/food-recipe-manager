import "./globals.css";

import { getServerSession } from "@/utils/NextAuthSession.utils";
import Providers from "./Providers";
import PublicNavBar from "./components/PublicNavBar";
import UserNavBar from "./components/UserNavBar";

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
            </body>
        </html>
    );
}
