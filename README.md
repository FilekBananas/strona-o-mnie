# fiip.biskupski.site

100% static personal website (HTML/CSS/JS). The contact form opens a pre-filled email in the user’s email app (`mailto:`).

## Run locally

Open `public/index.html` directly, or serve the `public/` folder with any static server, e.g.:

```bash
python3 -m http.server --directory public 3000
```

## Pages

- `public/index.html` — About (PL/EN)
- `public/contact.html` — Contact (PL/EN) + form

## Notes

- The contact form does not send email automatically — it opens the user’s mail client.

## Deploy (GitHub Pages)

```bash
bash gh.sh
```

If you don’t see updates:
- Make sure GitHub Pages is set to `gh-pages` / `(root)` in repo Settings → Pages.
- Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows/Linux).
