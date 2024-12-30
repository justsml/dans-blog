import { CollectionEntry } from "astro:content";
import * as fs from "fs";
import { resolve, dirname, join } from "path";

export function autoRegisterRedirects({
  slug,
  data: { redirects },
}: CollectionEntry<"posts">) {
  // use project root to load /public/_redirects
  const root = resolve(dirname(new URL(import.meta.url).pathname), "../../");
  const redirectsPath = join(root, "public/_redirects");
  const redMan = new RedirectManager(redirectsPath);
  // Redirect paths in `redirects` array to the `slug` path
  if (redirects) redirects.forEach((from) => redMan.add(from, `/${slug}`));

  return redirects;

  // // Redirect old paths
  // if (slug.startsWith("2021/")) {
  //   redMan.add(`/${slug}`, `/${slug.replace("2021/", "")}`);
  // }
}

export class RedirectManager {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "", "utf-8");
    }
  }

  private routeExists(
    fromPattern: string,
    redirects = this.loadRedirects(),
  ): boolean {
    return redirects.some((line) => line.startsWith(fromPattern));
  }

  private doCleanup(): void {
    // remove trailing line breaks
    let redirects = this.loadRedirects().join("\n");
    redirects = redirects.replaceAll(/\n+$/gm, "") + "\n\n";
    fs.writeFileSync(this.filePath, redirects, "utf-8");
  }

  public add(
    fromPattern: string,
    toPattern: string,
    statusCode: number = 301,
  ): void {
    if (!fromPattern.startsWith("/")) fromPattern = `/${fromPattern}`;
    if (!toPattern.startsWith("/")) toPattern = `/${toPattern}`;
    if (this.routeExists(fromPattern)) {
      // TODO: add a check to see if the redirect is the same or different!!!
      // TODO: add a check to see if the redirect is the same or different!!!
      // TODO: add a check to see if the redirect is the same or different!!!
      // TODO: add a check to see if the redirect is the same or different!!!
      console.warn(`Redirect already exists for: ${fromPattern}`);
      return;
    }
    // preemptively remove existing matching rules - check the diff, make sure nothing got messed up!
    const removed = this.remove(fromPattern);
    if (removed > 0) console.log("removed", removed);

    // const redirects = this.loadRedirects();
    // if (!toPattern.endsWith("/")) toPattern += "/";

    // // Check for conflicts
    // const conflicts = redirects.filter((line) => line.startsWith(fromPattern));
    // if (conflicts.length > 0) {
    //   // replace conflicting redirects
    //   const newRedirects = redirects.map((line) =>
    //     line.startsWith(fromPattern)
    //       ? `${fromPattern} ${toPattern} ${statusCode}`
    //       : line,
    //   );

    //   console.log(
    //     `Replacing conflicting redirects: %o %o`,
    //     conflicts,
    //     newRedirects,
    //   );
    //   this.saveRedirects(newRedirects);
    //   // throw new Error(
    //   //   `Conflicting paths found for "${fromPattern}":\n${conflicts.join("\n")}`,
    //   // );
    // }

    // Add new redirect
    const newRedirect = `${fromPattern} ${toPattern} ${statusCode}`;
    fs.appendFileSync(this.filePath, `${newRedirect}\n`);
    console.log(`Appended redirect: ${newRedirect}`);
  }

  public remove(fromPattern: string): number {
    const redirects = this.loadRedirects();
    const filteredRedirects = redirects.filter(
      (line) => !line.startsWith(fromPattern),
    );

    if (filteredRedirects.length === redirects.length)
      return (
        console.info(`No redirect found matching pattern "${fromPattern}".`) ??
        -1
      );

    this.saveRedirects(filteredRedirects);
    console.log(`Removed redirects matching pattern: ${fromPattern}`);
    return redirects.length - filteredRedirects.length;
  }

  private loadRedirects(): string[] {
    return fs.readFileSync(this.filePath, "utf-8").split("\n");
    // .filter((line) => line.trim() !== "");
  }

  private saveRedirects(redirects: string[]): void {
    let data = redirects.join("\n");
    data = data.replaceAll(/\n\n\n+$/gm, "\n") + "\n\n\n";

    fs.writeFileSync(this.filePath, data, "utf-8");
  }
}
