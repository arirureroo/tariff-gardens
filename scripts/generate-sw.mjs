import fs from "node:fs/promises"
import path from "node:path"
import { generateSW } from "workbox-build"

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
  navigateFallbackDenylist: [/\/api\//, /\/static\//, /\/tags\//],
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\//,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
      },
    },
    {
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\//,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "cdnjs",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30,
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
