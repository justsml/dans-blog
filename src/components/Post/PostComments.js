import React, { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
// import FacebookProvider, { Comments } from "react-facebook";
// import { DiscussionEmbed } from "disqus-react";
import config from "../../../content/meta/config";

const DiscussionEmbedAsync = React.lazy(() =>
  import("disqus-react/lib/DiscussionEmbed.js").then(({ DiscussionEmbed }) => DiscussionEmbed)
);

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

const DISQUS_DELAY = 6000;

const PostComments = props => {
  const [showComments, setShowComments] = useState(false);
  const { classes, slug, post } = props || {};
  const title = post && post.frontmatter && post.frontmatter.title;
  const category = post && post.frontmatter && post.frontmatter.category;

  const url = config.siteUrl + config.pathPrefix + slug;
  const disqusConfig = {
    identifier: `${post && post.fields && post.fields.prefix}/${category}`,
    title: title || slug,
    url
  };

  // eslint-disable-next-line no-undef
  const isSSR = typeof globalThis === "undefined";

  if (isSSR) return <div className="post-comments-ssr-placeholder" />;

  useEffect(() => {
    setTimeout(setShowComments, DISQUS_DELAY, true);
  }, []);

  return (
    <div id="post-comments" className={classes.postComments}>
      <Suspense fallback={<p>Loading comments, please wait...</p>}>
        {showComments && (
          <DiscussionEmbedAsync shortname={config.disqusShortname} config={disqusConfig} />
        )}
      </Suspense>

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
