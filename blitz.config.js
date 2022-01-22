import { sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
const config = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "movies-demo",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  images: {
    domains: ["image.tmdb.org"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config
