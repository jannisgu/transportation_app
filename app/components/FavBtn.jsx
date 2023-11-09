import Image from "next/image";
import { useState } from "react";

const FavBtn = ({ getFavorites, searchText }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (active) {
      getFavorites(true);
      setActive(false);
    } else {
      getFavorites();
      setActive(true);
    }
  };

  // adapt styling based on search text 
  const style = searchText !== "" ? { marginTop: "20px" } : {};

  return (
    <button
      className={`favs-toggle ${active && "active"}`}
      onClick={handleClick}
      style={style}
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
