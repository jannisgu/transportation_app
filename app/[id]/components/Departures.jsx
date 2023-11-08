const Departures = ({ departures }) => {
    
  return (
    <ul>
      {typeof departures.constructor !== Promise &&
        departures.length > 0 &&
        departures.map((departure, key) => {
            console.log(departure)
          const planned = new Date(departure.plannedWhen).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          );
          const delay = departure.delay;
          const when = departure.when;
          return (
            <li key={key}>
              <div className="time">
                <div className="planned">{planned}</div>
                {delay && (
                  <>
                    <div className="delay">{delay}</div>
                    <div className="when">{when}</div>
                  </>
                )}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Departures;
