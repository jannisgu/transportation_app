"use client";

import { useEffect, useState } from "react";
import ListOfStops from "./components/ListOfStops";
import SearchInput from "./components/SearchInput";
import FavBtn from "./components/FavBtn";
import Image from "next/image";

export default function Home() {
  // keep state of current stops based on current search inputtext and whether to only show favorites
  const [stops, setStops] = useState([]);
  const [searchText, setSeachText] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // update search results on each change of search input
  useEffect(() => {
    getStops(searchText);
  }, [searchText]);

  const getStops = async (input) => {
    if (input === "") {
      setStops([]);
    } else {
      const response = await fetch(
        `https://v6.vbb.transport.rest/locations?poi=false&addresses=false&fuzzy=false&query=${input}`
      );
      const newStops = await response.json();
      setStops(newStops);
    }
  };

  // handle Favorite Button Click
  const getFavorites = async (off = false) => {
    if (off) {
      // if switch to off
      if (searchText === "") {
        // no input -> clear stops
        getStops("");
      } else {
        getStops(searchText);
      }
      setFavoritesOnly(false);
    } else {
      // if switch to on: pull favorite data
      const favoriteData = localStorage.getItem("favorites");
      if (favoriteData !== null) {
        const favs = JSON.parse(favoriteData);
        let newStops = [];
        if (searchText === "") {
          // if no stops displayed --> pull all favorites
          for (let i = 0; i < favs.length; i++) {
            const query = String(favs[i]);
            if (query) { // if query not null
              const response = await fetch(
                `https://v6.vbb.transport.rest/stops/${query}`
              );
              const favStop = await response.json();
              newStops.push(favStop);
            }
          }
          setStops(newStops);
          setFavoritesOnly(true);
        } else {
          // if results are shown --> filter to show favorites only
          setFavoritesOnly(true);
        }
      }
    }
  };

  return (
    <>
      <section className={`main-clr ${stops.length == 0 ? "full" : ""}`}>
        <Image
          src={"/brandenburger_tor.jpg"}
          alt="rails"
          fill={true}
          className="rails-bg"
        />
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
