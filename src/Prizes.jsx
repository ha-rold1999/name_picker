import { Payload } from "./Data";

/* eslint-disable react/prop-types */
export default function Prizes({ setPrize, prizes }) {
  const saveData = () => {
    localStorage.setItem("activeList", JSON.stringify(Payload.Attendees));
    localStorage.setItem("winnersList", JSON.stringify([]));
  };
  return (
    <div>
      <div></div>
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
    </div>
  );
}
