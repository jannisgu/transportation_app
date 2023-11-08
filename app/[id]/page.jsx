import Departures from "./components/Departures";
import BackButton from "./components/BackButton";

const getDepartures = async (id) => {
  const response = await fetch(
    `https://v6.vbb.transport.rest/stops/${id}/departures?results=15&duration=20`
  );
  if (!response.ok) return;
  return response.json();
};

const Details = async ({ params }) => {
  const departuresObj = await getDepartures(params.id);

  return (
    <div className="departure-page">
      <div className="departure-head">
        <h1>{departuresObj.departures[0].stop.name}</h1>
        <div className="flex">
          <h2>Departures</h2>
          <BackButton />
        </div>
      </div>
      <Departures departures={departuresObj.departures} />
    </div>
  );
};

export default Details;
