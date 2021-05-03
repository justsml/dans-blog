import React from "react";
import PropTypes from "prop-types";
// import GitHubIcon from "@material-ui/icons/GitHub";
import GitHubIcon from "!svg-react-loader!./GitHubIcon.svg?name=GitHubIcon";

export default function EditOnGithub({ githubUrl, className, description = "Page" }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={`github-edit-link ${className || ""}`}
      href={githubUrl}
      title="Found a mistake or error? Suggest a fix on GitHub!"
    >
      <span>
        Edit<br />
        {description}
      </span>
      <GitHubIcon />
    </a>
  );
}
EditOnGithub.propTypes = {
  className: PropTypes.string,
  githubUrl: PropTypes.string,
  description: PropTypes.string
};
