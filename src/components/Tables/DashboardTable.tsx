"use client";
import React, { useState } from 'react';
import TableWrapper from './TableWrapper';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Link from 'next/link';
import { Tooltip } from '@mui/material';


interface DashboardTableProps {
  allData: any,
  data: any;
  value: string;
  setData: any;
  handleChange: (event: React.SyntheticEvent, newValue: string) => void;
  count: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (formData: any) => void;
  handleSearchChange?: (query: string) => void;
}

interface FormData {
  businessName: string;
  shortAddress: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  url: string;

}

const headings = [
  {
    id:1, 
    title: 'Business Name',
    key: 'businessName'
  },
  {
    id:2, 
    title: 'Short Address',
    key: 'shortAddress'
  },
  {
    id:3, 
    title: 'Email',
    key: 'email'
  },
  {
    id:4, 
    title: 'City',
    key: 'city'
  },
  {
    id:5, 
    title: 'State',
    key: 'state'
  },
  {
    id:6, 
    title: 'Zip',
    key: 'zip'
  },
  {
    id:7, 
    title: 'Phone',
    key: 'phone'
  },
  {
    id:8, 
    title: 'Url',
    key: 'url'
  }
];

export const DashboardTable = ({
  allData,
  data,
  value,
  handleChange,
  count,
  setData,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  handleSearchChange
}: DashboardTableProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<any>(null);
  const [selectedMenu, setSelectedMenu] = useState('defaultMenu');
  const ourHandler = (rowData: any) => {
    setFormData(rowData);
  };

  const onSubmit = (formData: FormData) => {
  }
  const filteredHeading = headings.filter((elm) => elm.key !== "phone" && elm.key !== "url")

  return (
    <TableWrapper
      isTabs
      tabOptions={['Restaurants', 'Wineries', 'Breweries']}
      value={value}
      handleChange={handleChange}
      count={count}
      setData={setData}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      handleSearchChange={handleSearchChange}
      placeholder={`Search ${value}...`}
    >
      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          {filteredHeading.map((heading, index) => (
            <div className="flex-none w-48 p-2.5 xl:p-5 text-white bg-[#3c4fe0]" key={index}>
              <h6 className="text-xs font-medium uppercase">{heading.title}</h6>
            </div>
          ))}
          <div className="flex-none w-48 p-2.5 xl:p-5 text-white " style={{ background: '#3c4fe0' }} >
            <h6 className="text-xs font-medium uppercase">action</h6>
          </div>

        </div>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
          </div>
        ) : (
          data.map((rowData: any, rowIndex: number) => (
            <div className="flex min-w-max border-b hover:bg-gray dark:hover:bg-gray-100 hover:text-black dark:hover:text-black" style={{ borderColor: '#e2e8f0' }} key={rowIndex}>
              {filteredHeading.map((heading, colIndex) => (
                <div
                  className="flex-none w-48 p-2.5 xl:p-5"
                  key={`${rowIndex}-${colIndex}`}
                >
                  <p className="text-xs truncate">{rowData[heading.key]}</p>
                </div>
              ))}
              <div className="flex w-48 p-2.5 xl:pl-4 gap-3">
                <Link href={{
                  pathname: `forms/edit-form`, query: {
                    value: value,
                    id: rowData?.id
                  }
                }}>
                  <Tooltip title="Edit" placement="left">
                    <ModeEditOutlineOutlinedIcon className='cursor-pointer' onClick={() => ourHandler(rowData)} />
                  </Tooltip>
                </Link>
                <Link href="/forms/menu-form">
                  <Tooltip title="Add menu" placement="right">
                    <MenuBookOutlinedIcon />
                  </Tooltip>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </TableWrapper >

  );
};
