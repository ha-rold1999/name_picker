import { Payload } from "./Data";

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
  const saveData = () => {
    localStorage.setItem("activeList", JSON.stringify(Payload.Attendees));
    localStorage.setItem("winnersList", JSON.stringify([]));
    localStorage.setItem("prizeList", JSON.stringify([]));
  };

  const refreshList = () => {
    const list = localStorage.getItem("activeList");
    const winners = localStorage.getItem("winnersList");

    const refreshList = [...JSON.parse(list), ...JSON.parse(winners)];

    localStorage.setItem("activeList", JSON.stringify(refreshList));
    localStorage.setItem("winnersList", JSON.stringify([]));
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col">
      <div>{attendies}</div>
      <select
        onChange={(e) => {
          setPrize(e.target.value);
        }}
      >
        <option value="" disabled selected>
          Select a Prize
        </option>
        {prizes &&
          prizes.map((p, index) => (
            <option value={p} key={index}>
              {p}
            </option>
          ))}
      </select>
      <select
        onChange={(e) => {
          setLimit(e.target.value);
        }}
      >
        <option value="" disabled selected>
          Select a Duration
        </option>
        {durations.map((d, index) => (
          <option value={d} key={index}>
            {d}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          saveData();
        }}
      >
        Get Attendies
      </button>
      <button
        onClick={() => {
          refreshList();
        }}
      >
        Refresh Attendies
      </button>
      <div className="text-sm text-green-200">test</div>
    </div>
  );
}
