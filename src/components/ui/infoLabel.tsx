import type { ReactNode } from "react";
import "./infoLabel.css";

export function InfoLabel({
  // icon,
  text,
  className,
  children,
}: {
  children?: ReactNode;
  className?: string;
  // icon: ReactNode;
  text: string | [string] | [string, string];
}) {
let line1 = "";
let line2: undefined | string = undefined;
className = className ?? "";

  if (typeof text === "string" || Array.isArray(text)) {
    line1 = typeof text === "string" ? text : text[0];
  }
  if (Array.isArray(text) && text.length > 1) {
    line1 = text[0];
    line2 = text[1];
  }

  let lineStyle = {}
  if (!line2) {
    lineStyle = { gridRow: 'span 2' };
  }

  return <div className={"info-grid " + className}>
    <div className="icon" style={lineStyle}>{children}</div>
    <div className="line1" style={lineStyle}>{line1}</div>
    {line2 && <div className="line2">{line2}</div>}
  </div>;
}
