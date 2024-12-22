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
  onClose?: () => void;
}) {
  if (showHint) console.log(`Showing Hint: ${hint}`);
  return (
    <Popover
      open={showHint}
      onOpenChange={(isOpen: boolean) => {
        console.log("Popover.open", isOpen);
        if (!isOpen) onClose?.();
      }}
    >
      <PopoverTrigger />
      <PopoverContent className={cx("w-80 hint-tooltip", className)}>
        <div
          className="grid gap-4"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log("PopoverContent.onClick", onClose);
            onClose?.();

          }}
        >
          <div className="inner-tooltip">
            {title && (
              <h4 className="font-medium leading-none my-2">{title}</h4>
            )}
            <p className="text-sm text-muted-foreground my-0">{hint}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
