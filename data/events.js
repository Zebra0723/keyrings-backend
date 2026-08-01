/* ============================================================
   EVENTS — drives the Events page
   ------------------------------------------------------------
   No events are scheduled yet, so the array is empty and the
   page shows a friendly "nothing scheduled" state.

   HOW TO ADD AN EVENT (newest/soonest first):
     {
       date:     "2026-10-04",           // ISO date, YYYY-MM-DD
       time:     "6:30 PM",              // optional display time, "" if none
       title:    "Launch reading & signing",
       venue:    "The Booksmith",
       location: "San Francisco, CA",
       url:      "https://tickets.example.com",  // optional; "" if none
       note:     "Q&A to follow."        // optional; "" if none
     }
   Rendered by assets/js/main.js — no HTML edits needed.
   ============================================================ */
(function (global) {
  global.EVENTS = [];
})(window);
