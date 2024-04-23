import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TeamTwo from "@/components/Teams/TeamTwo";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Teams | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Teams page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Team: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Teams" />

      <div className="flex flex-col gap-7.5">

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
            <h3 className="font-medium text-black dark:text-white">Our team</h3>
          </div>

          <div className="p-4 sm:p-6 xl:p-9 2xl:p-15">
            <TeamTwo />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Team;
