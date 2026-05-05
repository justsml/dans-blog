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
      type="button"
      className={"btnSearchToggle p-1"}
      variant={"ghost"}
      onClick={handleToggle}
    >
      <SearchIcon />
    </Button>
  );
};
