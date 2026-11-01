// @ts-check
import { defineConfig } from 'astro/config';

// Vorschau: https://cansi798.github.io/funkelfilm/
// Livegang auf eigener Domain (funkelfilm.com): SITE=https://funkelfilm.com BASE=/ VORSCHAU=false bash scripts/bauen.sh
const SITE = process.env.SITE || 'https://cansi798.github.io';
const BASE = process.env.BASE || '/funkelfilm';

export default defineConfig({
  site: SITE,
  base: BASE,
  build: { format: 'directory', inlineStylesheets: 'never' },
  trailingSlash: 'ignore',
  compressHTML: true,
  // Skripte und Styles immer als eigene Dateien (strenge CSP ohne 'unsafe-inline')
  vite: { build: { assetsInlineLimit: 0 } },
});
