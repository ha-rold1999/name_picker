import React from "react";
import Prizes from "./Prizes";
import AddPrize from "./AddPrize";
import { Payload } from "./Data";

export default function Menu({
  setAddPrize,
  addPrize,
  setPrize,
  setLimit,
  durations,
  prizes,
  names,
  setRefresh,
  refresh,
}) {
  const saveData = () => {
    localStorage.setItem("activeList", JSON.stringify(Payload.Attendees));
    localStorage.setItem("winnersList", JSON.stringify([]));
    localStorage.setItem("prizeList", JSON.stringify([]));
  };

  return (
    <div className="h-full w-full">
      <div className="flex justify-end p-4 h-1/6 space-x-2">
        <button
          onClick={() => {
            setAddPrize(!addPrize);
          }}
          className="bg-green-500 rounded-lg p-2 text-white"
        >
          {!addPrize ? "Add Prize" : "Go back to menu"}
        </button>
        <button
          onClick={() => {
            saveData();
          }}
          className="bg-yellow-300 p-2 rounded-lg"
        >
          Get Attendies
        </button>
      </div>

      {!addPrize ? (
        <div className=" h-5/6 w-full justify-center items-center flex-col flex">
          <Prizes
            setPrize={setPrize}
            setLimit={setLimit}
            durations={durations}
            prizes={prizes}
            attendies={names.length}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </div>
      ) : (
        <AddPrize />
      )}
    </div>
  );
}
