import { cx } from "class-variance-authority";
import { slugify } from "../../shared/pathHelpers.ts";
import { useEffect, useRef } from "react";
import "./codeTabs.css";

type CodeTabsProps = {
  tabs: string[] | Array<{ label: string; value: string }>;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
};

export function CodeTabs({
  tabs,
  onTabChange,
  children,
}: CodeTabsProps) {
  const codeTabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const codeTabsEl$ = codeTabsRef.current;
    if (!codeTabsEl$ || !codeTabsEl$.children) {
      console.error("No children found in codeTabsEl$");
      return;
    }
    // get all the `.expressive-code` children - do not hold a reference to the children
    // log clicks
    const handleClick = (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("title")) {
        console.log("Clicked on tab", target.textContent);
      }
    }
    codeTabsEl$.addEventListener("click", handleClick);

    return () => codeTabsEl$.removeEventListener("click", handleClick);
    
  }, [codeTabsRef]);
  // Add basic index-based selection of `.expressive-code` children
  const handleTabClick = (_event: unknown, tabValue: string) => {
    // event.preventDefault();
    onTabChange?.(tabValue);
    const tabIndex = tabs.findIndex((tab) => {
      return typeof tab === "object"
        ? tab.value === tabValue
        : tab === tabValue;
    });

    const codeTabsEl$ = codeTabsRef.current;

    if (!codeTabsEl$ || !codeTabsEl$.children) {
      console.error("No children found in codeTabsEl$");
      return;
    }
    // get all the `.expressive-code` children - do not hold a reference to the children
    const codeBlocks = codeTabsEl$.querySelectorAll(".expressive-code");

    // hide all the `.expressive-code` children
    codeBlocks.forEach((codeBlock, idx) => {
      if (tabIndex === idx) codeBlock.classList.remove("hidden", "active");
      else codeBlock.classList.add("hidden");
    });
    console.log("Selected: tabIndex", tabIndex, codeBlocks.length);
  };

  return (
    <section className="codeTabs expressive-code" ref={codeTabsRef}>
      <figure className="tabBar hasTitle notContent">
        <figcaption className="header">
          {tabs.map((tab) => {
            const tabLabel = typeof tab === "object" ? tab.label : tab;
            const tabValue = typeof tab === "object" ? tab.value : tab;
            return (
              <span
                key={tabValue}
                aria-roledescription="tab"
                onClick={(e) => handleTabClick(e, tabValue)}
                className={cx("title", `tab-${slugify(tabValue)}`)}
              >
                {tabLabel}
              </span>
            );
          })}
        </figcaption>
      </figure>
      {children}
    </section>
  );
}
