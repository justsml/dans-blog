import type { IconProps } from "@radix-ui/react-icons/dist/types";

export const CalendarIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"app-calendar-icon " + props.className}
      style={{
        strokeWidth: '.5px',
      }}
      viewBox="0 0 24 24"
    >
      <path d="M8 2v4"></path>
      <path d="M16 2v4"></path>
      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
      <path d="M3 10h18"></path>
    </svg>
  );
};
