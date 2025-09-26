import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

export const SearchButton = () => {
  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      const $searchBar = document.querySelector(".searchBar");
      if (!$searchBar || $searchBar.classList.contains("collapsed")) return;
      
      const searchContainer = $searchBar.querySelector(".pagefind-ui");
      const target = e.target as HTMLElement;
      
      // If click is outside the search container, close the search
      if (searchContainer && !searchContainer.contains(target)) {
        $searchBar.classList.add("collapsed");
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const $searchBar = document.querySelector(".searchBar");
        if ($searchBar && !$searchBar.classList.contains("collapsed")) {
          $searchBar.classList.add("collapsed");
        }
      }
    };

    // Add event listeners
    document.addEventListener("click", handleBackdropClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleBackdropClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const $searchBar = document.querySelector(".searchBar");
    if (!$searchBar) return console.warn(`Missing '.searchBar' element`);
    
    const isCurrentlyCollapsed = $searchBar.classList.contains("collapsed");
    
    if (isCurrentlyCollapsed) {
      $searchBar.classList.remove("collapsed");
      
      // Auto-focus the search input after animation
      setTimeout(() => {
        const searchInput = $searchBar.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }, 350);
    } else {
      $searchBar.classList.add("collapsed");
    }
  };

  return (
    <Button
      title="Toggle search panel"
      type="button"
      className={"btnSearchToggle"}
      variant={"ghost"}
      onClick={handleToggle}
    >
      <SearchIcon />
    </Button>
  );
};
