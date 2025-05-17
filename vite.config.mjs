import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react()],
    base: "/",
    server: {
      port: 3000,
      open: true,
    },
  };
});
