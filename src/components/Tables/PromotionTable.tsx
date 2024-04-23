import React from 'react';
import MenuSelect from '../ButtonsGroups/MenuSelect';
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
    { id: 1, title: 'Business Name', key: 'businessName' },
    { id: 2, title: 'Short Address', key: 'shortAddress' },
    { id: 3, title: 'City', key: 'city' },
]

const RewardTable: React.FC<TableProps> = ({ title, data, count,
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    handleSearchChange
}) => {
    const filteredHeadings = headings.filter(item => item.key !== "title" && item.key !== "description")
    const numberOfColumns = headings.length;

    return (
        <TableWrapper
            title='Promotions'
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            setData={data}
            handleSearchChange={handleSearchChange}
            placeholder='Search Promotions...'
        >
            <div className="overflow-x-auto w-full">
                <div className="flex min-w-full w-full">
                    {filteredHeadings.map((heading, index) => (
                        <div className="flex-none w-[30%] p-2.5 xl:p-5 bg-[#3c4fe0] text-white" key={index}>
                            <h6 className="text-xs font-medium uppercase">{heading.title}</h6>
                        </div>
                    ))}

                    <div className="flex-none w-48 p-2.5 xl:p-5 text-white " style={{ background: '#3c4fe0' }} >
                        <h6 className="text-xs font-medium uppercase">Status</h6>


                    </div>
                </div>

                {data.map((rowData, rowIndex) => (
                    <div className="flex min-w-max border-b cursor-pointer hover:bg-gray dark:hover:bg-gray-100 hover:text-black dark:hover:text-black " style={{ borderColor: '#e2e8f0' }} key={rowIndex}>
                        {filteredHeadings.map((heading, colIndex) => (
                            <div className="flex-none w-[30%] p-2.5 xl:p-5" key={`${rowIndex}-${colIndex}`}>
                                <p className="text-xs truncate ">{rowData[heading.key]}</p>
                            </div>
                        ))}
                        <MenuSelect rowID={rowData.id} status={rowData.status} />

                    </div>

                ))}

            </div>
        </TableWrapper>

    );
}; export default RewardTable;
