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
} from "react-share";

type Props = {
  url: string;
  title?: string;
  subTitle?: string;
  tags?: string[];
  category?: string;

  media?: string;
};

type ShareCounts = {
  facebook: number | null;
  pinterest: number | null;
  reddit: number | null;
};

const SHARE_COUNT_CACHE_TTL = 24 * 60 * 60 * 1000;
const EMPTY_COUNTS: ShareCounts = {
  facebook: null,
  pinterest: null,
  reddit: null,
};

declare global {
  interface Window {
    [key: string]: unknown;
  }
}

function getShareCountCacheKey(url: string) {
  return `share-counts:${url}`;
}

function readCachedCounts(url: string): ShareCounts | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(getShareCountCacheKey(url));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as {
      counts: ShareCounts;
      expiresAt: number;
    };

    if (!parsed?.expiresAt || parsed.expiresAt < Date.now()) {
      window.localStorage.removeItem(getShareCountCacheKey(url));
      return null;
    }

    return parsed.counts;
  } catch {
    return null;
  }
}

function cacheCounts(url: string, counts: ShareCounts) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      getShareCountCacheKey(url),
      JSON.stringify({
        counts,
        expiresAt: Date.now() + SHARE_COUNT_CACHE_TTL,
      }),
    );
  } catch {
    // Ignore storage quota and privacy mode failures.
  }
}

function jsonpRequest(url: string, callbackParam = "callback") {
  return new Promise<any>((resolve, reject) => {
    const callbackName = `__shareCountCallback_${Math.random().toString(36).slice(2)}`;
    const separator = url.includes("?") ? "&" : "?";
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (payload: unknown) => {
      cleanup();
      resolve(payload);
    };

    script.src = `${url}${separator}${callbackParam}=${callbackName}`;
    script.async = true;
    script.onerror = () => {
      cleanup();
      reject(new Error(`Unable to load ${url}`));
    };

    document.body.appendChild(script);
  });
}

async function fetchShareCounts(url: string): Promise<ShareCounts> {
  const encodedUrl = encodeURIComponent(url);

  const [facebook, pinterest, reddit] = await Promise.allSettled([
    jsonpRequest(
      `https://graph.facebook.com/?id=${encodedUrl}&fields=og_object{engagement}`,
    ),
    jsonpRequest(
      `https://api.pinterest.com/v1/urls/count.json?url=${encodedUrl}`,
    ),
    jsonpRequest(
      `https://www.reddit.com/api/info.json?limit=1&url=${encodedUrl}`,
      "jsonp",
    ),
  ]);

  return {
    facebook:
      facebook.status === "fulfilled"
        ? facebook.value?.og_object?.engagement?.count ?? null
        : null,
    pinterest:
      pinterest.status === "fulfilled" ? pinterest.value?.count ?? null : null,
    reddit:
      reddit.status === "fulfilled"
        ? reddit.value?.data?.children?.[0]?.data?.score ?? null
        : null,
  };
}

/**
 * ShareCounters component
 */
export function ShareCounters({ url, className }: { url: string, className?: string }) {
  const [counts, setCounts] = React.useState<ShareCounts>(() => readCachedCounts(url) ?? EMPTY_COUNTS);

  React.useEffect(() => {
    const cached = readCachedCounts(url);
    if (cached) {
      setCounts(cached);
      return;
    }

    let isMounted = true;
    void fetchShareCounts(url)
      .then((nextCounts) => {
        if (!isMounted) return;
        setCounts(nextCounts);
        cacheCounts(url, nextCounts);
      })
      .catch((error) => {
        console.warn("Unable to fetch share counts", error);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <section className={cn("share-counters flex space-x-2 mx-auto", className)}>
      <h4>Share Stats</h4>
      <span className="shareCount fb">{counts.facebook ?? ""}</span>
      <span className="shareCount reddit">{counts.reddit ?? ""}</span>
      <span className="shareCount pin">{counts.pinterest ?? ""}</span>
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
