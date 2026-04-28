import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    server: {
        host: true,
    },
    plugins: [
        tailwindcss(),
        reactRouter(),
        tsconfigPaths(),
        VitePWA({
            includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
            manifest: {
                name: "Book Lover",
                short_name: "BookLover",
                description:
                    "Manage your book collection with ease using Book Lover, the ultimate app for book enthusiasts. Keep track of your reading list and organize your library. Whether you're a casual reader or a dedicated bookworm, Book Lover is the perfect companion for all your reading adventures.",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
