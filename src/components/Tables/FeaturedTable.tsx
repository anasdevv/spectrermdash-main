import React from 'react';
import TableWrapper from './TableWrapper';
interface TableProps {
    title: string;
    data: any[];
    count: number;
    page: number;
    onPageChange: (event: unknown, newPage: number) => void;
    rowsPerPage: number;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearchChange: any
}

const headings = [
    {
        id: 1,
        title: 'Business Name',
        key: 'businessName'
    },
    {
        id: 2,
        title: 'Short Address',
        key: 'shortAddress'
    },
    {
        id: 3,
        title: 'City',
        key: 'city'
    },
    {
        id: 4,
        title: 'State',
        key: 'state'
    },
    {
        id: 5,
        title: 'Zip',
        key: 'zip'
    },
    {
        id: 6,
        title: 'Email',
        key: 'email'
    },
];

const FeaturedTable: React.FC<TableProps> = ({ title, data,
    count,
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange, handleSearchChange }) => {
    const numberOfColumns = headings.length;
    return (
        <TableWrapper
            title='Subscriptions'
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            setData={data}
            handleSearchChange={handleSearchChange}
            placeholder='Search Subscriptions...'
        >
            <div className="overflow-x-auto">
                <div className="flex min-w-max">
                    {headings.map((heading, index) => (
                        <div className="flex-none  text-white  w-48 p-2.5 xl:p-5" style={{ background: '#3c4fe0' }} key={index}>
                            <h6 className="text-xs font-medium uppercase">{heading.title}</h6>
                        </div>
                    ))}
                    <div className="flex-none w-48 p-2.5 xl:p-5 text-white" style={{ background: '#3c4fe0' }} >
                        <h6 className="text-`xs font-medium uppercase">Packages</h6>
                    </div>
                    <div className="flex-none w-48 p-2.5 xl:p-5 text-white " style={{ background: '#3c4fe0' }} >
                        <h6 className="text-xs font-medium uppercase">Start-Date</h6>
                    </div> <div className="flex-none w-48 p-2.5 xl:p-5 text-white " style={{ background: '#3c4fe0' }} >
                        <h6 className="text-xs font-medium uppercase">End-Date</h6>
                    </div>
                </div>

                {data.map((rowData, rowIndex) => (
                    <div className="flex min-w-max border-b cursor-pointer hover:bg-gray dark:hover:bg-gray-100 hover:text-black dark:hover:text-black " style={{ borderColor: '#e2e8f0' }} key={rowIndex}>
                        {headings.map((heading, colIndex) => (
                            <div className="flex-none w-48 p-2.5 xl:p-5 " key={`${rowIndex}-${colIndex}`}>
                                <p className="text-xs truncate ">{rowData[heading.key]}</p>
                            </div>
                        ))}
                        <div className="flex   w-48 p-2.5 xl:pl-4">
                            <p
                                className="inline-flex items-center justify-center rounded-md border   px-4 text-center font-medium text-black hover:bg-opacity-90 "
                                style={{ borderColor: '#1c2434' }}
                            >
                                basic
                            </p>
                        </div>
                        <div className="flex-none w-48 p-2.5 xl:p-5" >
                            <p className="text-xs truncate">10-18-2023</p>
                        </div>
                        <div className="flex-none w-48 p-2.5 xl:p-5" >
                            <p className="text-xs truncate">10-9-2023</p>
                        </div>
                    </div>

                ))}

            </div>

        </TableWrapper>

    );
}; export default FeaturedTable;
