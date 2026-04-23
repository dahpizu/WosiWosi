import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/WosiWosi/", // 👈 THIS is the fix
  plugins: [react()],
});
