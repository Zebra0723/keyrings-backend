/* ============================================================
   NEWS — drives the News page (reverse-chronological)
   ------------------------------------------------------------
   HOW TO ADD AN UPDATE:
   Add a new object to the TOP of the array (newest first):
     {
       date:  "2026-07-30",              // ISO date, YYYY-MM-DD
       title: "Headline of the update",
       body:  "One or two sentences of detail."
     }
   Entries render in the order listed here, so keep the newest
   at the top. Rendered by assets/js/main.js — no HTML edits.
   ============================================================ */
(function (global) {
  global.NEWS = [
    {
      date: "2026-07-30",
      title: "All three books are coming soon",
      body: "All three books in the Finding Joy series are coming soon. Sign up for release announcements to be the first to know when they arrive."
    }
  ];
})(window);
