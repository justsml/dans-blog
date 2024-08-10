import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";

interface ListItemProps {
  title: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  (
    { className, children, title, ...props },
    forwardedRef: React.ForwardedRef<HTMLAnchorElement>
  ) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);
