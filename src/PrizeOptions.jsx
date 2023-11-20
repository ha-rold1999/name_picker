import React from "react";

export default function PrizeOptions({ setPrize, prizes }) {
  return (
    <select
      onChange={(e) => {
        setPrize(e.target.value);
      }}
      className="w-full p-2 rounded-lg"
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
  );
}
