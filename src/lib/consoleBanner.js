// A small console banner for anyone poking around dev tools — styled
// after the "★ AquaTerra" badge used across the brand.
export function printConsoleBanner() {
  if (typeof console === "undefined") return;
  console.log(
    "%c★ AquaTerra Recaps",
    "background:#14170f;color:#4c8c5f;font-weight:700;font-size:14px;padding:6px 14px;border-radius:6px;font-family:sans-serif;"
  );
  console.log(
    "%cLooking around? We're student-led — check us out at ngoaquaterra.com",
    "color:#3f4a41;font-size:12px;font-family:sans-serif;"
  );
}
