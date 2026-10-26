# Website maintenance instructions

Preserve all existing content, visual design, responsive layout, images, video, and interactions unless the user requests a change. This is a buildless static site: HTML lives in `index.html`, styles in `css/`, JavaScript in `js/`, and media in `assets/images/`, `assets/video/`, and `assets/icons/`. Use relative URLs compatible with the GitHub Pages repository subpath. Do not add a framework or build dependencies for routine edits.

## Routine updates

Routine website changes are authorized to be committed and pushed directly to `main`; a pull request is not required. Start with a clean working tree, fetch the current remote, and fast-forward to `origin/main` before editing. Preserve unrelated user changes. Review `git diff` before staging specific files and use descriptive commits.

Before committing, run `python scripts/check_site.py`, `node --check js/main.js`, `node --check js/gallery.js`, and `git diff --check`. Preview with `python -m http.server 8000` and verify desktop and mobile layout, navigation open/close/Escape and anchor links, gallery buttons and keyboard controls, video playback, and images. Compare appearance when reorganizing files. Report verification limits honestly. Never commit credentials, temporary previews, or generated scratch files.

Push verified commits with `git push origin HEAD:main`. `.github/workflows/pages.yml` checks local resources and JavaScript and automatically deploys successful pushes to GitHub Pages. Check the workflow result and deployed site; a successful push alone does not prove deployment succeeded. In GitHub repository Settings → Pages, the source must be GitHub Actions. Rules applying to `main` and the `github-pages` environment must allow this direct-push and automatic-deployment workflow without required PRs or manual environment approval. Preserve other protections, especially against force pushes and branch deletion. If settings access is unavailable, report the limitation rather than claiming configuration is complete.

## Rollback

Keep Git history; never force-push, reset published history, or delete rollback references. The `before-static-reorganization` tag marks the original site. For an ordinary update, use `git revert <commit>`, rerun checks, then push the revert to `main`; the same workflow publishes it automatically. To restore the original site layout while retaining deployment automation, use `git restore --source=before-static-reorganization -- index.html` and the original root media files listed by `git ls-tree --name-only before-static-reorganization`; verify the restored page before committing and pushing. Retain the current workflow and maintenance scripts. A complete revert of the initial reorganization also removes its workflow, so do not rely on that to trigger a deployment. Prefer a new restoration commit that keeps deployment automation.
