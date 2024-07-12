import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/goit-react-hw-08-phonebook/",
  build: {
    outDir: "./dist",
  },
  server: {
    open: true,
  },
});
