import React from "react";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import download from "./assets/downloads.png";

export default function ExcelExport() {
  const winners = JSON.parse(localStorage.getItem("winnersList"));

  const filetype =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(winners);
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
      className="flex justify-center items-center bg-secondary p-2 rounded-md space-x-2"
    >
      <img src={download} className="w-5" />
      <div className="text-white">Download Winners</div>
    </button>
  );
}
