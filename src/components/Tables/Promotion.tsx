import React, { useState, useEffect, useCallback } from 'react';
import PromotionTable from '@/components/Tables/PromotionTable'
import { GetAllData } from '@/Networkcalls/ServerReq';

interface RestaurantData {

    businessName: string;
    shortAddress: string;
    city: string;


}

const Reward: React.FC = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState([])

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
            } catch (err) {
            }
        };

        getData();
    }, []);
    const handleSearchChange = useCallback((query: string) => {
        const lowerQuery = query.toLowerCase();

        const filtered = data.filter((item: any) => item?.businessName?.toLowerCase().includes(lowerQuery));
        setFilteredData(filtered);
    }, [data]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {filteredData && (
                <div className="flex flex-col gap-10">
                    <PromotionTable
                        title={"Rewards"}
                        data={filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                        count={filteredData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        handleSearchChange={handleSearchChange}
                    />
                </div>
            )}
        </>
    );
};

export default Reward;
