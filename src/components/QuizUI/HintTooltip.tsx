import { getQuizMessages } from "./messages";
export function HintTooltip({
  hint,
  className,
  title,
  showHint,
  onClose,
  messages = getQuizMessages(),
}: {
  messages?: ReturnType<typeof getQuizMessages>;
  hint: string;
  className?: string;
  title?: string;
  showHint?: boolean;
  onClose?: (ignoreForCount?: number | undefined) => void;
}) {
  if (!showHint || !hint) return null;

  return (
    <aside
      className={["hint-tooltip", className].filter(Boolean).join(" ")}
      role="status"
      aria-live="polite"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="inner-tooltip grid">
        {title && <h4 className="font-medium leading-none my-2">{title}</h4>}
        <p className="text-sm text-muted-foreground my-0">{hint}</p>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => onClose?.()}>
          {messages.dismiss}
        </button>
        <button type="button" onClick={() => onClose?.(5)}>
          {messages.hideHints}
        </button>
      </div>
    </aside>
  );
}
