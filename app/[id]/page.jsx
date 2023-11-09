import Departures from "./components/Departures";
import DepartureHead from "./components/DepartureHead";

// fetch departure data on server
const getDepartures = async (id) => {
  const response = await fetch(
    `https://v6.vbb.transport.rest/stops/${id}/departures?results=15`,
    { cache: "no-store" }
  );
  if (!response.ok) return;
  return response.json();
};

const Details = async ({ params }) => {
  const departuresObj = await getDepartures(params.id);

  return (
    <div className="departure-page">
      <h1>
        {!departuresObj || departuresObj.departures.length === 0
          ? "No Departure Data!"
          : departuresObj.departures[0]?.stop?.name}
      </h1>
      <DepartureHead id={params.id} />
      <Departures departures={departuresObj && departuresObj.departures} />
    </div>
  );
};

export default Details;
