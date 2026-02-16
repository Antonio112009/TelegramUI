import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

export default defineConfig({
  root,
  logLevel: 'error',
  resolve: {
    alias: {
      components: resolve(root, 'src/components'),
      helpers: resolve(root, 'src/helpers'),
      hooks: resolve(root, 'src/hooks'),
      icons: resolve(root, 'src/icons'),
      types: resolve(root, 'src/types'),
    },
  },
  css: {
    modules: {
      generateScopedName: 'tgui.[hash]',
    },
  },
  build: {
    lib: {
      entry: resolve(root, 'src/index.ts'),
      formats: ['es'],
      fileName: '_css_entry',
    },
    outDir: resolve(root, 'dist'),
    emptyOutDir: false,
    cssCodeSplit: false,
    cssMinify: true,
    rollupOptions: {
      external: [/^react/, /^@floating-ui/, /^@swc\/helpers/, /^vaul/],
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
      output: {
        assetFileNames: 'styles[extname]',
      },
    },
  },
});
