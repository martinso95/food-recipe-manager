"use client";

import React from "react";

type Props = {
    label: string;
    checked: boolean;
    onChange: () => void;
};

function Checkbox({ label, checked, onChange }: Props) {
    return (
        <div className="flex items-center p-2">
            <input
                id={`${label}-checkbox`}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label
                htmlFor={`${label}-checkbox`}
                className="ml-2 text-sm font-medium text-gray-300 cursor-pointer"
            >
                {label}
            </label>
        </div>
    );
}

export default Checkbox;
