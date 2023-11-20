const apiUrl = "https://localhost:7229/api/v1";
export const FetchDatabase = async () => {
  let Payload = {};
  await fetch(`${apiUrl}/Events/1/rafflegenerate`)
    .then((r) => r.json())
    .then((d) => {
      Payload = d;
    });

  return Payload;
};

export const SaveWinner = async (attendeeId, prize) => {
  await fetch(`${apiUrl}/Events/1/rafflewinners`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      attendeeId,
      prize,
    }),
  })
    .then((r) => r.json())
    .then((d) => {
      console.log("Winner Saved to database: " + d.message);
    });
};
