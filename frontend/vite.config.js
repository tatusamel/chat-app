import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      "sockjs-client": "sockjs-client/dist/sockjs.min.js",
    },
  },
});
