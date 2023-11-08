import ProductIcon from "@/app/components/ProductIcon";


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
      <div className="remarks">
        {remarks.map((remark, key) => {
          console.log(remark);
          if (remark.type == "hint") {
            return (
              <div className="hint" key={key}>
                {remark.text}
              </div>
            );
          }
          return (
            <div className="warning" key={key}>
              {remark.text}
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default DepartureEntry;
