import { cx } from "class-variance-authority";

export function HintTooltip({
  hint,
  className,
  title,
  showHint,
  onClose,
}: {
  hint: string;
  className?: string;
  title?: string;
  showHint?: boolean;
  onClose?: (ignoreForCount?: number | undefined) => void;
}) {
  if (!showHint || !hint) return null;

  return (
    <aside
      className={cx("hint-tooltip", className)}
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
          Dismiss
        </button>
        <button type="button" onClick={() => onClose?.(5)}>
          Hide next 5 Hints
        </button>
      </div>
    </aside>
  );
}
