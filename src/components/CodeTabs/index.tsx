import { cx } from "class-variance-authority";
import { slugify } from "../../shared/pathHelpers.ts";
import { useEffect, useRef, useState } from "react";
import "./codeTabs.css";

type CodeTabsProps = {
  tabs: string[] | Array<{ label: string; value: string }>;
  onTabChange: (tab: string, index: number) => void;
  children: React.ReactNode;
};

export function CodeTabs({
  tabs,
  onTabChange,
  children,
}: CodeTabsProps) {
  const codeTabsRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const codeTabsEl$ = codeTabsRef.current;
  //   if (!codeTabsEl$ || !codeTabsEl$.children) {
  //     console.error("No children found in codeTabsEl$");
  //     return;
  //   }
  //   // get all the `.expressive-code` children - do not hold a reference to the children
  //   // log clicks
  //   const handleClick = (e: MouseEvent) => {
  //     const target = e.target as HTMLElement;
  //     if (target.classList.contains("title")) {
  //       console.log("Clicked on tab", target.textContent);
  //     }
  //   }
  //   codeTabsEl$.addEventListener("click", handleClick);

  //   return () => codeTabsEl$.removeEventListener("click", handleClick);
    
  // }, [codeTabsRef]);
  useEffect(() => {
    if (codeTabsRef.current) updateActiveTab(0);
  }, []);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (_event: unknown, tabValue: string, tabIndex: number) => {
    setActiveTab(tabIndex);
    // event.preventDefault();
    onTabChange?.(tabValue, tabIndex);
    updateActiveTab(tabIndex);
  };

  function updateActiveTab(tabIndex: number) {
    const codeTabsEl$ = codeTabsRef.current;

    if (!codeTabsEl$ || !codeTabsEl$.children) {
      console.error("No children found in codeTabsEl$");
      return;
    }
    // get all the `.expressive-code` children
    const codeBlocks = codeTabsEl$.querySelectorAll(".expressive-code");

    // hide all the `.expressive-code` children
    codeBlocks.forEach((codeBlock, idx) => {
      if (tabIndex === idx) {
        codeBlock.classList.remove("hidden", "slideOutRight", "fadeInFast");
        codeBlock.classList.add("active", "fadeInFast");
      } else {
        codeBlock.classList.remove("active", "fadeInFast", "slideOutRight");
        codeBlock.classList.add("hidden", "slideOutRight");
      }
    });
    // return codeBlocks;
  }

  return (
    <section className="codeTabs expressive-code" ref={codeTabsRef}>
      <figure className="tabBar hasTitle notContent">
        <figcaption className="header">
          {tabs.map((tab, idx) => {
            const tabLabel = typeof tab === "object" ? tab.label : tab;
            const tabValue = typeof tab === "object" ? tab.value : tab;
            return (
              <span
                key={tabValue}
                aria-roledescription="tab"
                onClick={(e) => handleTabClick(e, tabValue, idx)}
                className={cx("title", `tab-${slugify(tabValue)}`, {
                  active: activeTab === idx,
                })}
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
