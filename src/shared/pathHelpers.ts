export const fixSlugPrefix = (slug: string) => slug.replace(/^[\d-]+--/, "");

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}