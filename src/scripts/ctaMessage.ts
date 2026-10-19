/**
 * Consulting CTA "Send Message" dialog. Posts to the Telegram relay function
 * (netlify/functions/telegram-message.mts).
 *
 * Listeners are delegated from `document` and registered once per document, so
 * Astro ClientRouter swaps never stack duplicate handlers; DOM lookups happen
 * at event time against whatever page is currently mounted.
 */
import { captchaApi, type Recaptcha } from "./recaptchaLoader";

const ENDPOINT = "/api/telegram-message";

type Widget = { api: Recaptcha; id: number };
const widgets = new WeakMap<HTMLElement, Promise<Widget | null>>();
const inflight = new WeakMap<HTMLFormElement, AbortController>();

function captchaContainer(form: HTMLFormElement) {
  return form.querySelector<HTMLElement>("[data-recaptcha-site-key]");
}

function ensureCaptcha(form: HTMLFormElement): Promise<Widget | null> {
  const container = captchaContainer(form);
  const siteKey = container?.dataset.recaptchaSiteKey;
  if (!container || !siteKey) return Promise.resolve(null);
  let widget = widgets.get(container);
  if (!widget) {
    widget = captchaApi()
      .then((api) => {
        if (!container.isConnected) return null;
        const id = api.render(container, {
          sitekey: siteKey,
          theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light",
        });
        return { api, id };
      })
      .catch(() => {
        widgets.delete(container);
        return null;
      });
    widgets.set(container, widget);
  }
  return widget;
}

function setState(form: HTMLFormElement, state: "idle" | "sending" | "success" | "error", text = "") {
  form.dataset.state = state;
  const status = form.querySelector<HTMLElement>("[data-cta-message-status]");
  if (status) status.textContent = text;
  const submit = form.querySelector<HTMLButtonElement>("[data-cta-message-submit]");
  if (submit) submit.disabled = state === "sending";
  form.setAttribute("aria-busy", state === "sending" ? "true" : "false");
  const fields = form.querySelector<HTMLElement>("[data-cta-message-fields]");
  const success = form.querySelector<HTMLElement>("[data-cta-message-success]");
  if (fields) fields.hidden = state === "success";
  if (success) success.hidden = state !== "success";
}

function openDialog(dialog: HTMLDialogElement) {
  const form = dialog.querySelector<HTMLFormElement>("form[data-cta-message-form]");
  if (form && form.dataset.state === "success") {
    form.reset();
    setState(form, "idle");
    const container = captchaContainer(form);
    const widget = container ? widgets.get(container) : undefined;
    void widget?.then((w) => w?.api.reset(w.id));
  }
  if (!dialog.open) dialog.showModal();
  if (form) void ensureCaptcha(form);
}

function onClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const opener = target.closest("[data-cta-message-open]");
  if (opener) {
    const id = opener.getAttribute("aria-controls");
    const dialog = id ? document.getElementById(id) : null;
    if (dialog instanceof HTMLDialogElement) openDialog(dialog);
    return;
  }

  const closer = target.closest("[data-cta-message-close]");
  if (closer) {
    closer.closest("dialog")?.close();
    return;
  }

  // Backdrop click: the dialog has no padding, so a hit on the element itself is outside the sheet.
  if (target instanceof HTMLDialogElement && target.matches("[data-cta-message-dialog]")) {
    target.close();
  }
}

async function onSubmit(event: SubmitEvent) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.matches("[data-cta-message-form]")) return;
  event.preventDefault();
  if (form.dataset.state === "sending" || !form.reportValidity()) return;

  const errorText = form.dataset.msgError ?? "";
  let recaptcha = "";
  if (captchaContainer(form)) {
    const widget = await ensureCaptcha(form);
    recaptcha = widget ? widget.api.getResponse(widget.id) : "";
    if (!recaptcha) {
      setState(form, "error", widget ? (form.dataset.msgVerify ?? errorText) : errorText);
      return;
    }
  }

  const data = new FormData(form);
  const field = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };

  const controller = new AbortController();
  inflight.get(form)?.abort();
  inflight.set(form, controller);
  setState(form, "sending", form.dataset.msgSending ?? "");

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: field("name"),
        contact: field("contact"),
        message: field("message"),
        website: field("website"),
        recaptcha,
        page: window.location.href,
      }),
      signal: controller.signal,
    });
    const result = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!form.isConnected) return;
    if (res.ok && result?.ok) {
      setState(form, "success");
      form.querySelector<HTMLButtonElement>("[data-cta-message-success] [data-cta-message-close]")?.focus();
    } else {
      setState(form, "error", errorText);
      const container = captchaContainer(form);
      const widget = container ? widgets.get(container) : undefined;
      void widget?.then((w) => w?.api.reset(w.id));
    }
  } catch {
    if (!controller.signal.aborted && form.isConnected) setState(form, "error", errorText);
  } finally {
    if (inflight.get(form) === controller) inflight.delete(form);
  }
}

const marker = window as Window & { __ctaMessageBound?: boolean };
if (!marker.__ctaMessageBound) {
  marker.__ctaMessageBound = true;
  document.addEventListener("click", onClick);
  // Capture phase so preventDefault() lands before ClientRouter's form-submit interception.
  document.addEventListener("submit", (event) => void onSubmit(event as SubmitEvent), true);
}
