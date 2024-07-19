import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['chrome >= 49', 'last 2 versions'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime', 'intl-pluralrules'],
    }),
  ],
})
