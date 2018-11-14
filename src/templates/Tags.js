// import React from "react";
// import Link from "gatsby-link";
// import Main from "../components/Main/";
// import Article from "../components/Main/Article";
// import "../styles/shared.css";
// import injectSheet from "react-jss";

// const styles = theme => ({
//   tags: {
//     display: "none"
//   }
// });

// const Tags = ({ data, pathContext }) => {
//   const { posts, tagName } = pathContext;
//   const { tag } = pathContext;
//   const { edges, totalCount } = data.allMarkdownRemark;
//   const tagHeader = `${totalCount} post${
//     totalCount === 1 ? "" : "s"
//   } tagged with "${tag}"`;

//   // if (posts) {
//   return (
//     <Main>
//       <Article>
//         <h2>
//           Posts about <i>{tagName}</i>
//         </h2>

//         {posts && (
//           <ul className="tag-page">
//             {posts.map(post => {
//               // console.log('tagging', post)
//               return (
//                 <li key={post.id} {...post}>
//                   <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </Article>
//     </Main>
//   );
//   // }
// };

// export default injectSheet(styles)(Tags);

import React from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import Article from "../components/Main/Article";
import "../styles/shared.css";
import injectSheet from "react-jss";
import { slugify } from "./../utils/helpers.js";

// Components
import Link from "gatsby-link";

const styles = theme => ({
  tags: {
    display: "none"
  }
});

const Tags = ({ pathContext, data }) => {
  const { tagName } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tagName}"`;
  const nodes = pathContext.posts;
  console.log("pathContext", pathContext);

  return (
    <Main>
      <Article>
        <h2>
          Posts tagged with: <i>{tagName}</i>
        </h2>

        <h4>{tagHeader}</h4>

        {nodes && (
          <ul className="tag-page">
            {nodes.map(node => {
              // console.log('tagging', post)
              const slugStr = node.slug.trim("/");
              // slugify
              return (
                <li key={node.slug}>
                  <Link to={`/${slugify(slugStr)}/`}>{node.title}</Link>
                </li>
              );
            })}
          </ul>
        )}

        <h3>
          <Link to="/tags">Back to All Tags</Link>
        </h3>
      </Article>
    </Main>
  );
};

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
};

export default injectSheet(styles)(Tags);
// export default Tags;

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            subTitle
          }
        }
      }
    }
  }
`;
