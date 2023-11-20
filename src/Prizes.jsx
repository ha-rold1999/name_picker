import { Payload } from "./Data";
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

    const refreshList = [...JSON.parse(list), ...JSON.parse(winners)];

    localStorage.setItem("activeList", JSON.stringify(refreshList));
    localStorage.setItem("winnersList", JSON.stringify([]));
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col space-y-2 items-center  w-1/2">
      <div className="flex flex-row space-x-2">
        <div className="text-lg font-bold">Attendies: {attendies}</div>
        <button
          onClick={() => {
            refreshList();
          }}
          className="bg-green-300 p-1 rounded-lg"
        >
          Refresh Attendies
        </button>
      </div>

      <PrizeOptions setPrize={setPrize} prizes={prizes} />
      <DurationOptions setLimit={setLimit} durations={durations} />
    </div>
  );
}
