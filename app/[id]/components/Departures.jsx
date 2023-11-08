import Image from "next/image";

const Departures = ({ departures }) => {
  return (
    <ul className="departures">
      {typeof departures.constructor !== Promise && // only continue if data is there
        departures.length > 0 &&
        departures.map((departure, key) => {
          // setup the data to display
          const dateFormat = { hour: "2-digit", minute: "2-digit" };
          const planned = new Date(departure.plannedWhen).toLocaleTimeString(
            "de",
            dateFormat
          );
          const when = new Date(departure.when).toLocaleTimeString(
            "de",
            dateFormat
          );
          const delay = departure.delay;
          const delayBool = delay && delay != 0 ? true : false;
          const direction = departure.direction;
          const line = departure.line.name;
          const product = departure.line.product;
          const plannedPlatform = departure.plannedPlatform;
          const platform = departure.platform;
          const remarks = departure.remarks;
          return (
            <li className="departure" key={key}>
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
              <div className="right">
                <div className="line">
                  <Image
                    src={`/${product}.png`}
                    alt={product}
                    height={20}
                    width={20}
                  />
                  {line}
                </div>
                <div className="platform">
                  <div className="planned">{plannedPlatform}</div>
                  {platform && <div className="actual">{platform}</div>}
                </div>
              </div>
              <div className="remarks">
                {remarks.map((remark, key) => {
                  console.log(remark);
                  if (remark.type == "hint") {
                    return <div className="hint" key={key}></div>;
                  }
                  return <div className="warning" key={key}></div>;
                })}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Departures;
