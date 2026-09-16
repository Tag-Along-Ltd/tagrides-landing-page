#!/usr/bin/env bash
set -euo pipefail

api_dir="src/app/api"
disabled_dir=".cloudflare-build/api"

cleanup() {
  if [ -d "$disabled_dir" ] && [ ! -d "$api_dir" ]; then
    mkdir -p "$(dirname "$api_dir")"
    mv "$disabled_dir" "$api_dir"
  fi
}
trap cleanup EXIT

rm -rf .cloudflare-build
mkdir -p .cloudflare-build

if [ -d "$api_dir" ]; then
  mv "$api_dir" "$disabled_dir"
fi

TAGRIDES_HOSTING_TARGET=cloudflare-pages next build
