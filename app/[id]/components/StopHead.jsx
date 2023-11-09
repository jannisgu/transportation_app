"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const StopHead = ({ departuresObj, id }) => {

  return (
    <h1>
      {!departuresObj || departuresObj.departures.length === 0
        ? "No Departure Data!"
        : departuresObj.departures[0]?.stop?.name}

    </h1>
  );
};

export default StopHead;
