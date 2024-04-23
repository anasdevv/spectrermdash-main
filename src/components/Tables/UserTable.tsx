import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableWrapper from './TableWrapper';
import Link from 'next/link';

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
    title: 'Email',
    key: 'user_email'
 },
    {
        id: 2, 
        title: 'Favourites',
        key: 'user_favourites'
    },
    {
        id: 3, 
        title: 'Full Name',
        key: 'user_fullname'
    },
    {
        id: 4, 
        title: 'ID',
        key: 'user_id'
    },
    {
        id: 5, 
        title: 'Password',
        key: 'user_pass'
    },
    {
        id: 6, 
        title: 'Role',
        key: 'user_role'
    },
];

const UsersTable: React.FC<TableProps> = ({ data, count, page, onPageChange, rowsPerPage, onRowsPerPageChange, handleSearchChange }) => {

    return (
        <TableWrapper
            title='Users'
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            setData={data}
            handleSearchChange={handleSearchChange}
            placeholder='Search Users...'
        >
            <div className="overflow-x-auto">
                <div className="flex min-w-max">
                    {headings.map((heading, index) => (
                        <div className="flex-none w-48 p-2.5 xl:p-5 bg-[#3c4fe0] text-white" key={index}>
                            <h6 className="text-xs font-medium uppercase">{heading.title}</h6>
                        </div>
                    ))}
                    <div className="flex-none w-36 p-2.5 xl:p-5 bg-[#3c4fe0] text-white">
                        <h6 className="text-xs font-medium uppercase">View</h6>
                    </div>
                </div>

                {data.map((rowData, rowIndex) => (
                    <div className="flex min-w-max border-b cursor-pointer hover:bg-gray dark:hover:bg-gray-100 hover:text-black dark:hover:text-black " style={{ borderColor: '#e2e8f0' }} key={rowIndex}>
                        {headings.map((heading, colIndex) => (
                            <div
                                className="flex-none w-48 p-2.5 xl:p-5"
                                key={`${rowIndex}-${colIndex}`}
                            >
                                <p className="text-xs truncate">{rowData[heading.key]}</p>
                            </div>
                        ))}
                        <div className="flex-none w-36 px-2.5 xl:px-5">
                            <IconButton>
                                <Link href="/forms/user-form">
                                    <Tooltip title="view user" placement="right">

                                        <VisibilityIcon />
                                    </Tooltip>
                                </Link>
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
        </TableWrapper>
    );
};

export default UsersTable;
