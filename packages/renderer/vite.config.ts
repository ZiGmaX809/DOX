import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from '../../package.json';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { svgBuilder } from './src/plugins/svgBuilder';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '/public': path.resolve(__dirname, 'public'),
      '/store': path.resolve(__dirname, 'src/store'),
      '/script': path.resolve(__dirname, 'src/script'),
      '/components': path.resolve(__dirname, 'src/components'),
      '/views': path.resolve(__dirname, 'src/components/views'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    [svgBuilder(path.resolve(__dirname, 'src/assets/svgs/'))],
  ],
  base: './',
  build: {
    sourcemap: true,
    outDir: '../../dist/renderer',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 初始化tailwindcss文件，放入至main.ts中路径一致
          if (id.includes('./src/assets/styles/main.css')) {
            return 'tailwindcss';
          }
          if (id.includes('element-plus/theme-chalk/')) {
            // 当然也可以优化下这个判断，不过目前这样写足矣了。
            return 'element-plus';
          }
        },
      },
    },
  },
  server: {
    port: pkg.env.PORT,
  },
});
