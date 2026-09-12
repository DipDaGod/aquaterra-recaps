# /public/recaps

Drop real photos here, organised by year and month:

    /public/recaps/2026/august/hero.jpg
    /public/recaps/2026/august/moment-01.jpg
    ...

Then in `src/data/editions.js`, set the matching item's `src` field to the
path (e.g. `src: "/recaps/2026/august/hero.jpg"`). The <Photo> component
automatically uses the real image instead of the placeholder tile once
`src` is set.
