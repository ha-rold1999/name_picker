import React from "react";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { GetWinners } from "./Util/Database";

export default function ExcelExport() {
  const winners = JSON.parse(localStorage.getItem("winnersList"));

  const filetype =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    let winnersFromAPI = await GetWinners();
    //console.log(winnersFromAPI);
    //const ws = XLSX.utils.json_to_sheet(winners);
    const ws = XLSX.utils.json_to_sheet(winnersFromAPI);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: filetype });
    FileSaver.saveAs(data, "winners" + fileExtension);
  };

  return (
    <button
      onClick={() => {
        exportToExcel();
      }}
    >
      Download Winners
    </button>
  );
}
