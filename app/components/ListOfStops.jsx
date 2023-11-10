"use client";

import ListEntry from "@/app/components/StopEntry";
import { useEffect, useState } from "react";

const ListOfStops = ({ stops, favoritesOnly }) => {
  // save state of all favorites
  const [favorites, setFavorites] = useState([]);

  // fetch favorite data & update state
  useEffect(() => {
    const storedData = localStorage.getItem("favorites");
    if (storedData !== null) {
      const favs = JSON.parse(storedData);
      setFavorites(favs);
    }
  }, [favoritesOnly]);

  // update favorites
  const updateFavorites = (id, add) => {
    let newFavs;
    if (add) {
      if (!favorites.includes(id)) {
        newFavs = favorites.concat(id);
      }
    } else {
      newFavs = favorites.filter((fav) => fav !== id);
    }
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setFavorites(newFavs);
  };

  return (
    <ul className="search-results">
      {stops.length > 0 &&
        stops.map((stop, key) => {
          const productTypes = Object.keys(stop.products);
          if (favoritesOnly) {
            if (favorites.includes(parseInt(stop.id))) {
              return (
                <ListEntry
                  key={key}
                  productTypes={productTypes}
                  stop={stop}
                  stops={stops}
                  favorites={favorites}
                  updateFavorites={updateFavorites}
                />
              );
            }
          } else {
            return (
              <ListEntry
                key={key}
                productTypes={productTypes}
                stop={stop}
                stops={stops}
                favorites={favorites}
                updateFavorites={updateFavorites}
              />
            );
          }
        })}
    </ul>
  );
};

export default ListOfStops;
