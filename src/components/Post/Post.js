import React from "react";
import PropTypes from "prop-types";

import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";
import PostFooter from "./PostFooter";
import AutoLoader from "../Challenge/AutoLoader";

let lastSlug = "";

const focusOnPage = () => {
  const page = document.querySelector("article");
  if (page && page.focus) page.focus();
};

const MAX_RETRIES = 20;

export default class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired
    // facebook: PropTypes.object.isRequired
  };

  componentDidMount() {
    console.info("Post.CDM! Slug=", this.props.slug);
    if (lastSlug !== this.props.slug) {
      // loading new post - need to trigger :focus update (a11y)
      lastSlug = this.props.slug;
      setTimeout(focusOnPage, 750);
      setTimeout(focusOnPage, 150);
      setTimeout(focusOnPage, 300);
    }
    this.renderTwitter();
  }

  renderTwitter = (retries = 0) => {
    if (!window.twttr || !window.twttr.widgets || typeof window.twttr.widgets.load !== "function") {
      return setTimeout(() => this.renderTwitter(retries + 1), 250);
    }
    if (retries < MAX_RETRIES) {
      window.twttr.widgets.load();
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("slug", this.props.slug, nextProps.slug);
    return true;
  }

  render() {
    const { post, author, slug } = this.props;
    const frontmatter = (post || {}).frontmatter;
    const title = ((post || {}).frontmatter || {}).title;
    const subTitle = ((post || {}).frontmatter || {}).subTitle;
    let date = ((post || {}).fields || {}).prefix;
    const html = (post || {}).html;
    // const htmlAst = (post || {}).htmlAst;

    // console.log(post);

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
