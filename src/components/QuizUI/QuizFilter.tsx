import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { slugify } from "../../shared/pathHelpers.ts";
import clsx from "clsx";

type Props = {
  onOpenChange?: (isOpen: boolean) => void;
  onSearchChange?: (searchData: string[]) => void;
};

export function QuizFilter(props: Props) {
  const [searchData, setSearchData] = useState<string[]>([]);
  // const tagName = slugify(el?.currentTarget.innerText);
  // toggleTag(tagName);

  useEffect(() => {
    props?.onSearchChange?.(searchData);
  }, [searchData]);

  const toggleTag = (tagName: string): void => {
    tagName = slugify(tagName);
    if (searchData.includes(tagName)) {
      setSearchData(searchData.filter((tag) => tag !== tagName));
      props?.onSearchChange?.(searchData);
      return;
    }
    // console.log("tagName", tagName);
    setSearchData([...searchData, tagName]);
    props?.onSearchChange?.(searchData);
  };



const OnOffBtn = ({
  children,
  className = "",
}: {
  className?: string;
  children: string;

}) => {
  const label = slugify(children);
  const isOpen = searchData.includes(label) || searchData.includes(children);
  const cls = (isOpen ? "open-" : "closed-") + label;

  return (
    <div
      className={clsx(
        {'selectedItem': isOpen},
        className,
        cls,
        " flex-wrap items-center justify-between",
      )}
    >
      <Button
        onClick={() => toggleTag(label)}
        variant={isOpen ? "default" : "secondary"}
      >
        {children}
      </Button>
    </div>
  );
};

  return (
    <Popover>
      <PopoverTrigger asChild className="toggle-filters">
        <Button variant="outline">Filters&#160;</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-2">
          <div className="p-4">
            <div className="mt-4 space-y-2 inline-flex justify-start align-top place-self-start">
              <section className="tag-filters skill-level inline-grid mx-4 gap-4 self-end justify-center">
                <OnOffBtn>Beginner</OnOffBtn>
                <OnOffBtn>Intermediate</OnOffBtn>
                <OnOffBtn>Advanced</OnOffBtn>
              </section>
              <section className="hidden status-filters mx-4 gap-4 self-end justify-center">
                <OnOffBtn>Not Started</OnOffBtn>
                <OnOffBtn>Started</OnOffBtn>
                <OnOffBtn>Complete</OnOffBtn>
              </section>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

