import * as XLSX from "xlsx";
import * as React from "react";

// import { db } from "../firebaseConfig";
import { DocumentData, QuerySnapshot, Timestamp } from "firebase/firestore";
import { AddSingleDoc } from "@/Networkcalls/ServerReq";
import { QueryBusinesses } from "@/Networkcalls/AdminReq";

export const BusinessAlreadyExists = async (
  collections: string,
  restaurantData: DocumentData,
) => {
  try {
    console.log("called");
    const businesses = (await QueryBusinesses(
      collections,
      restaurantData["BUSINESS"],
      restaurantData["ADDRESS"],
    )) as QuerySnapshot<DocumentData, DocumentData>;
    console.log("bussiness ", businesses);
    return !businesses.empty;
  } catch (error) {
    console.log("RestaurantAlreadyExists error: " + error);
    return false;
  }
};

const ImportExcel = ({
  collections,
  apiData,
  setData,
  onSuccess,
}: {
  collections: string;
  apiData: DocumentData[];
  setData: any;
  onSuccess: () => void;
}) => {
  const [Loading, setLoading] = React.useState(false);
  const [TotalCount, setTotalCount] = React.useState(0);
  const [CurrentCount, setCurrentCount] = React.useState(0);

  const allowedExtensions = [
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (!e?.target?.files || !e?.target?.files[0]) return;

    const reader = new FileReader();
    reader.readAsBinaryString(e?.target?.files[0]);
    reader.onload = async (e) => {
      const data = e?.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      console.log("workbook ", workbook);
      setLoading(true);

      var importData: any = [];

      for (const sheetName of workbook.SheetNames) {
        if (sheetName !== "Chained Restaurants" && sheetName !== "Count") {
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);

          importData = importData.concat(parsedData);
        }
      }
      console.log("id ", importData);
      if (importData.length) {
        setTotalCount(importData.length);

        var importCount = 0;
        var skippedCount = 0;
        var i = 1;
        for (const restaurantData of importData) {
          setCurrentCount(i);
          console.log(restaurantData);
          const restaurantExists = await BusinessAlreadyExists(
            collections,
            restaurantData,
          );
          console.log(restaurantExists);
          if (!restaurantExists) {
            // add phone prefix, if not provided
            var phone = restaurantData["PHONE"] ?? "";
            if (phone != "" && !phone.startsWith("1 ")) phone = "1 " + phone;

            const currentTimestamp = Timestamp.fromDate(new Date());

            const restaurantId = await AddSingleDoc(collections, {
              businessName: restaurantData["BUSINESS"] ?? "",
              shortAddress: restaurantData["ADDRESS"] ?? "",
              address:
                restaurantData["ADDRESS"] +
                ", " +
                restaurantData["CITY"] +
                ", " +
                restaurantData["STATE"] +
                " " +
                restaurantData["ZIP"] +
                ", United States",
              city: restaurantData["CITY"] ?? "",
              phone: phone ?? "",
              state: restaurantData["STATE"] ?? "",
              url: restaurantData["WEBSITE"] ?? "",
              zip: restaurantData["ZIP"] ?? "",
              createdAt: currentTimestamp,
              updatedAt: currentTimestamp,
            });

            importCount++;
            console.log(importCount);
          } else {
            skippedCount++;
          }

          i++;
        }

        setLoading(false);

        var importStatusMessage = "Imported " + importCount + " items";
        if (skippedCount > 0)
          importStatusMessage += " (skipped " + skippedCount + " items)";
        alert(importStatusMessage);

        onSuccess();
      } else {
        alert("Nothing to import");
      }
    };
    // just to make sure if same file is uploaded after editing , change handler is called
    e.target.value = "";
  };

  return (
    <div className="flex w-1/5">
      <label
        htmlFor="import-csv"
        className="translate  flex w-full transform justify-center rounded-md border border-primary bg-primary px-9 py-3 text-center font-medium text-white transition duration-500 hover:scale-90"
      >
        {Loading
          ? CurrentCount > 0
            ? CurrentCount + "/" + TotalCount
            : "In progress"
          : "Import"}
      </label>
      <input
        type="file"
        name="file"
        // accept=".xlxs"
        className="hidden w-1"
        onChange={changeHandler}
        style={{ display: "block", visibility: "hidden" }}
        id="import-csv"
      />
    </div>
  );
};

export default ImportExcel;
