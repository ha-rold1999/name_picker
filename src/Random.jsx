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
  setIsStartRaffle,
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
                setIsStartRaffle(false);
              }}
              className="border-2 border-white p-3 rounded-lg text-white"
              disabled={!(!isStart && !won)}
            >
              Set New Pize
            </button>
          </div>

          <div className="w-full pt-16 flex justify-center items-center flex-col ">
            <div className="bg-white py-2 px-4 rounded-sm flex items-center flex-col drop-shadow-xl mb-10">
              <div className="text-green text-xs">Raffle Prize</div>
              <div className="text-2xl font-bold text-green">{prize}</div>
            </div>
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
