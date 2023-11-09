"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import ProductIcon from "./ProductIcon";

const ListEntry = ({ productTypes, stop, favorites, updateFavorites }) => {
  const [favorite, setFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (favorites.includes(parseInt(stop.id))) {
      setFavorite(true);
    }
  }, []);

  const handleFavClick = () => {
    if (favorite) {
      updateFavorites(parseInt(stop.id), false); // false = delete from storage
      setFavorite(false); 
    } else {
      updateFavorites(parseInt(stop.id), true); // true = add to storage
      setFavorite(true);
    }
  };

  const routeToDestinations = (e) => {
    if (e.target.className === "name" || e.target.nodeName === "LI") {
      router.push(stop.id);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <li onClick={routeToDestinations}>
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

export default ListEntry;
