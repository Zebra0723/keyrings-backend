/* ============================================================
   ENDORSEMENTS — drives the Praise page + home teaser
   ------------------------------------------------------------
   HOW TO ADD A REAL ENDORSEMENT:
   Replace a placeholder object below (or add a new one) with:
     {
       quote:      "The full pull-quote text.",
       name:       "Reviewer Name",
       credential: "Publication or role",
       source_url: "https://link-to-review",  // optional; "" if none
       featured:   true                        // optional; renders larger
     }
   Order in this array = order on the page. Set `featured: true`
   on your strongest one or two quotes to render them in a wide
   card. Everything is rendered by assets/js/main.js — no HTML
   edits needed.
   ============================================================ */
(function (global) {
  global.ENDORSEMENTS = [
    {
      quote: "Endorsement pending — quote will appear here.",
      name: "Reviewer Name",
      credential: "Publication",
      source_url: "",
      featured: true
    },
    {
      quote: "Endorsement pending — quote will appear here.",
      name: "Reviewer Name",
      credential: "Publication",
      source_url: "",
      featured: false
    },
    {
      quote: "Endorsement pending — quote will appear here.",
      name: "Reviewer Name",
      credential: "Publication",
      source_url: "",
      featured: false
    },
    {
      quote: "Endorsement pending — quote will appear here.",
      name: "Reviewer Name",
      credential: "Publication",
      source_url: "",
      featured: false
    },
    {
      quote: "Endorsement pending — quote will appear here.",
      name: "Reviewer Name",
      credential: "Publication",
      source_url: "",
      featured: false
    },
    {
      quote: "Endorsement pending — quote will appear here.",
      name: "Reviewer Name",
      credential: "Publication",
      source_url: "",
      featured: false
    }
  ];
})(window);
