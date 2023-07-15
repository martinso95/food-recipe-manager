import Link from "next/link";
import { getProviders } from "next-auth/react";
import { getServerSession } from "@/utils/NextAuthSession.utils";
import { RECIPES } from "@/utils/routes";
import SignInComponent from "@/components/SignInComponent";
import SignOutComponent from "@/components/SignOutComponent";

async function Home() {
    const session = await getServerSession();
    const providers = await getProviders();

    return (
        <main className="page flex flex-col space-y-6 items-center mt-10 sm:mt-20 w-full md:w-[80%]">
            {session ? (
                <>
                    <h1 className="text-6xl text-white font-bold text-center">
                        Welcome {session.user?.name}
                    </h1>
                    <div className="flex flex-col space-y-4 border rounded-lg w-full sm:w-80 p-4 bg-gray-700 border-gray-600">
                        <Link
                            href={RECIPES}
                            className="primary-button text-xl w-full"
                        >
                            Go to My recipes
                        </Link>
                        <SignOutComponent />
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-6xl text-white font-bold text-center">
                        Welcome!
                    </h1>
                    <p className="text-xl text-white font-medium text-center">
                        Food Recipe Manager is a good place to store your
                        favorite food recipes, with good viewing and editing
                        experience.
                    </p>
                    <p className="text-xl text-white font-medium text-center">
                        NOTE: This app is currently only for private use, and
                        can only be used if you have been invited.
                    </p>
                    <SignInComponent providers={providers} />
                </>
            )}
        </main>
    );
}

export default Home;
