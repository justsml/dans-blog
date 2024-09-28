'use client';

import { formatDistance } from "date-fns/formatDistance";
import { InfoLabel } from "./ui/infoLabel";
import { CalendarIcon } from "lucide-react";

export function CreatedModifiedLabel({
  date,
  modified,
}: {
  date?: string | Date;
  modified?: string | Date;
}) {
  const createdAgo = date ? formatDistance(new Date(date), new Date()) : "";
  const modifiedAgo = modified
    ? formatDistance(new Date(modified), new Date())
    : "";

  return (
    createdAgo && (
      <InfoLabel
        text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
        tooltips={[`created at ${date}`, `updated at ${modified}`]}
      >
        <CalendarIcon className="icon" strokeWidth={1} />
      </InfoLabel>
    )
  );
}
