import React from "react";
import Prizes from "./Prizes";
import AddPrize from "./AddPrize";
import { Payload } from "./Data";
import { FetchDatabase } from "./Util/Database";
import ExcelExport from "./ExcelExport";
import fsLogo from "./assets/fs-logo-white.png";
import people from "./assets/user.png";
import refreshIcon from "./assets/sync.png";
import add from "./assets/plus.png";
import Swal from "sweetalert2";

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
  setGetNames,
  prize,
  limiter,
  setIsStartRaffle,
}) {
  const saveData = async () => {
    // fetch data from database
    let payload = await FetchDatabase();
    // console.log(`Retrieved from API: ${JSON.stringify(payload)}`);
    localStorage.setItem("activeList", JSON.stringify(payload.attendees));
    localStorage.setItem("winnersList", JSON.stringify([]));
    localStorage.setItem("prizeList", JSON.stringify([]));
  };

  const refreshList = () => {
    const list = localStorage.getItem("activeList");
    const winners = localStorage.getItem("winnersList");

    const newList = [];
    // ensure when refreshed, remove the property 'prize'
    JSON.parse(winners).forEach((w) => {
      let new_w = w;
      delete new_w["prize"];
      newList.push(new_w);
    });

    const refreshList = [...JSON.parse(list), ...newList];

    localStorage.setItem("activeList", JSON.stringify(refreshList));
    localStorage.setItem("winnersList", JSON.stringify([]));
    setRefresh(!refresh);
  };

  const confirmRefresh = () => {
    Swal.fire({
      title: "Refresh List?",
      text: "Add all the winners back to list",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFAD33",
      cancelButtonColor: "#888888",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        refreshList();
      }
    });
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center p-4 space-x-2">
        <div className="flex items-center space-x-2">
          <img src={fsLogo} className="w-28" />
          <div className="text-xl font-bold text-white">RAFFLE</div>
        </div>

        <div className="w-full flex justify-end space-x-2">
          <button
            onClick={() => {
              setAddPrize(!addPrize);
            }}
            className="bg-green-500 rounded-lg p-2 text-white bg-orange"
          >
            {!addPrize ? (
              <div className="flex space-x-2 justify-center items-center">
                <img src={add} className="w-4 h-4" />
                <div>Add Prize</div>
              </div>
            ) : (
              "Select Prize"
            )}
          </button>

          <ExcelExport />
        </div>
      </div>
      <div className="px-4">
        {names.length === 0 ? (
          <button
            onClick={() => {
              saveData();
              setGetNames(true);
            }}
            className="bg-secondary p-2 rounded-md flex space-x-2"
          >
            <img src={people} className="w-7" />
            <div className="text-white">Retrieve Attendees</div>
          </button>
        ) : (
          <div className="rounded-md flex space-x-2">
            <div className="flex bg-secondary p-2 rounded-md">
              <img src={people} className="w-7" />
              <div className="text-white">{names.length} attendees</div>
            </div>
            <button
              onClick={() => {
                confirmRefresh();
              }}
            >
              <img src={refreshIcon} className="w-7" />
            </button>
          </div>
        )}
        {/*  */}
      </div>

      {!addPrize ? (
        <div className="w-full justify-center items-center flex-col flex">
          <Prizes
            setPrize={setPrize}
            setLimit={setLimit}
            durations={durations}
            prizes={prizes}
            attendies={names.length}
            setRefresh={setRefresh}
            refresh={refresh}
            prize={prize}
            limiter={limiter}
            setIsStartRaffle={setIsStartRaffle}
          />
        </div>
      ) : (
        <AddPrize />
      )}
    </div>
  );
}
