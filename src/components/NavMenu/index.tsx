"use client";
import throttle from "lodash/throttle";

import { createPortal } from "react-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { slugify } from "@/shared/pathHelpers";
import avatarImage from "@/assets/avatar-256.webp";
import {
  CaretDownIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  RocketIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { ListItem } from "./ListItem";
import { getComputedDates } from "../../shared/dateUtils";
import { Badge } from "../ui/badge";
import { useCallback, useEffect } from "react";
import { SearchButton } from "../search/SearchButton";
import "./index.css";

const NavMenu = ({
  categories,
  popularPosts,
  recentPosts,
}: {
  categories: Array<[string, unknown]>;
  popularPosts: any[];
  recentPosts: any[];
}) => {
  const safeDetectViewportOffset = useCallback(
    throttle(detectViewportOffset, 100, { leading: true, trailing: true }),
    []
  );

  function detectViewportOffset() {
    const $arrow: HTMLDivElement | null = document.querySelector(".Arrow");
    const $viewport: HTMLDivElement | null =
      document.querySelector(".ViewportPosition");
    if (!$arrow || !$viewport) return;

    const arrowBox = $arrow.getBoundingClientRect();
    const topOffset = arrowBox.top - 8;

    // console.log('detectViewport', {topOffset, arrowBox, prevViewportTop: $viewport.style.top});
    // $viewport.style.top = `${topOffset}px`
    // setViewportTopOffset(`${topOffset}px`);
    $viewport.style.top = `${topOffset}px`;
  }

  // Update the viewport offset on window resize and orientation change
  useEffect(() => {
    // throttle the event listener

    // Call the function once to set the initial offset
    safeDetectViewportOffset();

    window.addEventListener("resize", safeDetectViewportOffset, {
      passive: true,
    });
    window.addEventListener("orientationchange", safeDetectViewportOffset);

    return () => {
      safeDetectViewportOffset.cancel();
      window.removeEventListener("resize", safeDetectViewportOffset);
      window.removeEventListener("orientationchange", safeDetectViewportOffset);
    };
  }, []);

  return (
    <NavigationMenu.Root
      className="NavigationMenuRoot"
      suppressHydrationWarning={true}
      delayDuration={300}
      onClick={safeDetectViewportOffset}
      onMouseMove={safeDetectViewportOffset}
    >
      <NavigationMenu.List
        className="NavigationMenuList"
      >
        <NavigationMenu.Item value="#search" className="searchToggle">
          <SearchButton />
        </NavigationMenu.Item>

        <NavigationMenu.Item value="/">
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Articles <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">


            <li className="item-quizzes">
                <NavigationMenu.Link asChild>
                  <div className="Callout neon-bg-4">
                    <div className="CalloutHeading">Quizzes</div>
                    <p className="CalloutText">
                      <a href="/challenges" className="CalloutItem">
                        Try Dan's challenge!
                      </a>
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>





              <li className="item-categories">
                <NavigationMenu.Link asChild>
                  <div className="Callout neon-bg-3">
                    <div className="CalloutHeading">Categories</div>
                    <p className="CalloutText">
                      {categories.map(([category, count]) => (
                        <a
                          key={category}
                          title={category}
                          href={`/category/${slugify(category)}/`}
                          className="CalloutItem"
                        >
                          {category}{" "}
                          <Badge variant={"secondary"}>{count as number}</Badge>
                        </a>
                      ))}
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
              <li className="item-popular">
                <NavigationMenu.Link asChild>
                  <div className="Callout neon-bg-2">
                    <div className="CalloutHeading">Popular</div>
                    <p className="CalloutText">
                      {popularPosts.map(
                        ({
                          data: { title, subTitle, modified, date },
                          slug,
                        }) => {
                          const { modifiedAgo } = getComputedDates({
                            date,
                            modified,
                          });
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
                          );
                        }
                      )}
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
              <li className="item-recent">
                <NavigationMenu.Link asChild>
                  <div className="Callout neon-bg-4">
                    <div className="CalloutHeading">Recent</div>
                    <p className="CalloutText">
                      {recentPosts.map(
                        ({
                          data: { title, subTitle, modified, date },
                          slug,
                        }) => {
                          const { modifiedAgo } = getComputedDates({
                            date,
                            modified,
                          });
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
                          );
                        }
                      )}
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
          <NavigationMenu.Content className="NavigationMenuContent">
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
                      A selection of my projects, experiments and assorted
                      repos.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <ListItem
                href="https://dataanalyzer.app/"
                title="DataAnalyzer.app"
              >
                A code + schema generator capable of handling any JSON or CSV
                input.
              </ListItem>
              <ListItem
                href="https://fpromises.io/"
                title="Functional Promises"
              >
                A functional & fluent API built around native JavaScript
                promises.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/node-streaming-image-proxy"
                title="Node Streaming Image Proxy"
              >
                High performance, low latency image resizing & streaming proxy
                for Node.js.
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
          <NavigationMenu.Content className="NavigationMenuContent">
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
                    <p className="CalloutText" style={{ textWrap: "nowrap" }}>
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
                            <EnvelopeClosedIcon
                              className="svg-icon"
                              width={30}
                              height={30}
                            />
                          </span>
                          <label>
                            <code>&lt;form&gt;</code>
                          </label>
                        </a>

                        <a href="http://twitter.com/justsml" target="_blank">
                          <span className="Icon">
                            <TwitterLogoIcon
                              className="svg-icon"
                              width={30}
                              height={30}
                            />
                          </span>
                          <label>Twitter</label>
                        </a>
                        <a href="https://github.com/justsml" target="_blank">
                          <span className="Icon">
                            <GitHubLogoIcon
                              className="svg-icon"
                              width={30}
                              height={30}
                            />
                          </span>
                          <label>GitHub</label>
                        </a>
                        <a
                          href="https://linkedin.com/in/realdaniellevy"
                          target="_blank"
                        >
                          <span className="Icon">
                            <LinkedInLogoIcon
                              className="svg-icon"
                              width={30}
                              height={30}
                            />
                          </span>
                          <label>LinkedIn</label>
                        </a>

                        <a href="/docs/resume.pdf" target="_blank">
                          <span className="Icon">
                            <RocketIcon
                              className="svg-icon"
                              width={30}
                              height={30}
                            />
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

      {typeof document !== "undefined" &&
        createPortal(
          <div className="ViewportPosition" style={{ top: "5.6rem" }}>
            <NavigationMenu.Viewport className="NavigationMenuViewport" />
          </div>,
          document.body
        )}
    </NavigationMenu.Root>
  );
};

export default NavMenu;
