const debug = require("debug")("GATSBY-NODE");
const webpack = require("webpack");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const { store } = require(`./node_modules/gatsby/dist/redux`);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/g, "") // Trim - from start of text
    .replace(/-+$/g, ""); // Trim - from end of text
}

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    let { categories, category } = node.frontmatter;
    categories = categories || [];
    if (category) categories.push(category);
    const filename = createFilePath({ node, getNode, basePath: `pages` });
    // get the date and title from the file name
    if (/^\/([\d]{4}-[\d]{2}-[\d]{2})--(.+)\/$/.test(filename)) {
      const extracted = filename.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})--(.+)\/$/);
      debug(`extracting ${filename}`);
      const [, date, title] = extracted;
      // create a new slug concatenating everything
      // const slug = `/${slugify(categories.concat([date]).join("-"), "/")}/${title}/`;
      const slug = `/${[date].join("/").replace(/-/g, "/")}/${title}/`;
      debug(`createNodeField w/ date: ${title}: ${slug}`);
      createNodeField({ node, name: `slug`, value: slug });
      // save the date for later use
      debug(`createNodeField w/ date: ${title}: ${date}`);
      createNodeField({ node, name: `date`, value: date });
    } else {
      const slug = createFilePath({ node, getNode, basePath: `pages` });
      const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
      const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
      debug(
        `createNodeField: ${slug}: ${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
      );
      createNodeField({
        node,
        name: `slug`,
        value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
      });
      createNodeField({
        node,
        name: `prefix`,
        value: separtorIndex ? slug.substring(1, separtorIndex) : ""
      });
    }
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve("./src/templates/PostTemplate.js");
    const pageTemplate = path.resolve("./src/templates/PageTemplate.js");
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(filter: { id: { regex: "//posts|pages//" } }, limit: 1000) {
              edges {
                node {
                  id
                  fields {
                    slug
                    prefix
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create posts and pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          const slug = edge.node.fields.slug;
          const isPost = /posts/.test(edge.node.id);

          createPage({
            path: slug,
            component: isPost ? postTemplate : pageTemplate,
            context: {
              slug: slug
            }
          });
        });
      })
    );
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case "build-javascript":
      {
        let components = store.getState().pages.map(page => page.componentChunkName);
        components = _.uniq(components);
        config.plugin("CommonsChunkPlugin", webpack.optimize.CommonsChunkPlugin, [
          {
            name: `commons`,
            chunks: [`app`, ...components],
            minChunks: (module, count) => {
              const vendorModuleList = []; // [`material-ui`, `lodash`];
              const isFramework = _.some(
                vendorModuleList.map(vendor => {
                  const regex = new RegExp(`[\\\\/]node_modules[\\\\/]${vendor}[\\\\/].*`, `i`);
                  return regex.test(module.resource);
                })
              );
              return isFramework || count > 1;
            }
          }
        ]);
        // config.plugin("BundleAnalyzerPlugin", BundleAnalyzerPlugin, [
        //   {
        //     analyzerMode: "static",
        //     reportFilename: "./report/treemap.html",
        //     openAnalyzer: true,
        //     logLevel: "error",
        //     defaultSizes: "gzip"
        //   }
        // ]);
      }
      break;
  }
  return config;
};

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat([`syntax-dynamic-import`, `dynamic-import-webpack`])
  };
};
