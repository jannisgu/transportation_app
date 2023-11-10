import Departures from "./components/Departures";
import DepartureHead from "./components/DepartureHead";
import DepartureTitle from "./components/DepartureTitle";

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
      <DepartureTitle id={params.id} />
      <DepartureHead id={params.id} />
      <Departures departures={departuresObj && departuresObj.departures} />
    </div>
  );
};

export default Details;
