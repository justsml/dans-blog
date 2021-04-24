import React from "react";
// import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import { connect } from "react-redux";
import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";
import Post from "../components/Post/";
import Footer from "../components/Footer/";
import Seo from "../components/Seo";
import { injectCssByUrl } from "../utils/helpers";
// import ErrorBoundary from "../components/ErrorBoundary";

// const PostLazyWrapper = lazy(() => import("../components/Post/Post.js"));

// const renderLoader = () => <p>Loading</p>;

// const PostComponent = props => (
//   <ErrorBoundary>
//     <Suspense fallback={renderLoader()}>
//       <PostLazyWrapper {...props} />
//     </Suspense>
//   </ErrorBoundary>
// );

class PostTemplate extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  componentDidMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
    injectCssByUrl("/styles/gist-embed.css");
    injectCssByUrl(`https://unpkg.com/prismjs@0.0.1/dist/prism-okaidia/prism-okaidia.css`);
  }

  render() {
    const { data, pathContext } = this.props;
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;
    const { allTags } = data;
    return (
      <Main>
        <Post
          allTags={allTags}
          post={data.post}
          slug={pathContext.slug}
          author={data.author}
          facebook={facebook}
        />
        <Footer footnote={data.footnote} />
        <Seo data={data.post} facebook={facebook} />
      </Main>
    );
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  allTags: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape
};

export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate);

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      htmlAst
      wordCount {
        paragraphs
        sentences
        words
      }
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
        category
        date
        modified
        tags
        cover {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
      }
    }
    author: markdownRemark(id: { regex: "/author/" }) {
      id
      html
    }
    footnote: markdownRemark(id: { regex: "/footnote/" }) {
      id
      html
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    allTags: allMarkdownRemark(limit: 2000, filter: { frontmatter: { title: { ne: "" } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
