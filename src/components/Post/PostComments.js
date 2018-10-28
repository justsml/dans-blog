import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import FacebookProvider, { Comments } from "react-facebook";
import { DiscussionEmbed, CommentCount } from "disqus-react";

require("core-js/fn/array/find");

import config from "../../../content/meta/config";

const styles = theme => ({
  postComments: {
    margin: "3em 0 0",
    padding: "3em 0 0",
    borderTop: "1px solid #ddd"
  }
});

// {/* <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
//   Comments
// </Disqus.CommentCount> */}

const PostComments = props => {
  const { classes, slug, post } = props;
  const url = config.siteUrl + config.pathPrefix + slug;
  // const disqusShortname = config.disqusShortname
  const disqusConfig = {
    identifier: slug,
    title: post.fields.prefix,
    url
  };

  console.log("POST COMMENTS:", disqusConfig, config.disqusShortname, props);
  console.log("POST COMMENTS PROPS:", props);
  return (
    <div id="post-comments" className={classes.postComments}>
      <DiscussionEmbed shortname={config.disqusShortname} config={disqusConfig} />

      {/* <FacebookProvider appId={facebook}>
        <Comments
          href={`${config.siteUrl}${slug}`}
          width="100%"
          colorScheme={props.theme.main.colors.fbCommentsColorscheme}
        />
      </FacebookProvider> */}
    </div>
  );
};

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
  // facebook: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostComments);
