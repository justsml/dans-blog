import React from "react";
import PropTypes from "prop-types";

import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";
import PostFooter from "./PostFooter";
import AutoLoader from "../Challenge/AutoLoader";
import EditOnGithub from "../common/EditOnGithub";
import { injectJsByUrl } from "../../utils/helpers";

let lastSlug = "";
const MAX_RETRIES = 10;

const focusOnPage = (retries = 1) => {
  const page = document.querySelector(".github-edit-link") || document.querySelector("main");
  if (page && page.focus) {
    page.focus();
    // console.info("Focused on page", page);
  } else {
    if (retries < MAX_RETRIES) {
      return setTimeout(focusOnPage, 250, retries + 1);
    }
  }
};

export default class Post extends React.Component {
  static propTypes = {
    footnote: PropTypes.object.isRequired,

    post: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    allTags: PropTypes.object,
    image: PropTypes.object,
    githubUrl: PropTypes.string,
    children: PropTypes.node
  };

  componentDidMount() {
    // console.info("Post.CDM! Slug=", this.props.slug);
    if (lastSlug !== this.props.slug) {
      // loading new post - need to trigger :focus update (a11y)
      lastSlug = this.props.slug;
      focusOnPage();
    }
    setTimeout(() => this.interactionHandler(this.renderTwitter), 3000, 1);
  }

  interactionHandler = callback => {
    const handler = event => cleanup() && callback();
    const cleanup = () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("mousemove", handler);
    };
    window.addEventListener("click", handler);
    window.addEventListener("mousemove", handler);
  };

  renderTwitter = (retries = 0) => {
    if (retries >= MAX_RETRIES) return;

    if (!window.twttr || !window.twttr.widgets || typeof window.twttr.widgets.load !== "function") {
      injectJsByUrl(`https://platform.twitter.com/widgets.js`)
        .then(() => {
          window.twttr.widgets.load();
        })
        .catch(console.error);
    } else {
      window.twttr.widgets.load();
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("slug", this.props.slug, nextProps.slug);
    return true;
  }

  render() {
    const { post, author, slug, allTags, footnote } = this.props;
    const frontmatter = (post || {}).frontmatter;
    const title = ((post || {}).frontmatter || {}).title;
    const subTitle = ((post || {}).frontmatter || {}).subTitle;
    let date = ((post || {}).fields || {}).prefix;
    const html = (post || {}).html;
    const footnoteHtml = (footnote || {}).html;
    // const htmlAst = (post || {}).htmlAst;

    // console.log(post);

    return (
      <Article>
        {this.props.githubUrl && <EditOnGithub githubUrl={this.props.githubUrl} />}
        {this.props.children}
        <PostHeader
          allTags={allTags}
          title={title}
          subTitle={subTitle}
          date={date}
          {...frontmatter}
        />
        <Content html={html} />
        <AutoLoader post={post} frontmatter={frontmatter} />
        <PostFooter
          title={title}
          author={author}
          post={post}
          slug={slug}
          footnote={footnoteHtml}
          {...frontmatter}
        />
      </Article>
    );
  }
}
