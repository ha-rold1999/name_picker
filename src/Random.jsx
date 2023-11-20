import React from "react";
import Winner from "./Winner";
import Raffle from "./Raffle";

export default function Random({
  winner,
  setWinner,
  setShowWinner,
  prize,
  setWon,
  setPrize,
  setLimit,
  names,
  isStart,
  start,
  setIsStart,
  won,
  showWinner,
}) {
  return (
    <div className="flex justify-center items-center flex-col  h-full w-full">
      {showWinner ? (
        <Winner
          winner={winner}
          setWinner={setWinner}
          setShowWinner={setShowWinner}
          prize={prize}
          setWon={setWon}
        />
      ) : (
        <div className="flex items-center flex-col  h-full w-full">
          <div className="flex justify-end  w-full p-4">
            <button
              onClick={() => {
                setPrize("");
                setLimit(0);
              }}
              className="bg-red-500 p-3 rounded-lg text-white"
            >
              Set New Pize
            </button>
          </div>

          <div className="w-full h-full flex justify-center items-center flex-col">
            <div className="text-2xl font-bold">{prize}</div>
            {names.length > 0 ? (
              <Raffle
                winner={winner}
                isStart={isStart}
                start={start}
                setIsStart={setIsStart}
                won={won}
              />
            ) : (
              <div>No Participants</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
