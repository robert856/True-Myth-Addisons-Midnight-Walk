# The True Myth — Addison's Midnight Walk

Project website and pitch materials.

This static site needs no build step:

- `index.html`: page content and structure
- `css/styles.css`: existing styles
- `js/`: navigation, scroll behavior, and gallery controls
- `assets/`: original images, video, and icons
- `scripts/check_site.py`: local resource and anchor checks

Preview from the repository root with `python -m http.server 8000`.
Before committing, run `python scripts/check_site.py`, `node --check js/main.js`, `node --check js/gallery.js`, and `git diff --check`; then check the preview on desktop and mobile.

Verified changes can be committed directly to `main` and pushed with `git push origin HEAD:main`. The Pages workflow validates and deploys each push automatically, publishing only website files. The repository's Pages source must be **GitHub Actions**; branch rules must allow direct updates to `main`, and the `github-pages` environment must allow automatic deployment without manual approval. These remote settings require repository administration access.

See `AGENTS.md` for maintenance and rollback instructions. Use `git revert <commit>` for normal rollbacks; retain deployment automation when restoring the original site from `before-static-reorganization`.
