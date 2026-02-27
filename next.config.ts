import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    images: {
        remotePatterns: [
            new URL('http://coverartarchive.org/release/**'),
            new URL('https://coverartarchive.org/release/**'),
        ],
    },
};

export default nextConfig;
