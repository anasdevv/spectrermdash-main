"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import DailySpecials from '@/components/Tables/DailySpecialsTable';
import Loader from '@/components/common/Loader';
import { GetAllData } from '@/Networkcalls/ServerReq';

interface UserData {
    businessName: string;
    shortAddress: string;
    city: string;
    state: string;
    zip: string;
    email: string;
}

const Users: React.FC = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response: any = await GetAllData('Restaurants');
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

        const filtered = data.filter((item: any) => item?.businessName?.toLowerCase().includes(lowerQuery));
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
            <Breadcrumb pageName="Daily Specials" />
            {(!loading && filteredData) ?
                <div className="flex flex-col gap-10">
                    <DailySpecials
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
