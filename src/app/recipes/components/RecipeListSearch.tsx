"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { RECIPES } from "@/utils/routes";

type Props = {
    initialValue?: string;
};

function RecipeListSearch({ initialValue }: Props) {
    const [searchValue, setSearchValue] = useState(initialValue || "");
    const router = useRouter();

    const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`${RECIPES}?searchValue=${searchValue}`);
    };

    useEffect(() => {
        setSearchValue(initialValue || "");
    }, [initialValue]);

    return (
        <form onSubmit={handleOnSearch} className="min-w-[20rem]">
            <label htmlFor="search-input" className="sr-only">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
                <input
                    type="search"
                    id="search-input"
                    placeholder="Search recipes"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="input block p-4 pl-10"
                />
                <div className="flex space-x-1 absolute right-2.5 mt-auto mb-auto top-0 bottom-0 h-10">
                    {searchValue !== "" ? (
                        <button
                            type="button"
                            onClick={() => setSearchValue("")}
                            className="tertiary-icon-button"
                        >
                            <XMarkIcon className="h-8 w-8 text-white" />
                        </button>
                    ) : null}
                    <button type="submit" className="primary-button">
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
}

export default RecipeListSearch;
