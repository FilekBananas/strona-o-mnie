#!/usr/bin/env bash
set -euo pipefail

# Deploy the static site in `public/` to GitHub Pages.
#
# Target:
# - GitHub user: FilekBananas
# - Repo:        strona-o-mnie
# - Pages:       gh-pages branch (root)

GITHUB_USER="${GITHUB_USER:-FilekBananas}"
REPO_NAME="${REPO_NAME:-strona-o-mnie}"
REMOTE_NAME="${REMOTE_NAME:-origin}"
REMOTE_URL="${REMOTE_URL:-git@github.com:${GITHUB_USER}/${REPO_NAME}.git}"
BRANCH_MAIN="${BRANCH_MAIN:-main}"
PAGES_BRANCH="${PAGES_BRANCH:-gh-pages}"
COMMIT_MSG="${COMMIT_MSG:-deploy}"
PREFIX_DIR="${PREFIX_DIR:-public}"

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git not found."
  exit 1
fi

if [[ ! -d "$PREFIX_DIR" ]]; then
  echo "Error: missing '$PREFIX_DIR/' directory."
  exit 1
fi

if [[ ! -d .git ]]; then
  git init
  git checkout -b "$BRANCH_MAIN"
fi

if ! git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
  git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

# Commit current changes to main branch (optional but useful).
git add -A
if ! git diff --cached --quiet; then
  git commit -m "$COMMIT_MSG"
fi

git branch -M "$BRANCH_MAIN"
git push -u "$REMOTE_NAME" "$BRANCH_MAIN"

# Deploy only the `public/` folder to the Pages branch.
#
# NOTE: this FORCE UPDATES the gh-pages branch.
tmp_branch="__pages_tmp__"
git branch -D "$tmp_branch" >/dev/null 2>&1 || true
git subtree split --prefix "$PREFIX_DIR" -b "$tmp_branch"
git push -f "$REMOTE_NAME" "$tmp_branch:$PAGES_BRANCH"
git branch -D "$tmp_branch" >/dev/null 2>&1 || true

echo "Done."
echo "If needed, enable GitHub Pages: Settings → Pages → Deploy from branch → $PAGES_BRANCH / (root)."

