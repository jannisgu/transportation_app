"use client";

import ProductIcon from "@/app/components/ProductIcon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DepartureEntry = ({ departure }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const hasWarning = remarks.some((remark) => remark.type === "warning");
    if (hasWarning) {
      setWarning(true);
    }
  }, [departure.remarks]);

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
    <li className="departure">
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
            {remarks.map((remark, key) => {
              if (remark.type === "hint") {
                if (remark.code === "FK") {
                  return (
                    <div className="hint" key={key}>
                      <Image
                        src={"/bicycle.png"}
                        alt="bicycle conveyance"
                        width={20}
                        height={20}
                      />
                    </div>
                  );
                } else if (remark.code === "WV") {
                  return (
                    <div className="hint" key={key}>
                      <Image
                        src={"/wifi.png"}
                        alt="wifi available"
                        width={20}
                        height={20}
                      />
                    </div>
                  );
                }
              }
            })}
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
                    platform && platform !== plannedPlatform ? "changed" : "planned"
                  }
                >
                  {platform !== plannedPlatform ? platform : plannedPlatform}
                </div>
              </div>
            )}
          </div>
      </div>
      <div
        className={`remarks ${showDetails ? "show" : ""} ${
          warning ? "warning" : ""
        }`}
      >
        <button onClick={() => setShowDetails((prev) => !prev)}>
          <motion.div
            initial="collpased"
            animate={showDetails ? "expanded" : "collapsed"}
            variants={{ collapsed: { rotate: 0 }, expanded: { rotate: 180 } }}
          >
            &darr;
          </motion.div>
        </button>
        {showDetails && (
          <>
            {warning && (
              <div className="warnings">
                <h4>Warnings</h4>
                {remarks.map((remark, key) => {
                  if (remark.type === "warning") {
                    return (
                      <div
                        key={key}
                        dangerouslySetInnerHTML={{ __html: remark.text }}
                      ></div>
                    );
                  }
                })}
              </div>
            )}
            <div className="hints">
              <h4>Details</h4>
              {remarks.map((remark, key) => {
                if (remark.type === "hint") {
                  return <div key={key}>{remark.text}</div>;
                }
              })}
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default DepartureEntry;
