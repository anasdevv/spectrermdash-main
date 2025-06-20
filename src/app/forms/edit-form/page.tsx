"use client";
import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import { GetAllData, GetSingleData, UpdateSingleDoc } from "@/Networkcalls/ServerReq";

interface EditFormComponentProps {
  onSubmit: (formData: Record<string, string | null>) => void;
}
interface MenuItem {
  name: string;

}
const EditForm = ({ onSubmit }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [menu, setMenus] = useState<MenuItem[]>([]);
  const [Error, setError] = useState<any>("");
  const [data, setData] = useState<
    {
      businessName?: string;
      shortAddress?: string;
      zip?: string;
      email?: string;
      state?: string;
      city?: string;
      phone?: string;
      url?: string
    } | null>({
      businessName: "",
      shortAddress: "",
      zip: "",
      email: "",
      state: "",
      city: "",
      phone: "",
      url: ""
    });
  const category: any = searchParams.get("value");
  const categoryId: any = searchParams.get("id");
  const [saveRestaurantDetailsLoading, setSaveRestaurantDetailsLoading] =
    useState(false);

  const getData = useCallback(async () => {
    try {
      const response: any = await GetSingleData(
        category,
        categoryId
      );
      const { businessName, shortAddress, zip, email, state, city, phone, url } = response;
      setData({
        businessName: businessName || "",
        shortAddress: shortAddress || "",
        zip: zip || "",
        email: email || "",
        state: state || "",
        city: city || "",
        phone: phone || "",
        url: url || ""
      });

    } catch (err) {
    } finally {
    }
  }, [category, categoryId]);

  useEffect(() => {
    getData();
  }, [getData]);
  const [loader, setLoader] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getMenus = async () => {
      try {
        setLoader(true);
        const response: any = await GetAllData("TopMenus");

        let arr: any = [];
        response.forEach((doc: any) => {
          arr.push(doc.data());
        });

        setMenus(arr);
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    };

    getMenus();
  }, []);

  const handleSaveResturantDetails = useCallback((
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setSaveRestaurantDetailsLoading(true);
    setError("");
    if (!category || !categoryId) return
    try {
      UpdateSingleDoc(category, categoryId, {
        ...data,
        category: category,
      }).then(() => {
        setSaveRestaurantDetailsLoading(false);
        router.push("/dashboard");
      });
      router.push("/dashboard")
    } catch (error: any) {
      setError(error);
      setSaveRestaurantDetailsLoading(false);
    }
  }, [category, categoryId, data, router]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add menu" />
      <div className="grid w-full gap-9 sm:grid-cols-1 lg:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="text-center font-medium text-black dark:text-white">
                Edit Restaurant
              </h3>
            </div>
            <form>
              <div className="col-span-5 xl:col-span-2">
                <div className=" bg-white  dark:bg-boxdark">
                  <div className="p-5">
                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </span>
                        <p>
                          <span className="text-primary">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                        <p>(max, 800 X 800px)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6.5 ">
                <div className="mb-7 flex w-full">
                  <div className="w-full">
                    <label className="text-sm font-medium capitalize text-black dark:text-white ">
                      {"City"}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={data?.city}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="ml-4 w-full">
                    <label className="text-sm font-medium capitalize text-black dark:text-white ">
                      {"Business Name"}
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={data?.businessName}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-7 flex w-full">
                  <div className="w-full">
                    <label className="text-sm font-medium capitalize text-black dark:text-white ">
                      {"Short Address"}
                    </label>
                    <input
                      type="text"
                      name="shortAddress"
                      value={data?.shortAddress}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="ml-4 w-full">
                    <label className="text-sm font-medium capitalize text-black dark:text-white ">
                      {"State"}
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={data?.state}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-7 flex w-full">
                  <div className="w-full">
                    <label className="text-sm font-medium capitalize text-black dark:text-white ">
                      {"Zip"}
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={data?.zip}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="ml-4 w-full">
                    <label className="text-sm font-medium capitalize text-black dark:text-white ">
                      {"Email"}
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={data?.email}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-7 flex w-full">
                  <div className="w-full">
                    <label className="text-sm font-medium capitalize text-black dark:text-white ">
                      {"Phone"}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={data?.phone}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="ml-4 w-full">
                    <label className="text-sm font-medium capitalize text-black dark:text-white ">
                      {"Url"}
                    </label>
                    <input
                      type="text"
                      name="url"
                      value={data?.url}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  {menu.length > 0 &&
                    menu.map((item, index) => (
                      <div
                        key={index}
                        className={`mr-4 flex flex-col items-center justify-center ${selectedBox === index ? "selected" : ""}`}
                      >
                        <div className="hover:pointer  flex h-15 w-15 items-center justify-center rounded-full border border-stroke bg-[#8fd0ef] hover:bg-gray dark:border-strokedark dark:bg-boxdark dark:hover:bg-white">
                          <DinnerDiningOutlinedIcon
                            className={selectedBox === index ? "selected" : ""}
                            style={{
                              color:
                                selectedBox === index ? "#FF0000" : "#000000",

                            }}
                          />
                        </div>
                        <p>{item.name}</p>
                      </div>
                    ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={handleSaveResturantDetails}
                    className="mt-5 rounded bg-primary px-6 py-3 text-white hover:bg-opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditForm;
