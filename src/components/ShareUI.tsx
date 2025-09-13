import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareCount,
  // TumblrShareCount,
  FacebookShareCount,
  PinterestShareCount,
} from "react-share";

type Props = {
  url: string;
  title?: string;
  subTitle?: string;
  tags?: string[];
  category?: string;

  media?: string;
};

/**
 * ShareCounters component
 */
export function ShareCounters({ url, className }: { url: string, className?: string }) {
  return (
    <section className={cn("share-counters flex space-x-2 mx-auto", className)}>
      <h4>Share Stats</h4>
      <FacebookShareCount url={url}>
        {(count) => <span className="shareCount fb">{count}</span>}
      </FacebookShareCount>
      <RedditShareCount url={url}>
        {(count) => <span className="shareCount reddit">{count}</span>}
      </RedditShareCount>
      {/* <TumblrShareCount url={url}>
        {(count) => <span className="shareCount tumblr">{count}</span>}
      </TumblrShareCount> */}
      <PinterestShareCount url={url}>
        {(count) => <span className="shareCount pin">{count}</span>}
      </PinterestShareCount>
    </section>
  );
}

/**
 * A share menu component
 */
export function ShareMenu(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const ShareLinks: Array<{
    value: string;
    label: React.ReactNode;
  }> = [
    {
      value: "facebook",
      label: <FacebookShareButton {...props}>Share on FB</FacebookShareButton>,
    },
    {
      value: "linkedin",
      label: (
        <LinkedinShareButton {...props} source={props.url} summary={props.subTitle} >Share on LinkedIn</LinkedinShareButton>
      ),
    },
    {
      value: "twitter",
      label: (
        <TwitterShareButton {...props} related={['justsml']}>Share on Twitter</TwitterShareButton>
      ),
    },
    {
      value: "reddit",
      label: <RedditShareButton {...props}>Share on Reddit</RedditShareButton>,
    },
    {
      value: "telegram",
      label: (
        <TelegramShareButton {...props}>Share on Telegram</TelegramShareButton>
      ),
    },
    // {
    //   value: "tumblr",
    //   label: <TumblrShareButton {...props}>Share on Tumblr</TumblrShareButton>,
    // },
    {
      value: "whatsapp",
      label: (
        <WhatsappShareButton {...props}>Share on Whatsapp</WhatsappShareButton>
      ),
    },
    {
      value: "email",
      label: <EmailShareButton {...props}>Email</EmailShareButton>,
    },
  ];

  if (props.media) {
    ShareLinks.push({
      value: "pinterest",
      label: (
        <PinterestShareButton {...props} media={props.media}>
          Share on Pinterest
        </PinterestShareButton>
      ),
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Share with the world ✨
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {ShareLinks.map((link) => (
                <CommandItem
                  key={link.value}
                  value={link.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {link.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === link.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
