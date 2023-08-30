#!/usr/bin/env bash

current_version="$(jq '.version' package.json | tr -d '"')"
npm_registry_version="$(npm info total-coverage version)"

echo "current version: $current_version"
echo "npm registry version: $npm_registry_version"

if [[ "$current_version" == "$npm_registry_version" ]]; then
  echo "Version not incremented" >&2
  exit 1
fi

exit 0