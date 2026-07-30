# Finding Joy — series marketing website

A static, public-facing marketing site for the **Finding Joy** young-adult trilogy by
Arjun Jain. Plain HTML, CSS, and vanilla JavaScript — **no build step and no backend.**
Deploy the folder as-is to any static host.

All three books are currently unreleased, so every book shows a **Coming Soon** state
and all purchase links are inert until you activate them (see below).

---

## Project structure

```
.
├── index.html                     # Home
├── sample-chapter.html            # Book 1 sample chapter (long-form reader)
├── praise.html                    # Endorsements
├── author.html                    # About the author
├── news.html                      # Reverse-chronological updates
├── books/
│   ├── finding-joy.html           # Book 1
│   ├── recovering-connection.html # Book 2
│   └── home-stretch.html          # Book 3
├── assets/
│   ├── css/styles.css             # Single stylesheet; palette + type scale as CSS variables
│   ├── js/main.js                 # Nav, mobile menu, reveal, reader progress, data rendering
│   ├── author.jpg                 # (optional) author photo — see "The author photo"
│   └── covers/                    # Book covers (see assets/covers/README.md)
├── data/
│   ├── retailers.js               # Purchase links (single source of truth)
│   ├── endorsements.js            # Praise quotes
│   └── news.js                    # News entries
├── favicon.svg                    # Lowercase olive "j" from the cover typography
└── README.md
```

The design system (palette, type roles, the thin cover-style divider) is derived directly
from the book covers and defined as CSS custom properties at the top of `assets/css/styles.css`.

---

## Cover images

Drop the three covers into `assets/covers/` using these exact filenames:

- `assets/covers/finding-joy.jpg`
- `assets/covers/recovering-connection.jpg`
- `assets/covers/home-stretch.jpg`

Portrait, ~**1024 × 1536** (2:3), `.jpg`. Full details and the alt text used for each are in
[`assets/covers/README.md`](assets/covers/README.md). The finished covers are already in place.

---

## How to activate purchase links

All retailer buttons (Amazon, Barnes & Noble, Bookshop.org, Apple Books, Kobo) are inert and
labelled "Coming Soon" until you provide a URL. Everything is driven by a single file:
**`data/retailers.js`**.

- **Same link for every book:** set `url` to the product URL string:
  ```js
  { name: "Amazon", url: "https://amazon.com/dp/XXXX" }
  ```
- **Per-book links:** set `url` to an object keyed by book slug
  (`finding-joy`, `recovering-connection`, `home-stretch`):
  ```js
  {
    name: "Amazon",
    url: {
      "finding-joy": "https://amazon.com/dp/BOOK1",
      "recovering-connection": null,   // still Coming Soon
      "home-stretch": null
    }
  }
  ```

As soon as a resolved URL is a non-empty string, that button becomes a live link (opens in a
new tab). Leave it `null` to keep the Coming Soon state. No HTML needs editing.

---

## How to add an endorsement

Edit **`data/endorsements.js`**. Replace a placeholder object (or add a new one):

```js
{
  quote:      "The full pull-quote text.",
  name:       "Reviewer Name",
  credential: "Publication or role",
  source_url: "https://link-to-review",  // optional; "" for none
  featured:   true                        // optional; renders in a wider card
}
```

Array order = display order. Featured cards render larger. The home page shows the first three;
the Praise page shows all of them.

---

## How to add a news entry

Edit **`data/news.js`** and add an object to the **top** of the array (newest first):

```js
{
  date:  "2026-08-15",              // ISO date, YYYY-MM-DD
  title: "Cover reveal for Book 1",
  body:  "One or two sentences of detail."
}
```

Dates are formatted for display automatically.

---

## The author photo

Optional. Drop a portrait (~4:5) at **`assets/author.jpg`**. If the file is absent, the author
page shows a graceful "Author photo coming soon" placeholder automatically — no code changes needed.

---

## Newsletter signup

The signup form on the home page is a **placeholder** and is not wired to anything. Submitting it
shows "Sign-ups open soon." To connect a real mailing list, see the commented `TODO` block around
the `<form data-newsletter>` element in `index.html` — either paste your provider's embed
(Mailchimp, Buttondown, ConvertKit, …) or point the form's `action` at your provider and remove the
`data-newsletter` attribute so the placeholder handler stops intercepting the submit.

---

## Before you go live

Search-and-replace the placeholder domain **`https://findingjoyseries.com`** with your real domain.
It appears in the `<link rel="canonical">`, Open Graph, Twitter, and JSON-LD tags of each page.
Also update the press email in `author.html` (`press@findingjoyseries.com`).

---

## Deploy (static host)

There is no build step — every file is served as-is.

### Cloudflare Pages
1. Push this repository to GitHub/GitLab.
2. In Cloudflare Pages, **Create a project → Connect to Git** and select the repo.
3. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: **`/`** (root).
4. Deploy. Cloudflare serves the static files directly.

Alternatively, drag-and-drop the project folder into Cloudflare Pages' **Direct Upload**.

### Other static hosts
The same folder works on **GitHub Pages**, **Netlify** (build command empty, publish directory `/`),
**Vercel** (Framework preset "Other", no build), **Amazon S3 + CloudFront**, or any plain web server.
Just serve the directory root; `index.html` is the entry point.

### Local preview
Because the pages load small JS data files, preview over `http://` rather than `file://`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Accessibility & performance notes

- Semantic HTML5, skip-to-content link, visible olive keyboard focus rings, alt text on every image.
- Fully responsive, mobile-first; tested at 375 / 768 / 1440 px.
- Respects `prefers-reduced-motion` (reveal animations and smooth scroll disable).
- Covers below the fold are lazy-loaded with explicit dimensions to avoid layout shift.
- No analytics, no trackers, no third-party JS libraries. Google Fonts loaded via `<link>`.
