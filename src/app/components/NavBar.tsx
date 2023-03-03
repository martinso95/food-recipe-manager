"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Dropdown, Navbar } from "flowbite-react";
import { User } from "@/types/typings";
import { RECIPE_PLACEHOLDER } from "@/utils/Utils";
import ImageWithFallback from "./ImageWithFallback";
import { RECIPES } from "@/utils/routes";

type Props = {
    user: User;
};

function NavBar({ user }: Props) {
    const { name, email, image } = user;
    const pathname = usePathname();

    return (
        <Navbar fluid={true} className="fixed top-0 left-0 w-full">
            <Navbar.Brand href={RECIPES}>
                <Image
                    src={RECIPE_PLACEHOLDER}
                    alt="Food Recipe Manager Logo"
                    width={36}
                    height={36}
                    className="mr-3"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                    Food Recipe Manager
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    inline
                    arrowIcon={false}
                    label={
                        <ImageWithFallback
                            src={image}
                            fallback={RECIPE_PLACEHOLDER}
                            alt="User photo"
                            width={32}
                            height={32}
                            className="rounded-full m-1"
                        />
                    }
                >
                    <Dropdown.Header>
                        <span
                            title={name ?? "Name unavailable"}
                            className="block text-sm"
                        >
                            {name ?? "Name unavailable"}
                        </span>
                        <span
                            title={email ?? "Email unavailable"}
                            className="block truncate text-sm font-medium"
                        >
                            {email ?? "Email unabailable"}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item
                        onClick={() => {
                            console.log("sign out");
                            signOut();
                        }}
                    >
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle className="ml-2" />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href={RECIPES} active={pathname === RECIPES}>
                    Recipes
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
