import type { ReactNode } from "react";
import "./infoLabel.css";

export function InfoLabel({
  // icon,
  text,
  tooltips,
  className
}: {
  children?: ReactNode;
  className?: string;
  // icon: ReactNode;
  text: string | [string] | [string, string];
  tooltips?: [string, string] | [string] | string;
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

  if (tooltips && tooltips.length !== text.length) {
    console.warn("InfoLabel: tooltips[] length does not match text[] length");
  }
  const line1Tooltip = tooltips ? { title: tooltips[0] } : {};
  const line2Tooltip = tooltips ? { title: tooltips[1] } : {};

  let lineStyle = {}
  if (!line2) {
    lineStyle = { gridRow: 'span 2' };
  }

  return <div className={"info-grid " + className}>
    <div className="line1" style={lineStyle} {...line1Tooltip}>{line1}</div>
    {line2 && <span className="line2" {...line2Tooltip}>{line2}</span>}
  </div>;
}
