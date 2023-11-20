import React from "react";

export default function DurationOptions({ setLimit, durations }) {
  return (
    <select
      onChange={(e) => {
        setLimit(e.target.value);
      }}
      className="w-full p-2 rounded-lg"
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
  );
}
