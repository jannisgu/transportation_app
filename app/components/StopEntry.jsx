"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import ProductIcon from "./ProductIcon";

const StopEntry = ({ productTypes, stop, stops, favorites, updateFavorites }) => {
  const [favorite, setFavorite] = useState(false);
  const router = useRouter();

  // check if stop is favorite
  useEffect(() => {
    if (favorites.includes(parseInt(stop.id))) {
      setFavorite(true);
    }
  }, [stops]);

  const handleFavClick = () => {
    if (favorite) {
      updateFavorites(parseInt(stop.id), false); // false = delete from storage
      setFavorite(false);
    } else {
      updateFavorites(parseInt(stop.id), true); // true = add to storage
      setFavorite(true);
    }
  };

  const handleStopClick = (e) => {
    // if not clicked on favorite button or product-icons => route to destination page
    if (e.target.className === "name" || e.target.nodeName === "LI") {
      router.push(stop.id);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <li onClick={handleStopClick}>
        <div className="left">
          <button className="star-btn" onClick={handleFavClick}>
            <Image
              src={`/${favorite ? "star_gold" : "star"}.png`}
              alt="favorite"
              width={20}
              height={20}
            />
          </button>
          <div className="name">{stop.name}</div>
        </div>
        <div className="products">
          {productTypes.map((type, key) => {
            const available = stop.products[type];
            return available && <ProductIcon type={type} key={key} />;
          })}
        </div>
      </li>
    </Suspense>
  );
};

export default StopEntry;
