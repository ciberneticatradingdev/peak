import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
import { exec } from 'child_process';

export default defineConfig({
  site: "https://astro-simple-starter.netlify.app/",
  integrations: [tailwind(), sitemap(), solidJs()],
  output: "server", // o "server", según el caso
  adapter: vercel(),
  ssr: true,
  hooks: {
    'astro:build:done': async ({ dir, routes }) => {
      console.log('🔒 Aplicando protección de código...');
      
      // Ejecutar el script de protección después del build
      exec('node scripts/protect-build.js', (error, stdout, stderr) => {
        if (error) {
          console.error('Error al proteger el código:', error);
          return;
        }
        console.log(stdout);
      });
    },
  },
});
