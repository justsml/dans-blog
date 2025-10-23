
export const search = async (query: string) => {
  if (!query.trim()) {
    return [];
  }
    
  // @ts-ignore
  globalThis.document = {};
  // @ts-ignore
  globalThis.window ||= {};

  // @ts-ignore
  globalThis.location = {
    origin: "https://danlevy.net/",
    pathname: "/",
    // @ts-ignore
    search: "",
    hash: "",
    href: "https://danlevy.net/",
  };
  const pagefind = await import("https://danlevy.net/pagefind/pagefind.js");

  pagefind.init({
    baseUrl: "https://danlevy.net/",
  })

  const search = await pagefind.search(query, {
    limit: 20,

  });

  // for await (const result of search.results) {
  //   console.log(await result.data());
  // }
  // console.log(search);

  return search;
}