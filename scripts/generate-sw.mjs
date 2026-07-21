import fs from "node:fs/promises"
import path from "node:path"
import { generateSW } from "workbox-build"

// For better offline support with fonts
const rootDir = path.resolve(process.cwd(), "public")

const result = await generateSW({
  globDirectory: rootDir,
  globPatterns: ["**/*.{html,css,js,json,ico,svg,png,jpg,jpeg,webp,woff,woff2,xml}"],
  swDest: path.join(rootDir, "sw.js"),
  globIgnores: ["sw.js"],
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  directoryIndex: null,
  mode: "production",
  navigateFallback: "/index.html",
  navigateFallbackDenylist: [/\/api\//],
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "google-fonts-stylesheets",
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "cdnjs",
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
})

await fs.writeFile(
  path.join(rootDir, "sw-meta.json"),
  JSON.stringify(
    {
      count: result.count,
      size: result.size,
    },
    null,
    2,
  ),
)

console.log(`Generated sw.js with ${result.count} precached files (${result.size} bytes).`)
