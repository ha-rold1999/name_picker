import { Payload } from "./Data";

/* eslint-disable react/prop-types */
export default function Prizes({
  setPrize,
  prizes,
  attendies,
  setRefresh,
  refresh,
}) {
  const saveData = () => {
    localStorage.setItem("activeList", JSON.stringify(Payload.Attendees));
    localStorage.setItem("winnersList", JSON.stringify([]));
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
        }}>
        <option value="" disabled selected>
          Select a Prize
        </option>
        {prizes.map((p, index) => (
          <option value={p} key={index}>
            {p}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          saveData();
        }}>
        Get Attendies
      </button>
      <button
        onClick={() => {
          refreshList();
        }}>
        Refresh Attendies
      </button>
      <div className="text-sm text-green-200">test</div>
    </div>
  );
}
