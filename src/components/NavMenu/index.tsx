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
import { useCallback, useEffect, useState } from "react";
import { SearchButton } from "../SearchUI/SearchButton";
import "./index.css";
import { NotepadText } from "lucide-react";

const NavMenu = ({
  categories,
  popularPosts,
  recentPosts,
}: {
  categories: Array<[string, unknown]>;
  popularPosts: any[];
  recentPosts: any[];
}) => {
  const [currentPanel, setCurrentPanel] = useState<string>("");
  const isMenuOpen = currentPanel.length >= 1;

  // make sure we only get the first 6 categories
  if (categories.length > 6)
    categories = categories.slice(0, 6);

  const safeDetectViewportOffset = useCallback(
    throttle(detectViewportOffset, 100, { leading: false, trailing: true }),
    [],
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

  const handleMenuPageClick = (_lbl: string, e: Event) => {
    const target = e.target as HTMLElement;
    // const currentTarget = e.currentTarget as HTMLElement;
    const hasLink = target.closest("a");
    const hasButton = target.closest("button");
    const isInsideMenu = target.closest(".NavigationMenuRoot");
    const isInsideViewPort = target.closest(".ViewportPosition");
    // const isInsideHeader = target.closest("header");
    // const isInsideMain = target.closest("main");

    // const currClasses = [...currentTarget.classList.values()].sort().join(", ");
    const targetClasses = [...target.classList.values()].sort().join(", ");
    const clickedViewportBackground =
      isInsideViewPort && targetClasses.includes("Viewport");
    // console.log(`${lbl} %o`, {targetClasses, clickedViewportBackground, hasLink, isInsideMenu, isInsideViewPort, isInsideHeader, isInsideMain, target});

    if (isInsideMenu) return true;
    // direct click into ViewportPosition bg element
    if (clickedViewportBackground) return setCurrentPanel("");

    if (!isInsideViewPort) {
      // close it
      return setCurrentPanel("");
    } else {
      if (hasLink || hasButton) {
        // console.log("Clicked Link", target.tagName, target.className, target, lbl);
        // let the link handle the click
        return true;
      } else {
        // no link, prevent the default behavior (closing the panel)
        // console.log("Clicked NON-Link", target.tagName, target.className, target, lbl);
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
    // if we didn't click a link, prevent the default behavior (closing the panel)
    // if (!hasLink) {
    //   console.log("Prevented Click", target.tagName, target.className, target, lbl);
    //   setCurrentPanel("");
    //   e.preventDefault();
    //   e.stopPropagation();
    // } else {
    //   console.log("Clicked Link", target.tagName, target.className, target, lbl);
    // }

    // check if we clicked directly on the ViewportPosition element
    //   (which is a background container and should not trigger a panel close)
  };

  useEffect(() => {
    const handleViewPortClick = (e: Event) =>
      handleMenuPageClick("ViewportPosition", e);
    const handleBodyClick = (e: Event) => handleMenuPageClick("Body", e);
    const vPort = document.querySelector(".ViewportPosition");

    if (isMenuOpen) {
      vPort?.addEventListener("click", handleViewPortClick);
      document.body.addEventListener("click", handleBodyClick);
    } else {
      // console.error("Alert: closed menu");
    }

    return () => {
      vPort?.removeEventListener("click", handleViewPortClick);
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [currentPanel]);

  const togglePanel = (panel: string) => {
    setCurrentPanel(currentPanel === panel ? "" : panel);
  };

  const _changeToPanel = (panel: string) => {
    if (currentPanel === panel) return;
    if (currentPanel.length >= 1) {
      setCurrentPanel(panel);
    }
  };
  const changeToPanel = throttle(_changeToPanel, 50, {
    leading: false,
    trailing: true,
  });
  //    throttle(detectViewportOffset, 100, { leading: false, trailing: true }),

  return (
    <NavigationMenu.Root
      className="NavigationMenuRoot"
      suppressHydrationWarning={true}
      delayDuration={300}
      onClick={safeDetectViewportOffset}
      value={currentPanel}
      onMouseEnter={(e) => console.log("MouseEnter", e.currentTarget, e.target)}
    >
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item
          value="#search"
          className="searchToggle"
          onClick={() => togglePanel("")}
        >
          <SearchButton />
        </NavigationMenu.Item>

        <NavigationMenu.Item
          value="home"
          onClick={() => togglePanel("home")}
          onMouseEnter={() => changeToPanel("home")}
        >
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Articles <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li className="item-quizzes">
                <NavigationMenu.Link asChild>
                  <a href="/challenges" className="CalloutItem">
                    <div
                      className="Callout"
                      style={{ background: "var(--neon-gg-bg)" }}
                    >
                      <div className="CalloutHeading">Quizzes</div>
                      <p className="CalloutText">Try Dan's Challenges!</p>
                    </div>
                  </a>
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
                        },
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
                        },
                      )}
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item
          value="projects"
          onClick={() => togglePanel("projects")}
          onMouseEnter={() => changeToPanel("projects")}
        >
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
                href="/open-source-journal"
                title="Open Source Journal"
              >
                A journal of my open source contributions, projects, and experiments.
              </ListItem>
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

        <NavigationMenu.Item
          value="about"
          onClick={() => togglePanel("about")}
          onMouseEnter={() => changeToPanel("about")}
        >
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            About <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent h-card">
            <ul className="List two contact-info-list">
              <li className="row-span-2">
                <NavigationMenu.Link asChild>
                  <div className="Callout neon-bg-6">
                    <a href="/about">
                      <img
                        src={avatarImage.src}
                        width={avatarImage.width}
                        height={avatarImage.height}
                        className="u-photo p"
                      />
                    </a>
                    <div className="CalloutHeading">Dan Levy</div>
                    <p className="CalloutText" style={{ textWrap: "nowrap" }}>
                      Coder | Leader
                      <br /> Thinker | Tinkerer
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
              <li style={{ gridRow: "span 2" }}>
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

                      <a rel="me" href="http://twitter.com/justsml" target="_blank">
                        <span className="Icon">
                          <TwitterLogoIcon
                            className="svg-icon"
                            width={30}
                            height={30}
                          />
                        </span>
                        <label>Twitter</label>
                      </a>
                      <a rel="me" href="https://github.com/justsml" target="_blank">
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
                        rel="me"
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

                      <a
                        rel="me"
                        href="/open-source-journal">
                        <span className="Icon">
                          <NotepadText
                            className="svg-icon"
                            width={30}
                            height={30}
                          />
                        </span>
                        <label>OSS Log</label>
                      </a>

                      <a rel="me" href="/docs/resume.pdf" target="_blank">
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
          document.body,
        )}
    </NavigationMenu.Root>
  );
};

export default NavMenu;
