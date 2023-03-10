"use client";

import Image from "next/image";
import { Navbar } from "flowbite-react";
import { APP_LOGO } from "@/utils/Utils";
import { RECIPES } from "@/utils/routes";

function PublicNavBar() {
    return (
        <Navbar rounded fluid className="container mx-auto sticky top-0 z-50">
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
        </Navbar>
    );
}

export default PublicNavBar;
