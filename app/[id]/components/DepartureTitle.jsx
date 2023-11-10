const getStopName = async (id) => {
  const response = await fetch(`https://v6.vbb.transport.rest/stops/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) return;
  return response.json();
};

const DepartureTitle = async ({ id }) => {
  const stopObj = await getStopName(id);

  return (
    <h1>{stopObj.constructor !== Promise ? stopObj.name : "Name not found"}</h1>
  );
};

export default DepartureTitle;
