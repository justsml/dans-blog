import { Popover } from "../../components/ui/popover.tsx";
import { Button } from "../../components/ui/button.tsx";
import { MouseEventHandler, useState } from "react";
import { slugify } from "../../shared/pathHelpers.ts";

type Props = {
  onOpenChange?: (isOpen: boolean) => void;
  onSearchChange?: (searchData: string[]) => void;
};

export const FilterForm = (props: Props) => {
  const [searchData, setSearchData] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (el): void => {
    const tagName = slugify(el?.currentTarget.innerText);
    console.log("tagName", tagName);
    setSearchData([ ...searchData, tagName ]);
    props?.onSearchChange?.(searchData);
  }

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Filter</Button>
      <Popover
        onOpenChange={(isOpen) =>{
          props?.onOpenChange?.(isOpen);
          console.log("isOpen %s %o", isOpen, searchData)
        }}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold">Filter</h2>
          <div className="mt-4 space-y-2">
            <section className="tag-filters skill-level">
              <button onClick={handleClick}>Beginner</button>
              <button onClick={handleClick}>Intermediate</button>
              <button onClick={handleClick}>Advanced</button>
            </section>
            <section className="status-filters">
              <button onClick={handleClick} className={"outline"}>Not Started</button>
              <button onClick={handleClick} className={"outline"}>Started</button>
              <button onClick={handleClick} className={"outline"}>Complete</button>
            </section>
          </div>
        </div>
      </Popover>
    </>
  );
};
