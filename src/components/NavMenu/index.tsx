"use client";
import "./index.css";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { PostCollections } from "@/shared/dataCache";
import { slugify } from "@/shared/pathHelpers";
import avatarImage from "@/assets/avatar.png";
import {
  CaretDownIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  RocketIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { ListItem } from "./ListItem";

const { getCategoryCounts, getPopularPosts, getRecentPosts } = PostCollections;

const categories = getCategoryCounts();
const popularPosts = getPopularPosts();
// const tagCounts = getTagCounts();
const recentPosts = getRecentPosts();
// const allPosts = PostCollections._posts;

import { createPortal } from "react-dom";
import { getComputedDates } from "../../shared/dateUtils";
import { Badge } from "../ui/badge";

// const popIdx = Math.floor(Math.random() * popularPosts.length);
// const popularSelection = popularPosts[popIdx];

const NavMenu = () => {
  const handlePreventDefault = (e: CustomEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <NavigationMenu.Root className="NavigationMenuRoot" delayDuration={300}>
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item value="/">
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Articles <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            onFocusOutside={handlePreventDefault}
            className="NavigationMenuContent"
          >
            
            <ul className="List one">
            <li className="item-categories">
                <NavigationMenu.Link asChild>
                  <div
                    className="Callout neon-bg-3"
                  >
                    <div className="CalloutHeading">Categories</div>
                    <p className="CalloutText">
                      {categories.map(([category, count]) => (
                        <a
                          key={category}
                          title={category}
                          href={`/category/${slugify(category)}/`}
                          className="CalloutItem"
                        >
                          {category} <Badge variant={"secondary"}>{count}</Badge>
                        </a>
                      ))}
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
              <li className="item-popular">
                <NavigationMenu.Link asChild>
                  <div
                    className="Callout neon-bg-2"
                  >
                    <div className="CalloutHeading">Popular</div>
                    <p className="CalloutText">
                      {popularPosts.map(({data: {title, subTitle, modified, date}, slug}) => {
                        const { modifiedAgo } = getComputedDates({date, modified});
                        return (
                        <a
                          key={slug}
                          title={title + " - " + subTitle}
                          href={`/${slug}/`}
                          className="CalloutItem"
                        >
                          {title}
                          <sup>{modifiedAgo} ago</sup>
                        </a>
                      )})}
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
            <li className="item-recent columns-all">
                <NavigationMenu.Link asChild>
                  <div
                    className="Callout neon-bg-6"
                  >
                    <div className="CalloutHeading">Recent</div>
                    <p className="CalloutText">
                      {recentPosts.map(({data: {title, subTitle, modified, date}, slug}) => {
                        const { modifiedAgo } = getComputedDates({date, modified});
                        return (
                        <a
                          key={slug}
                          title={title + " - " + subTitle}
                          href={`/${slug}/`}
                          className="CalloutItem"
                        >
                          {title}
                          <sup>{modifiedAgo} ago</sup>
                        </a>
                      )})}
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Projects <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            onFocusOutside={handlePreventDefault}
            className="NavigationMenuContent"
          >
            <ul className="List two">
              <li className="panel-projects">
                <NavigationMenu.Link asChild>
                  <a
                    className="Callout neon-bg-2"
                    href="https://github.com/justsml"
                    target="_blank"
                  >
                    <div className="CalloutHeading">Demos &amp; Examples</div>
                    <p className="CalloutText" style={{ gridColumn: "span 2" }}>
                      A selection of my projects, experiments and assorted repos.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <ListItem
                href="https://dataanalyzer.app/"
                title="DataAnalyzer.app"
              >
                A code + schema generator capable of handling any JSON or CSV input.
              </ListItem>
              <ListItem
                href="https://fpromises.io/"
                title="Functional Promises"
              >
                A functional & fluent API built around native JavaScript promises.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/node-streaming-image-proxy"
                title="Node Streaming Image Proxy"
              >
                High performance, low latency image resizing & streaming proxy for Node.js.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/fact-service"
                title="Fact Service"
              >
                Powerful Key-Value Service. Feat. several DB adapters: Postgres,
                Redis, DynamoDB, Firestore, Cassandra, and more.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/bun-elysia-htmx"
                title="Elysia &amp; HTMX magic"
              >
                A refactored Bun + HTMX experiment. Showcases Elysia's beautiful
                API - my favorite Express alternative.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/modern-app-template"
                title="Modern App Starter Base"
              >
                A modern app starter using TS, Vite, React, Tailwind CSS, and
                more.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/knex-full-text-search"
                title="Knex Full Text Search"
              >
                Simplify Full-text web searches with a convenient Knex.js
                plugin.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/knex-spatial"
                title="Knex Spatial"
              >
                Super simple spatial queries with my Knex.js plugin.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Contact <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            onFocusOutside={handlePreventDefault}
            className="NavigationMenuContent"
          >
            <ul className="List one contact-info-list">
              <li className="row-span-2">
                <NavigationMenu.Link asChild>
                  <div className="Callout neon-bg-6">
                    <a href="/about">
                      <img
                        src={avatarImage.src}
                        width={avatarImage.width}
                        height={avatarImage.height}
                      />
                    </a>
                    <div className="CalloutHeading">Dan Levy</div>
                    <p className="CalloutText" style={{textWrap: 'nowrap'}}>
                      Coder | Leader
                      <br /> Thinker | Tinker
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
              <li style={{ gridRow: "span 2" }}>
                <NavigationMenu.Link asChild>
                  <div className="Callout ContactSubMenu">
                    <div className="CalloutHeading">Contact Me</div>
                    <p className="CalloutText">
                    <span className="SocialLinks">

                      <a href="/contact">
                        <span className="Icon">
                          <EnvelopeClosedIcon className="svg-icon" width={30} height={30} />
                        </span>
                        <label><code>&lt;form&gt;</code></label>
                      </a>

                      <a href="http://twitter.com/justsml" target="_blank">
                        <span className="Icon">
                          <TwitterLogoIcon className="svg-icon" width={30} height={30} />
                        </span>
                        <label>Twitter</label>
                      </a>
                      <a href="https://github.com/justsml" target="_blank">
                        <span className="Icon">
                          <GitHubLogoIcon className="svg-icon" width={30} height={30} />
                        </span>
                        <label>GitHub</label>
                      </a>
                      <a
                        href="https://linkedin.com/in/realdaniellevy"
                        target="_blank"
                      >
                        <span className="Icon">
                          <LinkedInLogoIcon className="svg-icon" width={30} height={30} />
                        </span>
                        <label>LinkedIn</label>
                      </a>

                      <a href="/docs/resume.pdf" target="_blank">
                        <span className="Icon">
                          <RocketIcon className="svg-icon" width={30} height={30} />
                        </span>
                        <label>Résumé (PDF)</label>
                      </a>

                    </span>
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      {createPortal(
        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>,
        document.body
      )}
    </NavigationMenu.Root>
  );
};

export default NavMenu;
