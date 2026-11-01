#!/usr/bin/env bash
# Veröffentlicht dist/ (+ .nojekyll, LICENSE) als neuen Commit auf main (GitHub Pages: Branch main, /).
# Kein Force-Push: main behält seine Historie, jeder Deploy ist ein normaler Commit.
set -euo pipefail
cd "$(dirname "$0")/.."
QUELLE="$(git rev-parse --short HEAD)"
[ -f dist/index.html ] || { echo "Erst bauen: bash scripts/bauen.sh"; exit 1; }
git fetch -q origin main
rm -rf .deploy && git worktree add -q .deploy origin/main
git -C .deploy checkout -q -B main origin/main
find .deploy -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -r dist/. .deploy/
touch .deploy/.nojekyll
cp LICENSE .deploy/LICENSE   # Alle Rechte vorbehalten – bleibt bei jedem Deploy erhalten
printf '# Funkelfilm – gebaute Seite\n\nGebaute Vorschau (GitHub Pages). Quellcode im Branch `quelle`. Alle Rechte vorbehalten, siehe LICENSE.\n' > .deploy/README.md
git -C .deploy add -A
if git -C .deploy diff --cached --quiet; then echo "Keine Änderungen."; else
  git -C .deploy commit -q -m "Gebaute Seite aus quelle@${QUELLE}

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
  git -C .deploy push -q origin main
  echo "Veröffentlicht: main ← quelle@${QUELLE}"
fi
git worktree remove --force .deploy
