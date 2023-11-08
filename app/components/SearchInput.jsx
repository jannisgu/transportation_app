"use client"

import { useState } from "react";
import Image from "next/image";

const SearchInput = ({ getStops, setSeachText }) => {


  const handleInput = (input) => {
    setSeachText(input);

    getStops(input);
  };

  return (
    <div className="searchInput">
      <Image src={"/search.png"} alt="search" className="img" width={20} height={20}/>
      <input
        type="text"
        value={searchText}
        placeholder="Search for a stop"
        onChange={(e) => handleInput(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
