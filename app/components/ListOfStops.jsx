"use client";

import Image from "next/image";
import ListEntry from "@/app/components/ListEntry";
import { useEffect, useState } from "react";

const ListOfStops = ({ stops, favoritesOnly }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("favorites");
    if (storedData !== null) {
      const favs = JSON.parse(storedData);
      setFavorites(favs);
    }
  }, [favoritesOnly]);

  const updateFavorites = (id, add) => {
    let newFavs;
    if (add) {
      newFavs = favorites.concat(id);
    } else {
      newFavs = favorites.filter((fav) => fav !== id);
    }
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setFavorites(newFavs);
  };

  return (
    <ul className="searchResults">
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
