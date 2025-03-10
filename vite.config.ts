
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';

// Create icons directory if it doesn't exist
if (!fs.existsSync('./public/icons')) {
  fs.mkdirSync('./public/icons', { recursive: true });
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '',
        },
        {
          src: 'public/icons',
          dest: '',
        },
        {
          src: 'public/content.css',
          dest: '',
        },
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        background: path.resolve(__dirname, 'src/background.ts'),
        content: path.resolve(__dirname, 'src/content.tsx'),
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === 'background' || chunk.name === 'content' 
            ? '[name].js'
            : 'assets/[name]-[hash].js';
        },
      },
    },
  },
}));
