import React from "react";
import injectSheet from "react-jss";
import { MuiThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import withRoot from "../withRoot";

import theme from "../styles/theme";
import globals from "../styles/globals";

import { setFontSizeIncrease, setIsWideScreen, setLocationUrl } from "../state/store";

import asyncComponent from "../components/common/AsyncComponent/";
import Loading from "../components/common/Loading/";
import Navigator from "../components/Navigator/";
import ActionsBar from "../components/ActionsBar/";
import InfoBar from "../components/InfoBar/";
import LayoutWrapper from "../components/LayoutWrapper/";

import { isWideScreen, timeoutThrottlerHandler } from "../utils/helpers";

const InfoBox = asyncComponent(
  () =>
    import("../components/InfoBox/")
      .then(module => {
        return module;
      })
      .catch(error => {}),
  <Loading
    overrides={{ width: `${theme.info.sizes.width}px`, height: "100vh", right: "auto" }}
    afterRight={true}
  />
);

class Layout extends React.Component {
  timeouts = {};
  categories = [];

  componentDidMount() {
    this.props.setIsWideScreen(isWideScreen());
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeThrottler, false);
    }
  }

  componentWillMount() {
    if (typeof localStorage !== "undefined") {
      const inLocal = +localStorage.getItem("font-size-increase");

      const inStore = this.props.fontSizeIncrease;

      if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
        this.props.setFontSizeIncrease(inLocal);
      }
    }

    this.getCategories();
  }

  getCategories = () => {
    if (this.props.data && this.props.data.posts && this.props.data.posts.edges) {
      this.categories = this.props.data.posts.edges.reduce((list, edge, i) => {
        const category = edge.node.frontmatter.category;
        if (category && !~list.indexOf(category)) {
          return list.concat(edge.node.frontmatter.category);
        } else {
          return list;
        }
      }, []);
    } else {
      this.categories = [];
    }
  };

  resizeThrottler = () => {
    return timeoutThrottlerHandler(this.timeouts, "resize", 500, this.resizeHandler);
  };

  resizeHandler = () => {
    this.props.setIsWideScreen(isWideScreen());
  };

  render() {
    const { children, data, locationUrl } = this.props;
    const currentPathname = typeof window !== "undefined" ? window.location.pathname : "/"; //location.pathname;

    if (currentPathname !== locationUrl) this.props.setLocationUrl(currentPathname);
    // console.log("comparing location in layouts.main:", currentPathname, "!==", locationUrl);
    // this.unlisten = this.props.history.listen(...);

    // TODO: dynamic management of tabindexes for keybord navigation
    return (
      <LayoutWrapper>
        {children()}
        <Navigator posts={data.posts.edges} />
        <ActionsBar categories={this.categories} />
        <InfoBar pages={data.pages.edges} parts={data.parts.edges} />
        {this.props.isWideScreen && <InfoBox pages={data.pages.edges} parts={data.parts.edges} />}
      </LayoutWrapper>
    );
  }
}

Layout.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired,
  setFontSizeIncrease: PropTypes.func.isRequired,
  setLocationUrl: PropTypes.func.isRequired,
  locationUrl: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.pages,
    locationUrl: state.locationUrl,
    isWideScreen: state.isWideScreen,
    fontSizeIncrease: state.fontSizeIncrease
  };
};

const mapDispatchToProps = {
  setLocationUrl,
  setIsWideScreen,
  setFontSizeIncrease
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(injectSheet(globals)(Layout)));

//eslint-disable-next-line no-undef
export const guery = graphql`
  query LayoutQuery {
    posts: allMarkdownRemark(
      filter: { id: { regex: "//posts//" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            subTitle
            tags
            category
            date
            modified
            cover {
              children {
                ... on ImageSharp {
                  resolutions(width: 90, height: 90) {
                    ...GatsbyImageSharpResolutions_withWebp_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
    pages: allMarkdownRemark(
      filter: { id: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            date
            menuTitle
          }
        }
      }
    }
    parts: allMarkdownRemark(filter: { id: { regex: "//parts//" } }) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
