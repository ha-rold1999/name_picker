import React from "react";

export default function PrizeOptions({ setPrize, prizes }) {
  return (
    <div className="w-full">
      <div className=" text-lg font-bold">Prize</div>
      <select
        onChange={(e) => {
          setPrize(e.target.value);
        }}
        className="w-full p-2 rounded-lg border-2 border-gray"
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
    </div>
  );
}
