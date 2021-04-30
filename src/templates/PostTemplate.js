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
import ResponsiveImage from "../components/ResponsiveImage/ResponsiveImage";

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
    const { allTags, post } = data;
    const id = (post || {}).id;
    const title = ((post || {}).frontmatter || {}).title;
    const postCover = ((post || {}).frontmatter || {}).cover;
    const resolutions = postCover ? postCover.childImageSharp.resolutions : null;
    const editFilePath = id
      .replace(" absPath of file >>> MarkdownRemark", "")
      .replace("/Users/danlevy/code/oss/dans-blog", "");
    const githubUrl = `https://github.com/justsml/dans-blog/blob/master${editFilePath}`;
    // editFilePath will look like: `/content/posts/2021-03-03--the-4-pillars-of-collaborative-culture/index.md`
    // console.log(`postCover`, JSON.stringify(postCover));
    // console.trace("image", resolutions);

    return (
      <Main>
        <div className="header-image-box">
          <ResponsiveImage className="header-image" {...resolutions} alt={`${title} cover image`} />
        </div>
        <Post
          allTags={allTags}
          post={data.post}
          slug={pathContext.slug}
          author={data.author}
          facebook={facebook}
          githubUrl={githubUrl}
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
            resolutions(width: 400, height: 400) {
              ...GatsbyImageSharpResolutions_withWebp_noBase64
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
