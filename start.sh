#!/usr/bin/env bash
set -e

PORT=3000
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

open_browser() {
  local url="http://localhost:$PORT"
  sleep 1
  if command -v xdg-open &>/dev/null; then
    xdg-open "$url" &>/dev/null &
  elif command -v open &>/dev/null; then
    open "$url" &
  fi
}

echo ""
echo "  BRUNO — Videographer Portfolio"
echo "  ================================"
echo "  Starting server on http://localhost:$PORT"
echo "  Press Ctrl+C to stop."
echo ""

cd "$DIR"
open_browser &

# Use the first available server
if command -v python3 &>/dev/null; then
  python3 -m http.server "$PORT"
elif command -v python &>/dev/null; then
  python -m SimpleHTTPServer "$PORT"
elif command -v npx &>/dev/null; then
  npx --yes serve -l "$PORT" .
elif command -v php &>/dev/null; then
  php -S "localhost:$PORT"
else
  echo "  ERROR: No suitable server found."
  echo "  Install Python 3, Node.js, or PHP to run this script."
  exit 1
fi
