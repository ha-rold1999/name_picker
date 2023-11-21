import React from "react";

export default function DurationOptions({ setLimit, durations }) {
  return (
    <div className="w-full">
      <div className="text-lg font-bold">Duration</div>
      <select
        onChange={(e) => {
          console.log(e.target.value);
          setLimit(e.target.value);
        }}
        className="w-full p-2 rounded-lg border-2 border-gray"
      >
        <option value="" disabled selected>
          Select a Duration
        </option>
        {durations.map((d, index) => (
          <option value={d.duration} key={index}>
            {d.time} seconds
          </option>
        ))}
      </select>
    </div>
  );
}
