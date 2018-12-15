import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import FP from "functional-promises";

import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Content from "../components/Main/Content";
import config from "../../content/meta/config";

import { StatusButtons, Icons, getStargazers } from "../services/github.js";

const NumFormatter = new Intl.NumberFormat();

const styles = theme => ({
  .star-box {
    max-height: 28px;
    display: flex;
    justify-content: stretch;
    align-content: space-between;
  }
  .star-box span {
    background-color: #fff;
    border: 1px solid rgba(27,31,35,.2);
    border-bottom-right-radius: 3px;
    border-left: 0;
    border-top-right-radius: 3px;
    color: #24292e;
    /* float: left; */
    font-size: 12px;
    font-weight: 600;
    line-height: 21px;
    padding: 3px 10px;
    vertical-align: middle;
  }
  .star-box label {
    /* float: left; */

    background-position: -1px -1px;
    background-repeat: repeat-x;
    background-size: 110% 110%;
    border: 1px solid rgba(27,31,35,.2);
    /* border-radius: .25em; */
    border-top-left-radius: .25em;
    border-bottom-left-radius: .25em;
    /* cursor: pointer; */
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;
    padding: 6px 10px;
    position: relative;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    background-color: #eff3f6;
    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
    color: #24292e;
  }


});

class About extends React.Component {
  state = { projectStars: {} };

  getStarButton(starCount) {
    return (
      <div className="star-box">
        <label>
          {Icons.star}
          Star
        </label>
        <span>{NumFormatter.format(starCount)}</span>
      </div>
    );
  }
  loadProjectData(projects) {
    if (projects) {
      return FP.resolve(projects)
        .concurrency(2)
        .map(project => {
          const targetId = `${project.user}-${project.repo}-star-count`;
          // const lookupProject = project.renamed ? project.renamed : project;
          // const starButtons = this.state.projectStars[targetId];

          return getStargazers({ ...lookupProject, targetId }).then(starCount => {
            this.setState({ [targetId]: starCount });
          });
        });
    }
  }

  buildProjectList(projects) {
    if (projects) {
      return FP.resolve(projects)
        .concurrency(2)
        .map(project => {
          const targetId = `${project.user}-${project.repo}-star-count`;

          return (
            <div className="card" key={targetId}>
              <div className="flexy-time">
                <i className="ico">{Icons.repo}</i>

                <div className="path-title">
                  <span>{project.user}</span>&#160;/&#160;<label>{project.repo}</label>
                </div>

                <div className="button-bar" id={targetId}>
                  {this.state[targetId] != undefined ? (
                    this.getStarButton(this.state[targetId])
                  ) : (
                    <span className="loading">Loading...</span>
                  )}
                </div>
              </div>
              <div className="description">{project.description}</div>
              <div className="contributions">
                <blockquote>{project.contribution}</blockquote>
              </div>
            </div>
          );
        });
    } else {
      return <h2 className="warning">WARNING: No projects in config</h2>;
    }
  }
  render() {
    return (
      <Main>
        <Article>
          <PageHeader title="About" />
          <Content />
        </Article>
      </Main>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(About);

const ossContributions = [
  {
    user: "ReactTraining",
    repo: "react-router",
    description: `React Router is an extremely popular routing solution for React. It features a collection of navigational components that work flexibly with your application.`,
    contribution: `Dan helped improve the docs & website; including high-profile work on the home page & navigation design. According to project co-creator Michael Jackson, "A lot of people are going to benefit from the improvements you're making."`
  },
  {
    user: "docker",
    repo: "docker",
    renamed: { user: "moby", repo: "moby" },
    description: `Docker is an open platform for developers and sysadmins to build, ship, and run distributed applications, whether on laptops, data center VMs, or the cloud.`,
    contribution: `Dan found and fixed a Debian OS detection issue in the install script. (Much thanks goes to Jessie Frazelle and several other wonderful contributors. ❤️)
    Dan was added as a "Docker Mentor" and can often be found helping at local meetups.`
  },
  {
    user: "mdn",
    repo: "interactive-examples",
    description: `Mozilla Development Network is the de-facto official source for details on JavaScript, DOM, and other browser APIs.`,
    contribution: `Added clarifications and examples across Promise, Fetch and Array documentation pages.`
  },
  {
    user: "lord",
    repo: "slate",
    description: `Slate is a tool to generate modern documentation for libraries, SDKs, and APIs.`,
    contribution: `Fixed an issue around securely encoding HTML. Currently used to document Dan's Functional Promises library: <a href='https://fpromises.io' target='_blank'>fpromises.io</a>`
  },
  {
    user: "gatsbyjs",
    repo: "gatsby",
    description: `Gatsby is a modern Static Site Generator for blazing fast websites.`,
    contribution: `Fixed error handling in one of the built-in plugins. Dan's also a member of their GitHub team. 💖`
  },
  {
    user: "nodejs",
    repo: "node",
    description: `NodeJS is the wildly successful framework which helped JavaScript venture beyond the browser to become the most ubiquitous programming language.`,
    contribution:
      "Dan has provided input on Classes, Promises, and the URL parser re-design & strategy. As a loyal member of the organization, he eagerly works with other team members as much as possible."
  },
  {
    user: "gruntjs",
    repo: "grunt",
    description: `Grunt is one of the most successful build tools in the NodeJS ecosystem.`,
    contribution:
      "Dan worked with Dave Methvin to improve the user experience around the console output & 3rd party tools."
  },
  {
    user: "nodejitsu",
    repo: "node-http-proxy",
    description: `Nodejitsu's popular HTTP Proxy library is used in 100's of libraries on NPM.`,
    contribution: `Nodejitsu's founder, Charlie Robbins, worked with Dan (and others) addressing documentation omissions.`
  },
  {
    user: "lodash",
    repo: "lodash",
    description:
      "A modern JavaScript utility library delivering modularity, performance, & extras. Lodash is one of the most successful JavaScript libraries ever.",
    contribution: "Extended ArrayBuffer support, in collaboration with John David-Dalton."
  },
  {
    user: "Automattic",
    repo: "mongoose",
    description: `Mongoose is one of the most popular Object Data Model libraries for MongoDB.`,
    contribution: `Working with project leaders, Dan used github.com to discuss and identify desired API specification for extending the base classes Model and Query. He worked with Valeri Karpov (from MongoDB) and others.`
  },
  {
    user: "petkaantonov",
    repo: "bluebird",
    description: `Bluebird is one of the most widely used replacement for native Promises.`,
    contribution: `Dan has submitted several PRs over the years, and is a vocal proponent of better Promise usage.`
  },
  {
    user: "rancher",
    repo: "rancher",
    description: `Rancher is a powerful Docker administration platform.`,
    contribution: `Aided in the resolution of a number of issues, touching on storage, upgrades and scaling.`
  },
  {
    user: "jsonresume",
    repo: "resume-cli",
    description: `Resume CLI is the command line tool for JSON Resume, the open source initiative to create a JSON-based standard for resumes.`,
    contribution: `Dan aided in simplifying command line options & enhancing documentation.`
  },
  {
    user: "camwiegert",
    repo: "in-view",
    description: `In-view is a widely used library for reliable DOM position information across many mobile and desktop platforms/browsers.`,
    contribution: `Submitted code to aid in resolving edge issues with the Safari browser.`
  },
  {
    user: "metagrover",
    repo: "ES6-for-humans",
    description: `ES6 for Humans is a welcoming tour of new JavaScript features. This book is published by Apress and available on Amazon and other bookstores.`,
    contribution: `Improved Promises section. Added examples for Spread and Rest operations.`
  }
];
