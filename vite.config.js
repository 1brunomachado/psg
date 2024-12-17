import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    historyApiFallback: true, // Habilita o fallback para URLs amigáveis
  },
});
