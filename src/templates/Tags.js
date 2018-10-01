import React from "react";
import Link from "gatsby-link";
import Main from "../components/Main/";

const Tags = ({ pathContext }) => {
  const { posts, tagName } = pathContext;

  if (posts) {
    return (
      <Main>
        <h2>
          Posts about <i>{tagName}</i>
        </h2>

        <ul>
          {posts.map(post => {
            return (
              <li key={post.id}>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </li>
            );
          })}
        </ul>
      </Main>
    );
  }
};

export default Tags;
