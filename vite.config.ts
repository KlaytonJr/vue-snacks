import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "VueSnacks",
            fileName: `vue-snacks`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                }
            }
        },
    },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "src")
        }
    },
    plugins: [vue(), dts()],
})
