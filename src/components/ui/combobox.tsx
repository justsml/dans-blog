"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "../../utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";

type KeyValuePair = {
  label: string;
  value: string;
};

type InputOptions = KeyValuePair[];

export function Combobox({
  options,
  buttonText,
  onChange,
  className,
}: {
  options: InputOptions;
  buttonText: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleItemSelected = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    if (
      "sortCardsBy" in window &&
      typeof window?.["sortCardsBy"] === "function"
    ) {
      // hack, make blarg work dan!
      window["sortCardsBy"](currentValue);
    }
    if (typeof onChange === "function") {
      onChange(currentValue);
    } else {
      console.log("onChange is not a function", onChange);
    }
  };

  return (
    <div className={"combobox-ui " + (className ?? '')}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-inherit hover:bg-gray-600 "
          >
            {value
              ? options.find((opt) => opt.value === value)?.label
              : buttonText}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <ul className="combobox-options list-none p-0 m-0" data-value={value}>
            {options.map((opt) => (
              <li
                className="p-2 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                key={opt.value}
                value={opt.value}
                onClick={() => handleItemSelected(opt.value)}
              >
                <ArrowRightIcon
                  className={cn(
                    "mr-2 h-4 w-4 d-inline-block",
                    value === opt.value ? "opacity-100" : "opacity-50"
                  )}
                />
                <div>{opt.label}</div>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
