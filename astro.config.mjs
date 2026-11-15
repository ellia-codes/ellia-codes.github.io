import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // Your live address. If you ever attach a custom domain, change this line.
  site: 'https://ellia-codes.github.io',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // Code block colors. Other good ones: 'github-light', 'min-light', 'rose-pine-dawn'
      theme: 'catppuccin-latte',
      wrap: true,
    },
  },
});
