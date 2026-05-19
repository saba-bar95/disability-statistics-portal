/** URL path segment → sector key passed to SectorPageLayout. */
export const SECTOR_ROUTES = [
  { path: "education", sector: "education" },
  { path: "healthcare", sector: "healthcare" },
  { path: "social-security", sector: "social-security" },
  { path: "sports", sector: "sport" },
];

const PATH_TO_SECTOR = Object.fromEntries(
  SECTOR_ROUTES.map(({ path, sector }) => [path, sector]),
);

/** Resolve sector key from a pathname like `/ka/education`. */
export function getSectorFromPathname(pathname) {
  const segment = pathname.split("/").filter(Boolean)[1];
  return PATH_TO_SECTOR[segment] ?? null;
}
