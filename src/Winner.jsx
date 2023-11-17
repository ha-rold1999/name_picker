/* eslint-disable react/prop-types */

import { useState } from "react";
import Confetti from "react-confetti";

export default function Winner({ winner, setWon, prize, reset }) {
  const data = JSON.parse(localStorage.getItem("activeList"));
  const [names, setName] = useState([...data]);

  const restart = () => {
    setName((names) => {
      // Use the previous state to avoid potential issues with async updates
      const updatedNames = names.filter((name) => name.Id !== winner.Id);

      // Update local storage with the filtered names
      localStorage.setItem("activeList", JSON.stringify(updatedNames));
      const winners = [
        ...JSON.parse(localStorage.getItem("winnersList")),
        winner,
      ];
      localStorage.setItem("winnersList", JSON.stringify(winners));

      return updatedNames;
    });
    // reset the winner
    reset();
    // set the won to false
    setWon(false);
  };
  return (
    <>
      <Confetti />
      <div className="flex flex-col justify-center items-center space-y-1">
        <div className="text-2xl font-bold">{prize} Winner</div>
        <div className="text-7xl font-bold pb-8">
          {winner.FirstName} {winner.LastName}
        </div>
        <button
          className="bg-green-500 px-10 py-2 mt-[20px] text-lg text-white rounded-lg font-bold"
          onClick={() => restart()}>
          Next
        </button>
      </div>
    </>
  );
}
