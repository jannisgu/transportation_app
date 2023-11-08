import { useEffect, useState } from "react";
import Image from "next/image";
import ProductIcon from "./ProductIcon";
import { motion } from "framer-motion";

const ListEntry = ({
  productTypes,
  stop,
  favorites,
  updateFavorites,
}) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (favorites.includes(parseInt(stop.id))) {
      setFavorite(true);
    }
  }, [favorites]);

  const handleFavClick = () => {
    if (!favorite) {
      console.log("test!");
      updateFavorites(parseInt(stop.id), true);
      setFavorite(true);
    } else {
      console.log("test");
      updateFavorites(parseInt(stop.id), false);
      setFavorite(false);
    }
  };

  return (
    <motion.li>
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
    </motion.li>
  );
};

export default ListEntry;
