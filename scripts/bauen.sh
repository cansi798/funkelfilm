#!/usr/bin/env bash
# Baut die Seite in Docker (kein Node auf dem Server) und prüft die Links.
# Vorschau: bash scripts/bauen.sh   ·   Livegang: SITE=https://funkelfilm.com BASE=/ VORSCHAU=false bash scripts/bauen.sh
set -euo pipefail
cd "$(dirname "$0")/.."
SITE="${SITE:-https://cansi798.github.io}"; BASE="${BASE:-/funkelfilm}"; VORSCHAU="${VORSCHAU:-true}"
sudo -n docker run --rm --cpus=2 -u "$(id -u):$(id -g)" -e HOME=/tmp -e npm_config_cache=/tmp/npmc -e ASTRO_TELEMETRY_DISABLED=1 \
  -e SITE="$SITE" -e BASE="$BASE" -e VORSCHAU="$VORSCHAU" -v "$PWD":/app -w /app node:22 \
  sh -c 'npm ci --ignore-scripts --no-audit --no-fund >/dev/null && node node_modules/astro/bin/astro.mjs build && node scripts/links.mjs'
