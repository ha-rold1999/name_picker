/* eslint-disable react/prop-types */

import { useState } from "react";
import Confetti from "react-confetti";
import { Payload } from "./Data";
import { SaveWinner } from "./Util/Database";

export default function Winner({
  winner,
  setShowWinner,
  prize,
  setWon,
  setWinner,
  reset,
}) {
  const data = JSON.parse(localStorage.getItem("activeList"));
  const [names, setName] = useState([...data]);

  const restart = () => {
    // before restart, save the 'winner' in the database
    // TODO: call upload function
    SaveWinner(winner.id, prize);
    setName((names) => {
      // Use the previous state to avoid potential issues with async updates
      // const updatedNames = names.filter((name) => name.Id !== winner.Id);
      const updatedNames = names.filter((name) => name.id !== winner.id);
      // Update local storage with the filtered names
      localStorage.setItem("activeList", JSON.stringify(updatedNames));
      winner.prize = prize;
      const winners = [
        ...JSON.parse(localStorage.getItem("winnersList")),
        winner,
      ];
      localStorage.setItem("winnersList", JSON.stringify(winners));

      return updatedNames;
    });
    // reset the winner
    // set the won to false
    setWon(false);
    setShowWinner(false);
    setWinner(undefined);
  };
  return (
    <>
      <Confetti />
      <div className="flex flex-col justify-center items-center space-y-1">
        <div className="text-2xl font-bold">{prize} Winner</div>
        <div className="text-7xl font-bold pb-8">
          {winner
            ? `${winner.firstName} ${winner.lastName}`
            : Payload.Event.Name}
        </div>
        <button
          className="bg-green-500 px-10 py-2 mt-[20px] text-lg text-white rounded-lg font-bold"
          onClick={() => restart()}
        >
          Next
        </button>
      </div>
    </>
  );
}
