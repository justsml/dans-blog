import React from "react";
import Link from "gatsby-link";
import Main from "../components/Main/";
import Article from "../components/Main/Article";
import "../styles/shared.css";
import injectSheet from "react-jss";

const styles = theme => ({
  tags: {
    display: "none"
  }
});

const Tags = ({ pathContext }) => {
  const { posts, tagName } = pathContext;

  if (posts) {
    return (
      <Main>
        <Article>
          <h2>
            Posts about <i>{tagName}</i>
          </h2>

          <ul className="tag-page">
            {posts.map(post => {
              // console.log('tagging', post)
              return (
                <li key={post.id} {...post}>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </li>
              );
            })}
          </ul>
        </Article>
      </Main>
    );
  }
};

export default injectSheet(styles)(Tags);
