import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // SPA: el proveedor de hosting debe devolver index.html para cada ruta.
  build: { outDir: 'dist', sourcemap: false },
});
