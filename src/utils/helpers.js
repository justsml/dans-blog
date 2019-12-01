/* eslint-disable no-param-reassign */
import theme from "../styles/theme";

export function isWideScreen() {
  if (typeof window !== `undefined`) {
    const windowWidth = window.innerWidth;
    const mediaQueryL = theme.mediaQueryTresholds.L;

    return windowWidth >= mediaQueryL;
  }
}

export function timeoutThrottlerHandler(timeouts, name, delay, handler) {
  if (!timeouts[name]) {
    timeouts[name] = setTimeout(() => {
      timeouts[name] = null;
      handler();
    }, delay);
  }
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/g, "") // Trim - from start of text
    .replace(/-+$/g, ""); // Trim - from end of text
}

export const retryApp = (fn, { limit = 10, delayMsec = 100, rateAmplifyDelay = 1.0 }) => {
  try {
    if (rateAmplifyDelay < 0.5 || rateAmplifyDelay > 1000) rateAmplifyDelay = 1.0;

    if (limit > 0 && fn() === false) {
      console.trace("retryApp Triggered!!!", { limit });
      delayMsec = delayMsec * rateAmplifyDelay;
      return setTimeout(
        () => retryApp(fn, { limit: limit - 1, delayMsec, rateAmplifyDelay }),
        delayMsec
      );
    }
  } catch (e) {
    console.warn(`retryFail #${limit} remain: `, e);
  }
};

export const shareOnTwitter = (text, url, source = "danlevy.net") => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}&source=${encodeURIComponent(
    source
  )}&related=${encodeURIComponent(source)}`;
};

/**
 * This allows the user to create custom events within their Gatsby projects.
 *
 * @param {import('gatsby-plugin-google-analytics').CustomEventArgs} args
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#events
 */
export function trackCustomEvent({
  category,
  action,
  label,
  value,
  nonInteraction = false,
  transport,
  hitCallback,
  callbackTimeout = 100
}) {
  if (typeof window !== `undefined` && window.ga) {
    const trackingEventOptions = {
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
      nonInteraction: nonInteraction,
      transport
    };

    if (hitCallback && typeof hitCallback === `function`) {
      trackingEventOptions.hitCallback = () => setTimeout(hitCallback, callbackTimeout);
    }

    window.ga(`send`, `event`, trackingEventOptions);
  }
}
