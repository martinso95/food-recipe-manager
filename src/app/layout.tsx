import "./globals.css";
import { getServerSession } from "@/utils/NextAuthSession.utils";
import Providers from "./Providers";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang="en" className="dark">
            <head />
            <body>
                <Providers session={session}>{children}</Providers>
            </body>
        </html>
    );
}
