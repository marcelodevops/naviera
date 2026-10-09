import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://marcelodevops.github.io',
  base: '/naviera',
  vite: {
    plugins: [tailwindcss()],
  },
});
