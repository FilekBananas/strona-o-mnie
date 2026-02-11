# fiip.biskupski.site

100% static personal website (HTML/CSS/JS).

## Run locally

Open `index.html` directly, or serve the folder with any static server, e.g.:

```bash
python3 -m http.server 3000
```

## Pages

- `index.html` — About (PL/EN)
- `contact.html` — Contact (PL/EN) + email + form (LICZNIK)
- `pv/wiadomosci/index.html` — Form submissions viewer (LICZNIK)
- `staty/index.html` — Traffic stats (LICZNIK, `?from=...`)

## Notes

- The site is static (GitHub Pages). Any “backend” features use external APIs (LICZNIK).
- `/pv/wiadomosci` reads the LICZNIK API key from localStorage (`filip-biskupski-site-licznik-api-key`).

## Deploy (GitHub Pages)

```bash
bash gh.sh
```

If you don’t see updates:
- Make sure GitHub Pages is set to `gh-pages` / `(root)` in repo Settings → Pages.
- Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows/Linux).
