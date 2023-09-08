import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  LinkedinShareCount,
  // RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TwitterIcon,
  TwitterShareButton
} from "react-share";
import RedditIcon from "!svg-react-loader!../../images/svg-icons/reddit.svg?name=RedditIcon";

import config from "../../../content/meta/config";

const styles = theme => ({
  share: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1em 0 0",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      flexDirection: "row"
    }
  },
  links: {
    display: "flex",
    flexDirection: "row",
    "& .SocialMediaShareButton": {
      margin: "0 .8em",
      cursor: "pointer"
    }
  },
  label: {
    fontSize: "1.2em",
    margin: "0 1em 1em",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 1em"
    }
  }
});

class PostShare extends React.Component {
  render() {
    const { post, classes, slug } = this.props;
    const { excerpt, frontmatter } = post || {};
    const { title } = frontmatter || {};
    const url = config.siteUrl + config.pathPrefix + slug;

    const iconSize = 36;
    const filter = count => (count > 0 ? count : "");

    return (
      <div className={classes.share + " post-share"}>
        <span className={classes.label}>SHARE</span>
        <div className={classes.links}>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
          <RedditShareButton url={url} title={title}>
            <RedditIcon round size={iconSize} />
            <RedditShareCount url={url}>
              {count => <div className="share-count">{filter(count)}</div>}
            </RedditShareCount>
          </RedditShareButton>
          <FacebookShareButton
            url={url}
            quote={`${title} - ${excerpt}`}
            aria-label="Facebook share"
          >
            <FacebookIcon round size={iconSize} />
            <FacebookShareCount url={url}>
              {count => <div className="share-count">{filter(count)}</div>}
            </FacebookShareCount>
          </FacebookShareButton>
          <LinkedinShareButton url={url} title={title} description={excerpt}>
            <LinkedinIcon round size={iconSize} />
            <LinkedinShareCount url={url}>
              {count => <div className="share-count">{filter(count)}</div>}
            </LinkedinShareCount>
          </LinkedinShareButton>
        </div>
      </div>
    );
  }
}

PostShare.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
};

export default injectSheet(styles)(PostShare);
