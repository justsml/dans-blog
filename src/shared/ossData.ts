import { OssContribution } from "../types.ts";


export const ossContributions: OssContribution[] = [
  // TODO: Add recent PostGIS, Turf, Shadcn/ui, and other contributions

  {
    repo: "remix-run/react-router",
    renamed: "ReactTraining/react-router",
    description_override: `React Router is an extremely popular routing solution for React. It features a collection of navigational components that work flexibly with your application.`,
    notes: `Dan helped improve the official documentation (several examples) and search engine visibility. "A lot of people are going to benefit from the improvements you're making." - project co-creator Michael Jackson.`
  },
  {
    repo: "docker/docker",
    renamed: "moby/moby",
    description_override: `Docker is an open platform for developers and sysadmins to build, ship, and run distributed applications, whether on laptops, data center VMs, or the cloud.`,
    notes: `Dan found and fixed a Debian OS detection issue in the install script. (Much thanks goes to Jessie Frazelle and several other wonderful contributors. ❤️)
    Dan was added as a "Docker Mentor" and can often be found helping at local meetups.`
  },
  {
    repo: "nodejs/node",
    description_override: `NodeJS is the wildly successful framework which helped JavaScript venture beyond the browser to become the most ubiquitous programming language.`,
    notes:
      "Dan added helpful contextual links to parts of the official website. Dan also worked closely with relevant stakeholders at both TC39 and the NodeJS foundation to provide input & support on several signifigant features added to JavaScript. Notably these include ES6 Classes, Promises, Async/Await, and the URL parser."
  },
  {
    repo: "mdn/interactive-examples",
    description_override: `Mozilla Development Network is relied on by millions of developers. It has become the de-facto standard source for technical details on JavaScript, HTML, the DOM, and other browser features.`,
    notes: `Added clarifications and examples across Promise, Fetch and Array documentation pages.`
  },
  {
    repo: "lord/slate",
    description_override: `Slate is a tool to generate modern documentation for libraries, SDKs, and APIs.`,
    notes: `Fixed an issue around securely encoding HTML. Currently slate is used to <a href='https://fpromises.io' target='_blank'>document Dan's Functional Promises library at https://fpromises.io</a>`
  },
  {
    repo: "gatsbyjs/gatsby",
    description_override: `Gatsby is a modern Static Site Generator for blazing fast websites.`,
    notes: `Fixed error handling in one of the built-in plugins. Dan's also a member of their GitHub team.`
  },
  {
    repo: "gruntjs/grunt",
    description_override: `Grunt is one of the most successful build tools in the NodeJS ecosystem.`,
    notes:
      "Dan worked with Dave Methvin to improve the user experience around the console output & 3rd party tools."
  },
  {
    repo: "nodejitsu/node-http-proxy",
    description_override: `Nodejitsu's popular HTTP Proxy library is used in 100's of libraries on NPM.`,
    notes: `Nodejitsu's founder, Charlie Robbins, worked with Dan (and others) addressing documentation omissions.`
  },
  {
    repo: "lodash/lodash",
    description_override:
      "A modern JavaScript utility library delivering modularity, performance, & extras. Lodash is one of the most successful JavaScript libraries ever. It's enjoyed several years at #1 on the 'Top 10' most depended on libraries NPM ranking.",
    notes: "Extended ArrayBuffer support, in collaboration with John David-Dalton."
  },
  {
    repo: "Automattic/mongoose",
    description_override: `Mongoose is one of the most popular Object Data Model libraries for MongoDB.`,
    notes: `Working with project leaders, Dan used github.com to discuss and identify desired API specification for extending the base classes Model and Query. He worked with Valeri Karpov (from MongoDB) and others.`
  },
  {
    repo: "petkaantonov/bluebird",
    description_override: `Bluebird is a very common Promise-enhancement library. It's also one of the 'Top 10' most depended on libraries.`,
    notes: `Dan has submitted several PRs over the years, and is a huge fan of this popular library. It was the inspiration behind <a href='https://fpromises.io' target='_blank'>functional-promises.</a>`
  },
  {
    repo: "rancher/rancher",
    description_override: `Rancher is a powerful Docker administration platform.`,
    notes: `Aided in the resolution of a number of issues, touching on storage, upgrades and scaling.`
  },
  {
    repo: "jsonresume/resume-cli",
    description_override: `Resume CLI is the command line tool for JSON Resume, the open source initiative to create a JSON-based standard for resumes.`,
    notes: `Dan aided in simplifying command line options & enhancing documentation.`
  },
  {
    repo: "camwiegert/in-view",
    description_override: `In-view is a widely used library for reliable DOM position information across many mobile and desktop platforms/browsers.`,
    notes: `Submitted code to aid in resolving edge issues with the Safari browser.`
  },
  {
    repo: "metagrover/ES6-for-humans",
    description_override: `ES6 for Humans is a welcoming tour of new JavaScript features. This book is published by Apress and available on Amazon and other bookstores.`,
    notes: `Improved Promises section. Added examples for Spread and Rest operations.`
  }
];
