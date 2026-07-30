/* ============================================================
   RETAILERS — single source of truth for purchase links
   ------------------------------------------------------------
   HOW TO ACTIVATE A RETAILER:
   Every book is currently "Coming Soon", so each retailer's
   `url` is null and its button renders inert (reduced opacity,
   aria-disabled="true", labelled "Coming Soon").

   To turn a link on, set the `url` for that retailer to the
   real product page. Two ways:

   1. Same link for every book (simplest):
        { name: "Amazon", url: "https://amazon.com/dp/XXXX" }

   2. Per-book links: set `url` to an object keyed by book slug
      ("finding-joy" | "recovering-connection" | "home-stretch"):
        {
          name: "Amazon",
          url: {
            "finding-joy": "https://amazon.com/dp/BOOK1",
            "recovering-connection": null,   // still coming soon
            "home-stretch": null
          }
        }

   As soon as a resolved url is a non-empty string, that button
   becomes a live link that opens in a new tab. Leave it null to
   keep the "Coming Soon" state. No other file needs editing.
   ============================================================ */
(function (global) {
  global.RETAILERS = [
    { name: "Amazon",        url: null },
    { name: "Barnes & Noble", url: null },
    { name: "Bookshop.org",  url: null },
    { name: "Apple Books",   url: null },
    { name: "Kobo",          url: null }
  ];
})(window);
