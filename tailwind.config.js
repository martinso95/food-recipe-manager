/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./node_modules/flowbite-react/**/*.js", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                13: "repeat(13, minmax(0, 1fr))",
                16: "repeat(16, minmax(0, 1fr))",
            },
        },
    },
    darkMode: "class",
    plugins: [require("flowbite/plugin"), require("@tailwindcss/line-clamp")],
};
