import DepartureEntry from "./DepartureEntry";

const Departures = ({ departures }) => {
  return (
    <ul className="departures">
      {departures &&
        typeof departures.constructor !== Promise && // only continue if data is there
        departures.length > 0 &&
        departures.map((departure, key) => {
          return <DepartureEntry key={key} departure={departure} />;
        })}
    </ul>
  );
};

export default Departures;
