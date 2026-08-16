#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

if [[ "$(git branch --show-current)" != "main" && "$(git branch --show-current)" != "production" ]]; then
  echo "Run this from main or production."
  exit 1
fi

git checkout main
git pull origin main
git checkout production
git pull origin production
git merge main
git push origin production
git push ciu main
git push ciu production
git checkout main

echo "Released: Fuwad2000 production → CIUDEV live site."
