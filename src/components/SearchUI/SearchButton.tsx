import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import {
  installSearchPanelDismissal,
  toggleSearchPanel,
} from "./searchPanelRuntime";

export const SearchButton = () => {
  useEffect(() => {
    return installSearchPanelDismissal();
  }, []);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleSearchPanel();
  };

  return (
    <Button
      title="Toggle search panel"
      aria-label="Search"
      aria-controls="site-search-panel"
      aria-expanded={false}
      type="button"
      className={"btnSearchToggle"}
      variant={"ghost"}
      onClick={handleToggle}
    >
      <SearchIcon />
    </Button>
  );
};
