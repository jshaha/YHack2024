/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    rewrites: async () => {
        return [
          {
            source: '/api/ai/:path*',
            destination:
              '/api/ai/',
          },
        ]
      },
            typescript: {
                ignoreBuildErrors: true,
            }, eslint: {
                ignoreDuringBuilds: true,
            }
};

export default config;
