import React, { useState } from "react";

export default function AddPrize() {
  const [prize, setPrize] = useState("");

  const addPrize = () => {
    const getPrize = localStorage.getItem("prizeList");
    console.log(getPrize);
    const newPrizes = [...JSON.parse(getPrize), prize];
    localStorage.setItem("prizeList", JSON.stringify(newPrizes));
    setPrize("");
  };

  return (
    <>
      <div>AddPrize</div>
      <div>
        <input
          placeholder="Prize"
          onChange={(e) => {
            setPrize(e.target.value);
          }}
          value={prize}
        />
        <button
          onClick={() => {
            addPrize();
          }}
        >
          Add Prize
        </button>
      </div>
    </>
  );
}
