import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/WosiWosi/", // MUST match your repo name (case sensitive)
  plugins: [react()],
});
