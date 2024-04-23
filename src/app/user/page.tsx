"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import UsersTable from '@/components/Tables/UserTable';
import Loader from '@/components/common/Loader';
import { GetAllData } from '@/Networkcalls/ServerReq';

interface UserData {
    businessName: string,
    user_email: string;
    user_favourites: string[];
    user_fullname: string;
    user_id: string;
    user_pass: string;
    user_role: string;
}
const Users: React.FC = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredData, setFilteredData] = useState<UserData[]>([]);



    useEffect(() => {
        const getData = async () => {
            try {
                const response: any = await GetAllData('Users');
                let arr: any = [];
                response.forEach((doc: any) => {
                    arr.push(doc.data());
                });
                setData(arr);
                setFilteredData(arr);
            } catch (err) {
            }
        };

        getData();
        setTimeout(() => setLoading(false), 1000);
    }, []);
    const handleSearchChange = useCallback((query: string) => {
        const lowerQuery = query.toLowerCase();

        const filtered = data.filter((item: any) => item?.user_email?.toLowerCase().includes(lowerQuery));
        setFilteredData(filtered);
    }, [data]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Users" />
            {(!loading && data) ?
                <div className="flex flex-col gap-10">

                    <UsersTable
                        data={filteredData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                        )}
                        count={filteredData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        handleSearchChange={handleSearchChange}
                    />
                </div>

                : <Loader />
            }
        </DefaultLayout>
    );
};

export default Users;
