import React from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import { connect } from "react-redux";
require("core-js/fn/array/find");
require("prismjs/themes/prism-okaidia.css");

import { setNavigatorPosition, setNavigatorShape, setLocationUrl } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";
import Post from "../components/Post/";
import Footer from "../components/Footer/";
import Seo from "../components/Seo";

class PostTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    pathContext: PropTypes.object.isRequired,
    setNavigatorPosition: PropTypes.func.isRequired,
    setLocationUrl: PropTypes.func.isRequired,
    navigatorPosition: PropTypes.string.isRequired,
    locationUrl: PropTypes.string.isRequired,
    isWideScreen: PropTypes.bool.isRequired
  };

  moveNavigatorAside = moveNavigatorAside.bind(this);

  componentDidMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
  }

  render() {
    const { data, pathContext } = this.props;
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    const { locationUrl } = this.props;
    if (pathContext.slug !== locationUrl) this.props.setLocationUrl(pathContext.slug)

    return (
      <Main>
        <Post post={data.post} slug={pathContext.slug} author={data.author} facebook={facebook} />
        <Footer footnote={data.footnote} />
        <Seo data={data.post} facebook={facebook} />
      </Main>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    locationUrl: state.locationUrl,
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setLocationUrl,
  setNavigatorPosition,
  setNavigatorShape
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTemplate);

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
  }
`;
