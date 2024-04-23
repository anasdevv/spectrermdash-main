import React from 'react';
import TableWrapper from './TableWrapper';
interface TableProps {
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
        title: 'Email',
        key: 'email'
    },
    {
        id: 4,
        title: 'City',
        key: 'city'
    }
]

const DiningTable: React.FC<TableProps> = ({ data, count, page, onPageChange, rowsPerPage, onRowsPerPageChange, handleSearchChange }) => {
    return (
        <TableWrapper
            title='Dining'
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            setData={data}
            handleSearchChange={handleSearchChange}
            placeholder='Search Dining...'
        >
            <div className="overflow-x-auto w-full">
                <div className="flex min-w-max w-full">
                    {headings.map((heading, index) => (
                        <div className="flex-none w-[20%] p-2.5 xl:p-5 bg-[#3c4fe0] text-white" key={index}>
                            <h6 className="text-xs font-medium uppercase">{heading.title}</h6>
                        </div>
                    ))}
                    <div className="flex-none w-[20%] p-2.5 xl:p-5 bg-[#3c4fe0] text-white">
                        <h6 className="text-xs font-medium uppercase">Category</h6>
                    </div>

                </div>

                {data.map((rowData, rowIndex) => (
                    <div className="flex min-w-max border-b cursor-pointer hover:bg-gray dark:hover:bg-gray-100 hover:text-black dark:hover:text-black " style={{ borderColor: '#e2e8f0' }} key={rowIndex}>
                        {headings.map((heading, colIndex) => (
                            <div
                                className="flex-none w-[20%] p-2.5 xl:p-5"
                                key={`${rowIndex}-${colIndex}`}
                            >
                                <p className="text-xs truncate">{rowData[heading.key]}</p>
                            </div>
                        ))}
                        <div className="flex-none w-48 p-2.5 xl:p-5 ml-2" >
                            <p className="text-xs truncate">Catering</p>
                        </div>
                    </div>
                ))}
            </div>
        </TableWrapper>
    );
};

export default DiningTable;
