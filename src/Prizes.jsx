import { Payload } from "./Data";
import { FetchDatabase } from "./Util/Database";
import DurationOptions from "./DurationOptions";
import PrizeOptions from "./PrizeOptions";

/* eslint-disable react/prop-types */
export default function Prizes({
  setPrize,
  setLimit,
  durations,
  prizes,
  attendies,
  setRefresh,
  refresh,
}) {
  const refreshList = () => {
    const list = localStorage.getItem("activeList");
    const winners = localStorage.getItem("winnersList");

    const newList = [];
    // ensure when refreshed, remove the property 'prize'
    JSON.parse(winners).forEach((w) => {
      let new_w = w;
      delete new_w["prize"];
      newList.push(new_w);
    });

    const refreshList = [...JSON.parse(list), ...newList];

    localStorage.setItem("activeList", JSON.stringify(refreshList));
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col space-y-2 items-center  w-1/2">
      <div className="flex flex-row space-x-2">
        <div className="text-lg font-bold">Attendees: {attendies}</div>
        <button
          onClick={() => {
            refreshList();
          }}
          className="bg-green-300 p-1 rounded-lg"
        >
          Refresh Attendees
        </button>
      </div>

      <PrizeOptions setPrize={setPrize} prizes={prizes} />
      <DurationOptions setLimit={setLimit} durations={durations} />
    </div>
  );
}
