import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { withPrefix } from "gatsby-link";

import FP from "functional-promises/dist/umd";

import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Content from "../components/Main/Content";
// import config from "../../content/meta/config";

import { Icons, getStargazers } from "../services/github.js";

const NumFormatter = new Intl.NumberFormat();

const styles = theme => ({
  tableOfContents: {
    "& li": {
      margin: 0
      // listStyleType: "none"
    }
  },
  autobiography: {
    "& p": {
      textIndent: "2.5em"
    }
  },
  card: {
    borderBottom: "1px solid rgb(225, 228, 232)",
    padding: "1em 0.25em",
    "& .description": {
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: "0.9em",
      fontWeight: "400",
      paddingTop: "0.5em"
    },
    "& .contributions": {
      margin: "0.74em 0 0 0"
    },
    "& blockquote": {
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: "0.9em",
      fontStyle: "italic",
      fontWeight: "300",
      margin: "1.4em",
      marginBottom: "0.7em"
    },
    "& .reference": {
      border: "5px dashed red"
    },
    "& .octicon-repo": {
      marginRight: "4px",
      zoom: "1.3"
    },
    "& .octicon": {
      color: "#959da5",
      opacity: "0.60",
      verticalAlign: "middle",
      marginTop: "-1px",
      display: "inline-block"
    },
    "& .ico": {
      color: "#959da5",
      opacity: "0.60",
      verticalAlign: "middle",
      marginTop: "-1px",
      display: "inline-block"
    }
  },
  repoTitle: {
    color: "#586069",
    margin: "0.3em 0",
    fontSize: "18px",
    "& .repo-link": {
      color: "#0366d6",
      fontWeight: "600"
    },
    "& .user-link": {
      color: "#0366d6",
      fontWeight: "400"
    },

    "& .toc-link": {
      color: "#555555",
      width: "100%",
      display: "inline-block"
    },
    "& .toc-link::after": {
      content: "  view details",
      color: "#555555"
    }
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "690px",
    "& i": {
      flexGrow: "0",
      minWidth: "18px",
      alignSelf: "center"
    },
    "& .path-title": {
      flexGrow: "1",
      width: "235px"
    },
    "& .button-bar": {
      alignSelf: "center"
    }
  },
  starBox: {
    alignContent: "space-between",
    display: "flex",
    justifyContent: "stretch",
    maxHeight: "28px",
    "& span": {
      backgroundColor: "#fff",
      border: "1px solid rgba(27,31,35,.2)",
      borderBottomRightRadius: "3px",
      borderLeft: "0",
      borderTopRightRadius: "3px",
      color: "#24292e",
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "21px",
      padding: "3px 10px",
      verticalAlign: "middle"
    },
    "& label": {
      /* borderRadius: ".25em", */
      backgroundColor: "#eff3f6",
      backgroundImage: "linear-gradient(-180deg,#fafbfc,#eff3f6 90%)",
      backgroundPosition: "-1px -1px",
      backgroundRepeat: "repeat-x",
      backgroundSize: "110% 110%",
      border: "1px solid rgba(27,31,35,.2)",
      borderBottomLeftRadius: ".25em",
      borderTopLeftRadius: ".25em",
      color: "#24292e",
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "14px",
      padding: "6px 10px",
      position: "relative",
      userSelect: "none",
      verticalAlign: "middle",
      whiteSpace: "nowrap"
    }
  }
});

class About extends React.Component {
  state = { projectStars: {} };

  componentDidMount() {
    this.loadProjectData(ossContributions);
  }

  loadProjectData = projects => {
    if (projects) {
      return FP.resolve(projects)
        .concurrency(2)
        .map(project => {
          const targetId = `${project.user}-${project.repo}`;
          const lookupProject = project.renamed ? project.renamed : project;

          return getStargazers({ ...lookupProject, targetId })
            .then(starCount => {
              this.setState({ [targetId]: starCount });
            })
            .catch(error => {
              console.error("Error:", error);
              throw error;
            });
        })
        .catch(err => {
          console.error("Failed to get current Github Stats:", err);
          this.setState({ error: err.message });
        });
    }
  };

  getStarButton(starCount) {
    return (
      <div className={this.props.classes.starBox}>
        <label>{Icons.star}&#160;Star</label>
        <span>{NumFormatter.format(starCount)}</span>
      </div>
    );
  }

  buildProjectList = projects => {
    const { classes } = this.props;

    if (projects) {
      return projects.map(project => {
        const targetId = `${project.user}-${project.repo}`;

        return (
          <div className={["card", classes.card].join(" ")} key={targetId} id={targetId}>
            <div className={classes.buttonBar}>
              <i className="ico">{Icons.repo}</i>

              <div className={["path-title", classes.repoTitle].join(" ")}>
                <a
                  target="_blank"
                  className="user-link"
                  href={`https://github.com/${project.user}`}
                >
                  {project.user}
                </a>
                &#160;/&#160;
                <label className="repo-link">
                  <a
                    target="_blank"
                    className="repo-link"
                    href={`https://github.com/${project.user}/${project.repo}`}
                  >
                    {project.repo}
                  </a>
                </label>
              </div>

              <div className="button-bar" id={targetId}>
                {this.state[targetId] != undefined ? (
                  this.getStarButton(this.state[targetId])
                ) : (
                  <span className="loading">Loading...</span>
                )}
              </div>
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            <div className="contributions">
              <blockquote dangerouslySetInnerHTML={{ __html: project.contribution }} />
            </div>
          </div>
        );
      });
    } else {
      return <h2 className="warning text-center">WARNING: No projects configured!</h2>;
    }
  };

  getProjectToC = projects => {
    if (!projects) return null;

    const { classes } = this.props;
    const linksList = projects.map(project => {
      const targetId = `${project.user}-${project.repo}`;

      return (
        <li className={["path-title", classes.repoTitle].join(" ")} key={targetId}>
          <a href={`#${targetId}`} className="toc-link">
            <span className="user-link">{project.user}</span>
            &#160;/&#160;
            <span className="repo-link">{project.repo}</span>
          </a>
        </li>
      );
    });

    return <ol className={classes.tableOfContents}>{linksList}</ol>;
  };

  render() {
    return (
      <Main>
        <Article>
          <PageHeader title="About Dan" />
          <Content>
            <div className={this.props.classes.autobiography}>
              <p>
                Dan is an accomplished programmer, teacher, mentor, and leader. He has over 15 years
                of extensive professional software development experience. Including consulting,
                Agile team building, architectural leadership, security audits, accessibility
                reviews and UI/UX analysis. At both startups and big companies.
              </p>
              <p>
                After years of study and research in software patterns and architecture, Dan has
                become a highly sought-out subject matter expert. Additionally, Dan&apos;s talks
                have earned him a reputation as an incisive, thought-provoking and motivating public
                speaker.
              </p>
              <p>
                As an active contributor to numerous Open Source projects, Dan has established
                himself as a dynamic problem solver, constantly seeking personal growth and always
                learning. Dan pulls from his deep bench of experience to gain a better understanding
                of any challenge. He closely follows changes across a broad Technology landscape:
                learning new languages, methodologies, patterns, and adapting to different code
                styles.
              </p>
              <div className="text-center">
                <br />
                <a href={`${withPrefix("/DanLevy-Resume-2019.pdf")}`}>
                  <b>Download Dan&apos;s Resume</b>
                </a>
                <br />
                <br />
                <a href={`/about/talks/`}>
                  <b>View Talks &amp; Videos</b>
                </a>
              </div>
            </div>

            <div>
              <h2>Open Source Contributions</h2>
              <h3 id="oss-toc">List of Contributions</h3>
              {this.getProjectToC(ossContributions)}
              <h3>Contribution Details</h3>
              {this.buildProjectList(ossContributions)}
            </div>
          </Content>
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
    contribution: `Dan helped improve the official documentation website. Some notable work improved the home page, initial examples, and overall navigation design. "A lot of people are going to benefit from the improvements you're making." - project co-creator Michael Jackson.`
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
    user: "nodejs",
    repo: "node",
    description: `NodeJS is the wildly successful framework which helped JavaScript venture beyond the browser to become the most ubiquitous programming language.`,
    contribution:
      "Dan added helpful contextual links to parts of the official website. Dan also worked closely with relevant stakeholders at both TC39 and the NodeJS foundation to provide input & support on several signifigant features added to JavaScript. Notably these include ES6 Classes, Promises, Async/Await, and the URL parser."
  },
  {
    user: "mdn",
    repo: "interactive-examples",
    description: `Mozilla Development Network is relied on by millions of developers. It has become the de-facto standard source for technical details on JavaScript, HTML, the DOM, and other browser features.`,
    contribution: `Added clarifications and examples across Promise, Fetch and Array documentation pages.`
  },
  {
    user: "lord",
    repo: "slate",
    description: `Slate is a tool to generate modern documentation for libraries, SDKs, and APIs.`,
    contribution: `Fixed an issue around securely encoding HTML. Currently slate is used to <a href='https://fpromises.io' target='_blank'>document Dan's Functional Promises library at https://fpromises.io</a>`
  },
  {
    user: "gatsbyjs",
    repo: "gatsby",
    description: `Gatsby is a modern Static Site Generator for blazing fast websites.`,
    contribution: `Fixed error handling in one of the built-in plugins. Dan's also a member of their GitHub team. 💖`
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
      "A modern JavaScript utility library delivering modularity, performance, & extras. Lodash is one of the most successful JavaScript libraries ever. It's enjoyed several years at #1 on the 'Top 10' most depended on libraries NPM ranking.",
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
    description: `Bluebird is a very common Promise-enhancement library. It's also one of the 'Top 10' most depended on libraries.`,
    contribution: `Dan has submitted several PRs over the years, and is a huge fan of this popular library. It was the inspiration behind <a href='https://fpromises.io' target='_blank'>functional-promises.</a>`
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
