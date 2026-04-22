import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // or just remove this line entirely to use '/'
  plugins: [react()],
});
