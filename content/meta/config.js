const colors = require("../../src/styles/colors");

module.exports = {
  siteTitle: "Dan Levy's Collection of Articles & Learning Materials for Programmers", // <title>
  shortSiteTitle: "Dan Levy's Programming Blog", // <title> ending for posts and pages
  siteDescription: "Come for the JavaScript, stay for the cat memes.",
  siteUrl: "https://danlevy.net",
  pathPrefix: "",
  disqusShortname: "danlevy-1",
  // siteImage: "preview.jpg",
  siteLanguage: "en",
  // author
  authorName: "Dan Levy",
  authorTwitterAccount: "justsml",
  // info
  infoTitle: "dan levy",
  infoTitleNote: "fights for the user",
  // manifest.json
  manifestName: "Dan Levy's Personal Blog",
  manifestShortName: "DansSite", // max 12 characters
  manifestStartUrl: "/",
  manifestBackgroundColor: colors.background,
  manifestThemeColor: colors.background,
  manifestDisplay: "standalone",
  // contact
  contactEmail: "dan@danlevy.net",
  // social
  authorSocialLinks: [
    { name: "github", url: "https://github.com/justsml" },
    { name: "twitter", url: "https://twitter.com/justsml" },
    {
      name: "youtube",
      url: "https://www.youtube.com/user/justsml/videos?shelf_id=0&amp;sort=dd&amp;view=0"
    }
  ]
};
