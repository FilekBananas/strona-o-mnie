# fiip.biskupski.site

100% static personal website (HTML/CSS/JS). The contact form opens a pre-filled email in the user’s email app (`mailto:`).

## Run locally

Open `public/index.html` directly, or serve the `public/` folder with any static server, e.g.:

```bash
python3 -m http.server --directory public 3000
```

## Pages

- `public/index.html` — About me (PL)
- `public/contact.html` — Contact (English) + form

## Notes

- The contact form does not send email automatically — it opens the user’s mail client.
