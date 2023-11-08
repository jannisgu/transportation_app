"use client";

import Image from "next/image";
import ListEntry from "@/app/components/ListEntry";
import { useEffect, useState } from "react";

const ListOfStops = ({ stops }) => {
  const [favorites, setFavorites] = useState([]);
  console.log(favorites);

  useEffect(() => {
    const storedData = localStorage.getItem("favorites");
    if (storedData !== null) {
      const favs = JSON.parse(storedData);
      setFavorites(favs);
    }
  }, []);

  const updateFavorites = (id, add) => {
    let newFavs;
    if (add) {
      newFavs = favorites.concat(id);
      console.log("added id: ", id);
    } else {
      newFavs = favorites.filter((fav) => fav !== id);
      console.log("removed id: ", id);
    }
    console.log(favorites);
    console.log(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setFavorites(newFavs);
  };

  return (
    <ul className="searchResults">
      {stops.length > 0 &&
        stops.map((stop, key) => {
          const productTypes = Object.keys(stop.products);
          return (
            <ListEntry
              key={key}
              productTypes={productTypes}
              stop={stop}
              favorites={favorites}
              updateFavorites={updateFavorites}
            />
          );
        })}
    </ul>
  );
};

export default ListOfStops;
