export type Recaptcha = {
  ready(callback: () => void): void;
  render(container: HTMLElement, options: Record<string, unknown>): number;
  getResponse(widget: number): string;
  reset(widget?: number): void;
};
const captchaWindow = window as Window & { grecaptcha?: Recaptcha };
let apiPromise: Promise<Recaptcha> | undefined;
/** Loads Google's explicit-render reCAPTCHA API once per document. */
export function captchaApi() {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<Recaptcha>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Verification unavailable")), 12000);
    const ready = () => {
      const api = captchaWindow.grecaptcha;
      if (!api) return;
      api.ready(() => { window.clearTimeout(timer); resolve(api); });
    };
    if (captchaWindow.grecaptcha) return ready();
    let script = document.querySelector<HTMLScriptElement>("script[data-paper-recaptcha]");
    if (!script) {
      script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.dataset.paperRecaptcha = "true";
      document.head.append(script);
    }
    script.addEventListener("load", ready, { once: true });
    script.addEventListener("error", () => { window.clearTimeout(timer); reject(new Error("Verification unavailable")); }, { once: true });
  }).catch(error => { apiPromise = undefined; throw error; });
  return apiPromise;
}
