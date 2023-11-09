"use client";

import Image from "next/image";

const SearchInput = ({ searchText, setSeachText }) => {
  return (
    <div className="search-input">
      <Image
        src={"/search.png"}
        alt="search"
        className="img"
        width={20}
        height={20}
      />
      <input
        type="text"
        value={searchText}
        placeholder="Search for a stop"
        onChange={(e) => setSeachText(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
