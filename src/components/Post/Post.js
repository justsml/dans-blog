import React from "react";
import PropTypes from "prop-types";

import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";
import PostFooter from "./PostFooter";
import AutoLoader from "../Challenge/AutoLoader";

export default class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired
    // facebook: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (typeof window.twttr !== "undefined") {
      window.twttr.widgets.load();
    }
  }

  render() {
    const { post, author, slug } = this.props;
    const frontmatter = (post || {}).frontmatter;
    const title = ((post || {}).frontmatter || {}).title;
    const subTitle = ((post || {}).frontmatter || {}).subTitle;
    let date = ((post || {}).fields || {}).prefix;
    const html = (post || {}).html;
    // const htmlAst = (post || {}).htmlAst;

    //console.log(post);

    return (
      <Article>
        <PostHeader title={title} subTitle={subTitle} date={date} {...frontmatter} />
        <Content html={html} />
        <AutoLoader post={post} frontmatter={frontmatter} />
        <PostFooter title={title} author={author} post={post} slug={slug} {...frontmatter} />
      </Article>
    );
  }
}
