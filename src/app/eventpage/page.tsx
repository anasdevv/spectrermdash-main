"use client";
import React, { useState, useEffect, useCallback } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import SubscriptionTable from "@/components/Tables/SubscriptionTable";
import QrCodeTable from "@/components/Tables/QrCodeTable";
import CardDataStats from "@/components/CardDataStats";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import Loader from "@/components/common/Loader";
import { GetAllData } from "@/Networkcalls/ServerReq";
import dynamic from 'next/dynamic'
import Promotion from '@/components/Tables/Promotion'

const ChartOne = dynamic(() => import('@/components/Charts/ChartOne'), {
    ssr: false,
})

interface RestaurantData {
    title: string;
    description: string;
    businessName: string;
    shortAddress: string;
    city: string;
    email: string;
}

interface QrData {
    title: string;
    description: string;
    businessName: string;
    email: string;
    startDate: string;
    endDate: string;
    status: string;
}

const Featured: React.FC = () => {
    const [data, setData] = useState([])
    const [qrData, setQrData] = useState<QrData[] | []>([]);
    // const [proData, setProData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredData, setFilteredData] = useState([]);

    const handleSearchChange = useCallback((query: string) => {
        const lowerQuery = query.toLowerCase();

        const filtered = data.filter((item: any) => item?.businessName?.toLowerCase().includes(lowerQuery));
        setFilteredData(filtered);
    }, [data]);

    let businessNames = data?.map(({ businessName }) => {
        return businessName
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const response: any = await GetAllData("Restaurants");

                let arr: any = [];
                response.forEach((doc: any) => {
                    arr.push(doc.data());
                });
                setData(arr);
                setFilteredData(arr);
                // setProData(arr)

            } catch (err) {
            }
        };

        getData();
        setTimeout(() => setLoading(false), 1000);
    }, []);



    useEffect(() => {
        const getData = async () => {
            try {
                const response: any = await GetAllData("QRCode");

                let arr: QrData[] = [];
                response.forEach((doc: any) => {
                    arr.push(doc.data());
                });


                setQrData(arr)
                setQrData(arr)
            } catch (error) {
                throw error;
            }
        };

        getData();
    }, []);
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
            <Breadcrumb pageName="Events" />
            {(!loading && filteredData) ?

                <div className="flex flex-col gap-10">
                    <SubscriptionTable
                        title={""}
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

            {data && (
                <Promotion />
            )}

            <div className="mt-4 grid grid-cols-12 gap-4  md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="items-center h-[100%] col-span-12 gap-4 md:col-span-9">
                    <ChartOne />

                </div>
                <div className="items-center col-span-12 gap-4 md:col-span-3">
                    <CardDataStats title="Total loyalty points" total="100,000" rate="0.43%" levelUp>
                        <LoyaltyOutlinedIcon style={{ color: '#3c4de0' }} />
                    </CardDataStats>
                    <CardDataStats title="Total coin worth" total="$100" rate="4.35%" levelUp>
                        <ShoppingCartOutlinedIcon style={{ color: '#3c4de0' }} />
                    </CardDataStats>
                    <CardDataStats title="Available loyalty points" total="50,000" rate="2.59%" levelUp>
                        <AttachMoneyOutlinedIcon style={{ color: '#3c4de0' }} />
                    </CardDataStats>
                    <CardDataStats title="Used loyalty points" total="50,000" rate="2.59%" levelUp>

                        <SavingsOutlinedIcon style={{ color: '#3c4de0' }} />
                    </CardDataStats>
                </div>
            </div>
            {/* <Reward /> */}
            {(!loading && qrData) ?

                <div className="flex flex-col gap-10 mt-8">
                    <QrCodeTable
                        title={""}
                        // headings={qrheadings}
                        qrData={qrData && qrData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                        )}
                        data={qrData}
                        businessNames={businessNames}
                        count={qrData && qrData.length}
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
    )
};

export default Featured;
