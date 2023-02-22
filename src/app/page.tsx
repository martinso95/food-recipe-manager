import Link from "next/link";
import { getProviders } from "next-auth/react";
import SignInComponent from "./SignInComponent";
import Image from "next/image";
import SignOutComponent from "./components/SignOutComponent";
import { getServerSession } from "@/utils/NextAuthSession.utils";

async function Home() {
    const session = await getServerSession();
    const providers = await getProviders();

    return (
        <main className="flex flex-col space-y-5 items-center justify-center h-screen">
            {session ? (
                <>
                    <div className="flex flex-row space-x-2">
                        <h1 className="text-6xl font-bold my-auto">
                            Welcome {session.user?.name}
                        </h1>
                        {session.user.image && (
                            <Image
                                src={session.user.image}
                                alt="Profile picture"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                        )}
                    </div>
                    <Link
                        href="/recipes"
                        className="text-4xl bg-blue-600 w-fit flex items-center justify-center py-4 px-4 rounded-lg text-white font-bold"
                    >
                        Go to My recipes
                    </Link>
                    <SignOutComponent className="text-4xl bg-blue-600 w-fit flex items-center justify-center py-4 px-4 rounded-lg text-white font-bold" />
                </>
            ) : (
                <>
                    <h1 className="text-6xl font-bold">
                        Welcome to Food Recipe Manager
                    </h1>
                    <SignInComponent providers={providers} />
                </>
            )}
        </main>
    );
}

export default Home;
