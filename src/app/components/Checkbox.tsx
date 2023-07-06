"use client";

import React from "react";

type Props = {
    label: string;
    checked: boolean;
    onChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className?: string;
};

function Checkbox({ label, checked, onChange, className = "" }: Props) {
    return (
        <div
            onClick={onChange}
            className={`flex items-center p-2 cursor-pointer ${className}`}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => event.stopPropagation()}
                className="w-4 h-4 cursor-pointer text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label className="ml-2 cursor-pointer text-sm font-medium text-gray-300">
                {label}
            </label>
        </div>
    );
}

export default Checkbox;
