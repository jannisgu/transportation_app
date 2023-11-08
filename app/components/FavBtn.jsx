import Image from "next/image";
import { useState } from "react";

const FavBtn = ({ getFavorites }) => {
  const [active, setActive] = useState(false);

  const handleFavBtn = () => {
    if (active) {
      getFavorites(true);
      setActive(false);
    } else {
      getFavorites();
      setActive(true);
    }
  };

  return (
    <button
      className={`favs-toggle ${active && "active"}`}
      onClick={handleFavBtn}
    >
      Favorites
      <Image
        src={"/star_gold.png"}
        alt="favorites only"
        width={25}
        height={25}
      />
    </button>
  );
};

export default FavBtn;
