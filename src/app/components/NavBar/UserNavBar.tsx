"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Dropdown, Navbar } from "flowbite-react";
import { User } from "@/types/typings";
import { APP_LOGO, AVATAR_PLACEHOLDER } from "@/utils/Utils";
import { RECIPES } from "@/utils/routes";
import ImageWithFallback from "@/components/ImageWithFallback";

type Props = {
    user: User;
};

function UserNavBar({ user }: Props) {
    const { name, email, image } = user;
    const pathname = usePathname();

    return (
        <Navbar rounded fluid className="navbar">
            <Navbar.Brand href={RECIPES} className="flex-wrap">
                <Image
                    src={APP_LOGO}
                    alt="Food Recipe Manager Logo"
                    width={40}
                    height={40}
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
                            fallback={AVATAR_PLACEHOLDER}
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
                    <Dropdown.Item onClick={() => signOut()}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle className="ml-2" />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href={RECIPES} active={pathname === RECIPES}>
                    Recipes
                </Navbar.Link>
                <button
                    onClick={() =>
                        fetch("/api/update-recipes-tool", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                    }
                >
                    Update
                </button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default UserNavBar;
