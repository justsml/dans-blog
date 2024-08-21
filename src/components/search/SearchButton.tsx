import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";

export const SearchButton = () => (
  <Button
    title="Toggle search panel"
    type="button"
    className={"btnSearchToggle"}
    variant={"ghost"}
    
    onClick={() => {
      const $searchBar = document.querySelector(".searchBar");
      if (!$searchBar) return console.warn(`Missing '.searchBar' element`);
      $searchBar?.classList.toggle("hidden");
    }}
  >
    <SearchIcon />
  </Button>
);
