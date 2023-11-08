"use client";

import { useState } from "react";
import ListOfStops from "./components/ListOfStops";
import SearchInput from "./components/SearchInput";
import FavBtn from "./components/FavBtn";

export default function Home() {
  // hook to handle state of the current stops pulled from the API based on the input
  const [stops, setStops] = useState([]);
  const [searchText, setSeachText] = useState("");

  // gets called if search input changes and updates the state of the  stops
  const getStops = async (searchText) => {
    if (searchText.length == 0) {
      setStops([]); // set stops to empty array if the input is blank
      return;
    }

    const response = await fetch(
      `https://v6.vbb.transport.rest/locations?poi=false&addresses=false&query=${searchText}`
    );
    const newStops = await response.json();
    setStops(newStops);
  };

  const getFavorites = async (off = false) => {
    if (off) {
      setStops([]);
    }
    const favoriteData = localStorage.getItem("favorites");
    if (favoriteData !== null) {
      const favs = JSON.parse(favoriteData);
      for (let i = 0; i < favs.length; i++) {
        const query = String(favs[i]);
        const response = await fetch(
          `https://v6.vbb.transport.rest/stops/${query}`
        );
        const newStops = await response.json();
        console.log("newstops:", newStops);
        setStops(newStops);
      }
    }
  };

  return (
    <>
      <section className={`mainClr ${stops.length == 0 ? "full" : ""}`}>
        <h2>
          Public Transportation System <br />
          of Berlin & Brandenburg
        </h2>
        <SearchInput getStops={getStops} searchText={searchText} setSeachText={setSeachText} />
      </section>
      <section className="white">
        <FavBtn getFavorites={getFavorites} />
        <ListOfStops stops={stops} searchText={searchText} />
      </section>
    </>
  );
}
