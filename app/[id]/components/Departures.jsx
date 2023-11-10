import DepartureEntry from "./DepartureEntry";

const Departures = ({ departures }) => {
  return (
    <ul className="departures">
      {departures &&
      typeof departures.constructor !== Promise && // only continue if data is there
      departures.length > 0 ? (
        departures.map((departure, key) => {
          return <DepartureEntry key={key} departure={departure} />;
        })
      ) : (
        <li className="no-departures">No departrues available</li>
      )}
    </ul>
  );
};

export default Departures;
