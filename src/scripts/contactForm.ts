type Recaptcha = {
  ready(callback: () => void): void;
  render(container: HTMLElement, options: Record<string, unknown>): number;
  getResponse(widget: number): string;
};
const captchaWindow = window as Window & { grecaptcha?: Recaptcha };
let apiPromise: Promise<Recaptcha> | undefined;
function captchaApi() {
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
let activeForm: HTMLFormElement | null = null;
let listeners: AbortController | undefined;
function cleanupContact() { listeners?.abort(); activeForm = null; }
function initializeContact() {
  const form = document.querySelector<HTMLFormElement>('form[name="contact"]');
  if (form === activeForm) return;
  cleanupContact();
  if (!form) return;
  activeForm = form;
  listeners = new AbortController();
  const { signal } = listeners;
  const container = form.querySelector<HTMLElement>("[data-recaptcha-site-key]");
  const responseInput = form.querySelector<HTMLInputElement>('[name="g-recaptcha-response"]');
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  let api: Recaptcha | undefined;
  let widget: number | undefined;
  let submitting = false;
  function result(success: boolean) {
    if (signal.aborted || !form?.isConnected) return;
    form.classList.toggle("success", success);
    form.classList.toggle("failure", !success);
  }
  const siteKey = container?.dataset.recaptchaSiteKey;
  if (container && siteKey) {
    captchaApi().then(loaded => {
      if (signal.aborted || !container.isConnected) return;
      api = loaded;
      widget = loaded.render(container, {
        sitekey: siteKey,
        theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light",
        callback: (response: string) => { if (!signal.aborted && responseInput) responseInput.value = response; },
        "expired-callback": () => { if (!signal.aborted && responseInput) responseInput.value = ""; },
      });
    }).catch(() => { /* A submission shows the existing localized failure state. */ });
  }
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    const response = widget === undefined ? "" : api?.getResponse(widget);
    if (!response) { result(false); return; }
    submitting = true;
    form.classList.remove("success", "failure");
    form.classList.add("loading");
    form.setAttribute("aria-busy", "true");
    if (submitButton) submitButton.disabled = true;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => { if (typeof value === "string") body.append(key, value); });
    body.set("g-recaptcha-response", response);
    try {
      const sent = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body, signal });
      result(sent.ok);
    } catch { if (!signal.aborted) result(false); }
    finally {
      submitting = false;
      if (!signal.aborted) {
        form.classList.remove("loading");
        form.removeAttribute("aria-busy");
        if (submitButton) submitButton.disabled = false;
      }
    }
  }, { signal });
}
initializeContact();
document.addEventListener("astro:page-load", initializeContact);
document.addEventListener("astro:before-swap", cleanupContact);
