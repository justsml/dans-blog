import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { moveNavigatorAside } from "../utils/shared";
import { setNavigatorPosition, setNavigatorShape, setLocationUrl } from "../state/store";
import Main from "../components/Main/";
import Page from "../components/Page/";
import Footer from "../components/Footer/";
import Seo from "../components/Seo";

class PageTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    pathContext: PropTypes.object.isRequired,
    navigatorPosition: PropTypes.string.isRequired,
    setNavigatorPosition: PropTypes.func.isRequired,
    setLocationUrl: PropTypes.func.isRequired,
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
    console.log("PROPS:", this.props);
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    const { locationUrl } = this.props;
    if (pathContext.slug !== locationUrl) this.props.setLocationUrl(pathContext.slug);

    return (
      <Main>
        <Page page={data.page} />
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
)(PageTemplate);

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
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
