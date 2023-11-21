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
    <div className=" w-full flex justify-center ">
      <div className="flex flex-col space-y-5 bg-white py-4 rounded-lg w-1/4 p-5">
        <div className="space-y-2">
          <div className="text-2xl font-bold">Add a Prize</div>
          <div className="text-xs text-grey">Create a new raffle prize</div>
        </div>
        <div>
          <div className="text-lg font-bold">Prize Name</div>
          <input
            placeholder="Prize"
            onChange={(e) => {
              setPrize(e.target.value);
            }}
            value={prize}
            className="w-full p-2 rounded-lg border-2 border-grey"
          />
        </div>

        <button
          onClick={() => {
            addPrize();
          }}
          className={`${
            prize.length === 0 ? "bg-grey" : "bg-orange"
          } p-2 rounded-md w-full text-white`}
        >
          Add Prize
        </button>
      </div>
    </div>
  );
}
