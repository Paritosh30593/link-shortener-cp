import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    logging: {
        serverFunctions: true
    },
};

export default nextConfig;
