import Departures from "./components/Departures";
import BackButton from "./components/BackButton";
import Image from "next/image";

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
      <h1>{departuresObj && departuresObj.departures[0]?.stop?.name}</h1>
      <div className="departure-head">
        <h2>Departures</h2>
        <a href={`${params.id}`} >
          <Image src={"/reload.png"} alt="reload" width={30} height={30} />
        </a>
        <BackButton />
      </div>
      <Departures departures={departuresObj && departuresObj.departures} />
    </div>
  );
};

export default Details;
