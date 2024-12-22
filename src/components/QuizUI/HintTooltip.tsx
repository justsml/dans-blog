import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
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
  if (showHint) console.log(`Showing Hint: ${hint}`);
  return (
    <Popover
      data-align="end"
      open={showHint}
      onOpenChange={(isOpen: boolean) => {
        // console.log("Popover.open", isOpen);
        if (!isOpen) onClose?.();
      }}
    >
      <PopoverTrigger>
      </PopoverTrigger>
      <PopoverContent className={cx("w-80 opacity-90 hint-tooltip", className)}>
        <div
          className="grid gap-4"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClose?.();
          }}
        >
          <div className="inner-tooltip grid">
            {title && (
              <h4 className="font-medium leading-none my-2">{title}</h4>
            )}
            <p className="text-sm text-muted-foreground my-0">{hint}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => onClose?.()} variant="outline">
              Hide
            </Button>
            <Button onClick={() => onClose?.(5)} variant="outline">
              Hide next 5 Hints
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
