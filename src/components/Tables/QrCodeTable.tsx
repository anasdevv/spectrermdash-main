import { TablePagination } from '@mui/material';
import React from 'react';
import QrCodeWrapper from './QrCodeWrapper';
interface TableProps {
    title?: string;
    businessNames: any;
    qrData: any[];
    count: number;
    page: number;
    data: any[];
    onPageChange: (event: unknown, newPage: number) => void;
    rowsPerPage: number;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearchChange: any
}

const headings = [
    {
        id: 1,
        title: "Title",
        key: "title"
    },
    {
        id: 2,
        title: "Description",
        key: "description"
    },
    {
        id: 3,
        title: "Business Name",
        key: "businessName"
    },
    {
        id: 4,
        title: "Email",
        key: "email"
    },
    {
        id: 5,
        title: "Start Date",
        key: "startDate"
    },
    {
        id: 6,
        title: "End Date",
        key: "endDate"
    },
    {
        id: 7,
        title: "Status",
        key: "status"
    },
]

const FeaturedTable: React.FC<TableProps> = ({ qrData,
    count,
    page,
    businessNames,
    onPageChange,
    rowsPerPage,
    data,
    onRowsPerPageChange, }) => {
    const filteredHeadings = headings.filter(item => item.key !== "shortAddress" && item.key !== "city")

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            <QrCodeWrapper title='Qr Code' businessNames={businessNames} >

                <div className="overflow-x-auto">
                    <div className="flex min-w-max ">
                        {filteredHeadings.map((heading, index) => (
                            <div className="flex-none  text-white  w-48 p-2.5 xl:p-5" style={{ background: '#3c4fe0' }} key={index}>
                                <h6 className="text-xs font-medium uppercase">{heading.title}</h6>
                            </div>
                        ))}
                    </div>

                    {qrData.map((rowData, rowIndex) => (
                        <div className="flex min-w-max border-b cursor-pointer hover:bg-gray dark:hover:bg-gray-100 hover:text-black dark:hover:text-black " style={{ borderColor: '#e2e8f0' }} key={rowIndex}>
                            {headings.map((qrheadings, colIndex) => (
                                <div className="flex-none w-48 p-2.5 xl:p-5 " key={`${rowIndex}-${colIndex}`}>
                                    <p className="text-xs truncate ">{rowData[qrheadings.key]}</p>
                                </div>
                            ))}
                        </div>

                    ))}

                </div>
                <TablePagination
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={onPageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </QrCodeWrapper>
        </div>

    );
}; export default FeaturedTable;
