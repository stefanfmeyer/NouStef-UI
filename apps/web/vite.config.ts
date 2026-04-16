import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('../../', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hermes-workspaces/protocol': path.resolve(rootDir, 'packages/protocol/src/index.ts'),
      '@hermes-workspaces/ui': path.resolve(rootDir, 'packages/ui/src/index.ts')
    }
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8787'
    }
  }
});
