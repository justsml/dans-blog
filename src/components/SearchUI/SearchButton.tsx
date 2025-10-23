import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

export const SearchButton = () => {
  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      // Small delay to prevent interference with other click handlers
      setTimeout(() => {
        const $searchBar = document.querySelector(".searchBar");
        if (!$searchBar || $searchBar.classList.contains("collapsed")) return;
        
        const searchContainer = $searchBar.querySelector(".pagefind-ui");
        const target = e.target as HTMLElement;
        
        // Don't close if clicking on search input, results, or any search-related elements
        if (searchContainer && !searchContainer.contains(target)) {
          // Also check if we're clicking on the search button itself
          const searchButton = target.closest('.btnSearchToggle');
          const navMenu = target.closest('.NavigationMenuRoot');
          
          // Don't close if clicking search button or nav menu
          if (!searchButton && !navMenu) {
            $searchBar.classList.add("collapsed");
            document.body.classList.remove("search-panel-open");
          }
        }
      }, 10);
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const $searchBar = document.querySelector(".searchBar");
        if ($searchBar && !$searchBar.classList.contains("collapsed")) {
          $searchBar.classList.add("collapsed");
          document.body.classList.remove("search-panel-open");
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
      // Close any open nav menu panels before opening search
      // Dispatch custom event to close nav panels
      document.dispatchEvent(new CustomEvent('closeNavPanels'));
      
      $searchBar.classList.remove("collapsed");
      document.body.classList.add("search-panel-open");
      
      // Auto-focus the search input after animation
      setTimeout(() => {
        const searchInput = $searchBar.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }, 350);
    } else {
      $searchBar.classList.add("collapsed");
      document.body.classList.remove("search-panel-open");
    }
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
