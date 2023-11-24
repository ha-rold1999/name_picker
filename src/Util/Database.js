const apiUrl = "https://localhost:7229/api/v1";
export const FetchDatabase = async () => {
  let Payload = {};
  await fetch(`${apiUrl}/Events/2/rafflegenerate`)
    .then((r) => r.json())
    .then((d) => {
      Payload = d;
      console.log("Downloaded attendees from server");
    });

  return Payload;
};

export const SaveWinner = async (attendeeId, prize) => {
  await fetch(`${apiUrl}/Events/2/rafflewinners`, {
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

export const GetWinners = async () => {
  let arr = [];
  await fetch(`${apiUrl}/Events/2/rafflewinners`, {
    method: "GET",
  })
    .then((r) => r.json())
    .then((d) => {
      d.raffleWinners.forEach((winner) => {
        arr.push({
          companyId: winner.attendee.companyId,
          lastName: winner.attendee.lastName,
          firstName: winner.attendee.firstName,
          email: winner.attendee.email,
          prize: winner.prize,
        });
      });
    });
  return arr;
};
