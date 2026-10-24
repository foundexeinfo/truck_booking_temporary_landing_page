#!/usr/bin/env bash
# Builds deploy.zip for the cPanel (CloudLinux + LiteSpeed) Node.js host.
#
# Layout inside the zip:
#   server.js      one-line wrapper that starts ./app/server.js
#   package.json   no dependencies, so "Run NPM Install" in the selector is harmless
#   app/           Next.js standalone build (server, .next, node_modules, public, .env)
#
# The CloudLinux Node.js Selector reserves `node_modules` in the app root for its
# virtualenv symlink, so the standalone build cannot sit in the root directly.
# The host also caps the account at 100 processes (threads count), so never run
# `npm install` or `next build` on the server; ship this prebuilt bundle instead.
#
# deploy.zip contains the .env secrets. It is gitignored; do not commit or share it.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/.cpanel-bundle"
ZIP="$ROOT/deploy.zip"
SHARP_TMP="$(mktemp -d)"
trap 'rm -rf "$SHARP_TMP"' EXIT

cd "$ROOT"

command -v zip >/dev/null || { echo "zip is required" >&2; exit 1; }
[ -d node_modules/sharp ] || { echo "Run npm install first" >&2; exit 1; }

echo "==> Building Next.js standalone output"
rm -rf .next
npx next build

[ -f .next/standalone/server.js ] || {
  echo "No .next/standalone/server.js; is output: \"standalone\" set in next.config.ts?" >&2
  exit 1
}

echo "==> Assembling bundle"
rm -rf "$OUT" "$ZIP"
mkdir -p "$OUT"
cp -R .next/standalone "$OUT/app"
cp -R public "$OUT/app/public"
cp -R .next/static "$OUT/app/.next/static"

if ! ls "$OUT"/app/.env* >/dev/null 2>&1; then
  echo "warning: no .env file in the bundle; MONGODB_URI and WHATSAPP_NUMBER will be unset" >&2
fi

echo "==> Adding Linux x64 sharp binaries"
SHARP_VERSION="$(node -p "require('./node_modules/sharp/package.json').version")"
(cd "$SHARP_TMP" && npm init -y >/dev/null &&
  npm install --no-audit --no-fund --silent --os=linux --cpu=x64 --libc=glibc "sharp@$SHARP_VERSION")
IMG="$OUT/app/node_modules/@img"
mkdir -p "$IMG"
for dir in "$IMG"/sharp-*; do
  case "$(basename "$dir")" in
    sharp-linux-x64 | sharp-libvips-linux-x64 | sharp-wasm32) ;;
    *) rm -rf "$dir" ;;
  esac
done
cp -R "$SHARP_TMP/node_modules/@img/sharp-linux-x64" "$SHARP_TMP/node_modules/@img/sharp-libvips-linux-x64" "$IMG/"

echo "==> Writing root wrapper"
cat > "$OUT/server.js" <<'EOF'
// CloudLinux Node.js Selector reserves node_modules in the app root for its
// virtualenv symlink, so the Next.js standalone build lives in ./app.
require('./app/server.js');
EOF
cat > "$OUT/package.json" <<'EOF'
{
  "name": "truck_booking_temporary_landing_page",
  "private": true,
  "description": "Prebuilt Next.js standalone bundle in ./app. Do not run npm install here.",
  "main": "server.js"
}
EOF

echo "==> Zipping"
(cd "$OUT" && zip -qr -X "$ZIP" .)
rm -rf "$OUT"

echo
echo "Created $ZIP ($(du -h "$ZIP" | cut -f1))"
echo "Next: upload it to the home directory in cPanel File Manager, extract it into"
echo "~/truck-booking-landing-page (replacing the old contents), then Restart the app"
echo "in Setup Node.js App (or save ~/truck-booking-landing-page/tmp/restart.txt)."
