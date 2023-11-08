import Departures from "./components/Departures";

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
    <>
      <h2>Departures</h2>
      <Departures departures={departuresObj.departures} />
    </>
  );
};

export default Details;
