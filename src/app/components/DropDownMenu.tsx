"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

type Orientation = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";

type Props = {
    label: string;
    isOpen: boolean;
    children: ReactNode;
    setIsOpen: (isOpen: boolean) => void;
};
function DropDownMenu({ label, isOpen, setIsOpen, children }: Props) {
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);
    const [dropdownPosition, setDropdownPosition] =
        useState<Orientation>("bottomLeft");

    useEffect(() => {
        const handleResize = () => {
            if (dropdownButtonRef.current && dropdownContentRef.current) {
                const dropdownButtonRect =
                    dropdownButtonRef.current.getBoundingClientRect();

                // Show the dropdown content temporarily to measure its dimensions
                dropdownContentRef.current.style.display = "block";

                const dropdownContentRect =
                    dropdownContentRef.current.getBoundingClientRect();

                // Hide the dropdown content again
                dropdownContentRef.current.style.display = "";

                const spaceLeft = dropdownButtonRect.left;
                const spaceRight = window.innerWidth - dropdownButtonRect.right;
                const spaceAbove = dropdownButtonRect.top;
                const spaceBelow =
                    window.innerHeight - dropdownButtonRect.bottom;

                const dropdownWidth = dropdownContentRect.width;
                const dropdownHeight = dropdownContentRect.height;

                let newPosition: Orientation = "bottomLeft";

                if (spaceBelow >= dropdownHeight) {
                    if (spaceLeft >= dropdownWidth) {
                        newPosition = "bottomLeft";
                    } else if (spaceRight >= dropdownWidth) {
                        newPosition = "bottomRight";
                    } else if (
                        spaceRight >= dropdownWidth &&
                        spaceLeft < dropdownWidth
                    ) {
                        newPosition = "bottomRight";
                    }
                } else if (spaceAbove >= dropdownHeight) {
                    if (spaceLeft >= dropdownWidth) {
                        newPosition = "topLeft";
                    } else if (spaceRight >= dropdownWidth) {
                        newPosition = "topRight";
                    } else if (
                        spaceRight >= dropdownWidth &&
                        spaceLeft < dropdownWidth
                    ) {
                        newPosition = "topRight";
                    }
                }

                setDropdownPosition(newPosition);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target instanceof HTMLElement)) return;

            if (
                dropdownButtonRef.current &&
                dropdownButtonRef.current.contains(event.target)
            ) {
                return;
            }

            if (
                dropdownContentRef.current &&
                !dropdownContentRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getOrientationCss = (dropdownPosition: Orientation) => {
        switch (dropdownPosition) {
            case "bottomLeft":
                return "top-10 right-0";
            case "bottomRight":
                return "top-10 left-0";
            case "topLeft":
                return "bottom-10 right-0";
            case "topRight":
                return "bottom-10 left-0";
            default:
                return "bottom-10 right-0";
        }
    };

    return (
        <div className="relative">
            <button
                ref={dropdownButtonRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="primary-button inline-flex items-center min-w-[10rem] justify-between"
            >
                <span className="flex flex-1 text-center justify-center">
                    {label}
                </span>
                <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>

            <div
                ref={dropdownContentRef}
                className={`absolute ${
                    !isOpen ? "hidden" : ""
                } z-40 min-w-[10rem] overflow-hidden rounded-lg shadow bg-gray-700 ${getOrientationCss(
                    dropdownPosition
                )}`}
            >
                {children}
            </div>
        </div>
    );
}

export default DropDownMenu;
