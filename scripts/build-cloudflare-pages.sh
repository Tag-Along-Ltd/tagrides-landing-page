#!/usr/bin/env bash
set -euo pipefail

api_dir="src/app/api"
disabled_dir=".cloudflare-build/api"
blog_detail_dir="src/app/blog/[slug]"
disabled_blog_detail_dir=".cloudflare-build/blog-slug"

cleanup() {
  if [ -d "$disabled_dir" ] && [ ! -d "$api_dir" ]; then
    mkdir -p "$(dirname "$api_dir")"
    mv "$disabled_dir" "$api_dir"
  fi
  if [ -d "$disabled_blog_detail_dir" ] && [ ! -d "$blog_detail_dir" ]; then
    mkdir -p "$(dirname "$blog_detail_dir")"
    mv "$disabled_blog_detail_dir" "$blog_detail_dir"
  fi
}
trap cleanup EXIT

rm -rf .cloudflare-build
mkdir -p .cloudflare-build

if [ -d "$api_dir" ]; then
  mv "$api_dir" "$disabled_dir"
fi

if [ -d "$blog_detail_dir" ]; then
  mv "$blog_detail_dir" "$disabled_blog_detail_dir"
fi

TAGRIDES_HOSTING_TARGET=cloudflare-pages next build
