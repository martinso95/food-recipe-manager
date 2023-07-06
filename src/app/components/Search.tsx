"use client";

import { RECIPES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
    initialValue?: string;
};
function Search({ initialValue }: Props) {
    const [searchValue, setSearchValue] = useState(initialValue || "");
    const router = useRouter();

    const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchValue !== "") {
            router.push(`${RECIPES}?searchValue=${searchValue}`);
        }
    };

    useEffect(() => {
        setSearchValue(initialValue || "");
    }, [initialValue]);

    return (
        <form
            onSubmit={handleOnSearch}
            className="mr-auto w-full md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"
        >
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
                    className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="primary-button absolute right-2.5 mt-auto mb-auto top-0 bottom-0 h-10"
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export default Search;
