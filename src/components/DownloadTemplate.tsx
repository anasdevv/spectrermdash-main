import { capitalizeFileName, filenames } from "@/utils/helper";
import Modal from "./Modal";
import Link from "next/link";
import { Suspense } from "react";
const Loading = () => <button>Loading</button>;
const DownloadTemplate = () => {
  return (
    <Modal heading="Download County Data">
      <div className="mx-auto flex h-full gap-6 py-6">
        {[...Array(Math.ceil(filenames.length / 3))].map((_, columnIndex) => (
          <div key={columnIndex} className="flex flex-col space-y-5">
            {filenames
              .slice(columnIndex * 3, columnIndex * 3 + 3)
              .map((f, index) => (
                <Link
                  key={index}
                  className="rounded-md bg-primary px-9 py-3 font-medium text-white"
                  href={`/download/${f}`}
                >
                  {capitalizeFileName(f)}
                </Link>
              ))}
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default DownloadTemplate;
