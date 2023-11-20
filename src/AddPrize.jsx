import React, { useState } from "react";

export default function AddPrize() {
  const [prize, setPrize] = useState("");

  const addPrize = () => {
    const getPrize = localStorage.getItem("prizeList");
    console.log(getPrize);
    const newPrizes = [...JSON.parse(getPrize), prize];
    localStorage.setItem("prizeList", JSON.stringify(newPrizes));
    alert("New Prize Saved!!!");
    setPrize("");
  };

  return (
    <div className=" w-full pt-40 flex justify-center">
      <div className="items-center flex flex-col space-y-5 bg-white py-4 rounded-lg w-1/2 p-2">
        <div className="text-2xl font-bold">Add A Prize</div>
        <input
          placeholder="Prize"
          onChange={(e) => {
            setPrize(e.target.value);
          }}
          value={prize}
          className="w-full p-2 rounded-lg bg-slate-200"
        />
        {prize.length !== 0 && (
          <button
            onClick={() => {
              addPrize();
            }}
            className="bg-green-300 p-2 rounded-sm"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
