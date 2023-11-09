"use client";

import ProductIcon from "@/app/components/ProductIcon";
import Loading from "@/app/loading";
import { Suspense } from "react";
import Remarks from "./Remarks";
import MoreDetails from "./MoreDetails";

const DepartureEntry = ({ departure }) => {
  const dateFormat = { hour: "2-digit", minute: "2-digit" };
  const planned = new Date(departure.plannedWhen).toLocaleTimeString(
    "de",
    dateFormat
  );
  const when = new Date(departure.when).toLocaleTimeString("de", dateFormat);
  const delay = departure.delay;
  const delayBool = delay && delay != 0 ? true : false;
  const direction = departure.direction;
  const line = departure.line.name;
  const product = departure.line.product;
  const plannedPlatform = departure.plannedPlatform;
  const platform = departure.platform;
  const remarks = departure.remarks;

  return (
    <Suspense fallback={<Loading />}>
      <li
        className="departure"
      >
        <div
          className={`time ${delay > 0 ? "delayed" : ""} ${
            delay < 0 ? "tooEarly" : ""
          }`}
        >
          <div className="planned">{planned}</div>
          {delayBool && (
            <>
              <div className="when">{when}</div>
              <div className="delay">
                delayed by <span>{delay / 60}</span> min
              </div>
            </>
          )}
        </div>
        <div className="direction">{direction}</div>
        <div className="flex">
          <div className="hints">
            <Remarks remarks={remarks} type={"hints"} details={false} />
          </div>
          <div className="right">
            <div className="line">
              <ProductIcon type={product} />
              {line}
            </div>
            {plannedPlatform && (
              <div className="platform">
                Platform:
                <div
                  className={
                    platform && platform !== plannedPlatform
                      ? "changed"
                      : "planned"
                  }
                >
                  {platform !== plannedPlatform ? platform : plannedPlatform}
                </div>
              </div>
            )}
          </div>
        </div>
        <MoreDetails remarks={remarks} />
      </li>
    </Suspense>
  );
};

export default DepartureEntry;
