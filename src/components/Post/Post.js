import React from "react";
import PropTypes from "prop-types";

import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";
import PostFooter from "./PostFooter";

export default class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    facebook: PropTypes.object.isRequired
  };

  componentDidMount() {
    // eslint-disable-next-line
    twttr.widgets.load();
  }

  render() {
    const { post, author, slug, facebook } = this.props;
    const frontmatter = (post || {}).frontmatter;
    const title = ((post || {}).frontmatter || {}).title;
    const subTitle = ((post || {}).frontmatter || {}).subTitle;
    let date = ((post || {}).fields || {}).prefix;
    const html = (post || {}).html;
    const htmlAst = (post || {}).htmlAst;

    //console.log(post);

    return (
      <Article>
        <PostHeader title={title} subTitle={subTitle} date={date} {...frontmatter} />
        <Content html={html} />
        <PostFooter author={author} post={post} slug={slug} facebook={facebook} />
      </Article>
    );
  }
}
