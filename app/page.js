"use client";

import { useEffect, useState } from "react";
import ListOfStops from "./components/ListOfStops";
import SearchInput from "./components/SearchInput";
import FavBtn from "./components/FavBtn";
import Image from "next/image";

export default function Home() {
  // hook to handle state of the current stops pulled from the API based on the input
  const [stops, setStops] = useState([]);
  const [searchText, setSeachText] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    getStops(searchText);
  }, [searchText]);

  // gets called if search input changes and updates the state of the  stops
  const getStops = async (input) => {
    if (input === "") {
      setStops([]); // set stops to empty array if the input is blank
    } else {
      const response = await fetch(
        `https://v6.vbb.transport.rest/locations?poi=false&addresses=false&fuzzy=false&query=${input}`
      );
      const newStops = await response.json();
      setStops(newStops);
    }
  };

  const getFavorites = async (off = false) => {
    if (off) {
      if (searchText === "") {
        getStops("");
      } else {
        getStops(searchText);
      }
      setFavoritesOnly(false);
    } else {
      const favoriteData = localStorage.getItem("favorites");
      if (favoriteData !== null) {
        const favs = JSON.parse(favoriteData);
        let newStops = [];
        if (searchText === "") {
          // if no stops displayed --> pull all favorites
          for (let i = 0; i < favs.length; i++) {
            const query = String(favs[i]);
            const response = await fetch(
              `https://v6.vbb.transport.rest/stops/${query}`
            );
            const favStop = await response.json();
            newStops.push(favStop);
          }
          setStops(newStops);
          setFavoritesOnly(true);
        } else {
          // if results are shown --> only show favorites
          setFavoritesOnly(true);
        }
      }
    }
  };

  return (
    <>
      <section className={`mainClr ${stops.length == 0 ? "full" : ""}`}>
        <Image src={"/brandenburger_tor.jpg"} alt="rails" fill={true} className="rails-bg"/>
        <h2>
          Public Transportation System <br />
          of Berlin & Brandenburg
        </h2>
        <SearchInput searchText={searchText} setSeachText={setSeachText} />
      </section>
      <section className="white">
        <FavBtn getFavorites={getFavorites} searchText={searchText} />
        {favoritesOnly && stops.length === 0 && (
          <div className="no-data">There are no favorites!</div>
        )}
        <ListOfStops stops={stops} favoritesOnly={favoritesOnly} />
      </section>
    </>
  );
}
