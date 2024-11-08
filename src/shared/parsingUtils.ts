export const toBoolean = (value: string | boolean) => {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return false;
  value = value.toLowerCase().trim();
  return value === "true" || value === "1" || value === "yes" || value === "on";
};
