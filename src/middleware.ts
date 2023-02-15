import withAuth from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: async ({ req }) => {
            const response = await fetch(
                `${req.nextUrl.origin}/api/auth/is-authenticated`,
                {
                    headers: req.headers,
                }
            );
            if (response.ok) {
                const isAuthenticated = await response
                    .json()
                    .then(({ isAuthenticated }) => isAuthenticated);
                return isAuthenticated;
            } else {
                return false;
            }
        },
    },
});

export const config = {
    matcher: ["/recipes", "/recipes/:path*"],
};
