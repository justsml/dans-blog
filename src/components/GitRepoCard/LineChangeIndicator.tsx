import React from "react";
import "./LineChangeIndicator.css";
export const LineChangeIndicator = ({ additions = 0, deletions = 0 }: { additions?: number; deletions?: number }) => (
  <span className="line-change-indicator" aria-label={`${additions.toLocaleString()} lines added, ${deletions.toLocaleString()} lines removed`}>
    <span className="added">+{additions.toLocaleString()}</span>
    <span className="removed">−{deletions.toLocaleString()}</span>
  </span>
);
