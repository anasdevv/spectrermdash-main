import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { DocumentData } from "firebase/firestore";

export const ExportToExcel = ({
  apiData,
  fileName,
  name = "Export",
}: {
  apiData: DocumentData[];
  fileName: string;
  name?: string;
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: DocumentData[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="translate  flex w-1/5 transform justify-center rounded-md border border-primary bg-primary px-9 py-3 text-center font-medium text-white transition duration-500 hover:scale-90"
      onClick={() => exportToCSV(apiData, fileName)}
    >
      {name}
    </button>
  );
};
