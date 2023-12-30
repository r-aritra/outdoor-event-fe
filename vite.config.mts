import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  assetsInclude: ['/sb-preview/runtime.js'],
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3001,
  },
});
