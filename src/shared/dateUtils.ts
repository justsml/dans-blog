import { formatDistance } from "date-fns/formatDistance";

export const getComputedDates = ({
  date,
  modified,
}: {
  date: string | Date;
  modified?: null | Date | string;
}) => {
  if (typeof date === "string") date = new Date(date);
  if (typeof modified === "string" && modified != null) modified = new Date(modified);
  const createdAgo = date ? formatDistance(new Date(date), new Date()) : "";
  const modifiedAgo = modified
    ? formatDistance(new Date(modified), new Date())
    : "";

  return { createdAgo, modifiedAgo };
};
