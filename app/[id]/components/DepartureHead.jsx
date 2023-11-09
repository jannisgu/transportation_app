"use client";

import Image from "next/image";
import BackButton from "./BackButton";
import { useEffect, useState } from "react";

const DepartureHead = ({ id }) => {
  const [favorite, setFavorite] = useState(false);

  // check if current stop is favorite and set if true
  useEffect(() => {
    const favs = getFavorites();
    if (favs.includes(id)) {
      setFavorite(true);
    }
  }, []);

  const getFavorites = () => {
    const storedData = localStorage.getItem("favorites");
    if (storedData !== null) {
      const favs = JSON.parse(storedData);
      return favs;
    }
  };

  // update current storage
  const updateFavorites = (id, add) => {
    const favs = getFavorites();
    let newFavs;
    if (add) {
      newFavs = favs.concat(id);
    } else {
      newFavs = favs.filter((fav) => fav !== id);
    }
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  // update favorite state & storage on click
  const handleFavClick = () => {
    if (favorite) {
      updateFavorites(parseInt(id), false); // false = delete from storage
      setFavorite(false);
    } else {
      updateFavorites(parseInt(id), true); // true = add to storage
      setFavorite(true);
    }
  };

  return (
    <div className="departure-head">
      <h2>Departures</h2>
      <div>
        <button className="star-btn head" onClick={handleFavClick}>
          <Image
            src={`/${favorite ? "star_gold" : "star"}.png`}
            alt="favorite"
            width={30}
            height={30}
          />
        </button>
        <a href={`${id}`}>
          <Image src={"/reload.png"} alt="reload" width={30} height={30} />
        </a>
      </div>
      <BackButton />
    </div>
  );
};

export default DepartureHead;
