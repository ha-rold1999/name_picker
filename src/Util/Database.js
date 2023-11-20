const apiUrl = "https://localhost:7229/api/v1";
export const FetchDatabase = async () => {
  let Payload = {};
  await fetch(`${apiUrl}/Events/1/rafflegneerate`)
    .then((r) => r.json())
    .then((d) => {
      Payload = d;
    });

  return Payload;
};
