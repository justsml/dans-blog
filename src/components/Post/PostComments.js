import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
// import FacebookProvider, { Comments } from "react-facebook";
import { DiscussionEmbed } from "disqus-react";

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
  const { classes, slug, post } = props || {};
  const title = post && post.frontmatter && post.frontmatter.title;
  const category = post && post.frontmatter && post.frontmatter.category;

  const url = config.siteUrl + config.pathPrefix + slug;
  const disqusConfig = {
    identifier: `${post && post.fields && post.fields.prefix}/${category}`,
    title: title || slug,
    url
  };

  // console.log("POST COMMENTS:", JSON.stringify(disqusConfig));
  // console.log("POST COMMENTS PROPS:", JSON.stringify(props, null, 2));
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
