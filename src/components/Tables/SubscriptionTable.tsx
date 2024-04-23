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
    handleSearchChange: (query: string) => void;
}

const headings = [
    {
        id: 1,
        title: 'Title',
        key: 'title'
    },
    {
        id: 2,
        title: 'Description',
        key: 'description'
    },
    {
        id: 3,
        title: 'Business Name',
        key: 'businessName'
    },
    {
        id: 4,
        title: 'Short Address',
        key: 'shortAddress'
    },
    {
        id: 5,
        title: 'City',
        key: 'city'
    },
    {
        id: 6,
        title: 'Email',
        key: 'email'
    },
]

const FeaturedTable: React.FC<TableProps> = ({ title, data,
    count,
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    handleSearchChange
}) => {
    const filteredHeadings = headings.filter(item => item.key !== "title" && item.key !== "description")
    return (
        <TableWrapper
            title='Events'
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            setData={data}
            handleSearchChange={handleSearchChange}
            placeholder='Search Events...'
        >
            <div className="overflow-x-auto w-full">
                <div className="flex min-w-max w-full">
                    {filteredHeadings.map((heading, index) => (
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
                        {filteredHeadings.map((heading, colIndex) => (
                            <div className="flex-none w-48 p-2.5 xl:p-5 " key={`${rowIndex}-${colIndex}`}>
                                <p className="text-xs truncate ">{rowData[heading.key]}</p>
                            </div>
                        ))}
                        <div className="flex   w-48 p-2.5 xl:pl-4">
                            <p
                                className="inline-flex items-center justify-center rounded-md border h-4   px-15 "
                                style={{ borderColor: '#1c2434', background: '#3c4ee0' }}
                            >

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
