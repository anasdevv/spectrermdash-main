"use client";

import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ButtonIconComponent from "@/components/ButtonsGroups/ButtonIcons";
import AmenityCard from "@/components/cards/AmenityCard";
import { AddSingleDoc, DeleteSingleData, GetAllData } from "@/Networkcalls/ServerReq";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "500px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
const Amenities = () => {
    const [amenityIndex, setAmenityIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loaderAddAmenity, setLoaderAddAmenity] = useState(false);
    const [data, setData] = useState([]);
    const [amenity, setAmenity] = useState({ name: "" });

    const getData = useCallback(async () => {
        try {
            setIsLoading(true);
            let arr: any = [];
            const response: any = await GetAllData("Amenities");
            response.forEach((doc: any) => {
                arr.push(doc.data());
            });
            arr.sort((a: any, b: any) => a.name?.localeCompare(b.name));
            setData(arr);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }, [setData,]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleRemove = useCallback(
        (amenityId: string) => {
            DeleteSingleData("Amenities", amenityId);
            const result = data?.filter(({ id }) => id !== amenityId);
            setData(result);
        },
        [data, setData],
    );

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setAmenity({ ...amenity, [name]: value });
        },
        [amenity],
    );
    const handleAddAmenity = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!amenity.name.trim()) {
                alert("Amenity name cannot be empty.");
                return;
            }
            setLoaderAddAmenity(true);
            AddSingleDoc("Amenities", { name: amenity.name.toLowerCase() })

                .then(() => {
                    setAmenity({ name: "" });
                    setLoaderAddAmenity(false);
                    getData();
                    setIsModalOpen(false);
                })
                .catch((error: any) => {
                    setLoaderAddAmenity(false);
                });
        },
        [amenity, getData],
    );
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Amenities" />

            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </div>
            ) : (
                <div className="w-full max-w-full bg-[#f1f5f9] shadow-default">
                    <form>
                        <Modal
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            aria-labelledby="add-Amenity-modal"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <form onSubmit={handleAddAmenity}>
                                    <TextField
                                        type="text"
                                        name="name"
                                        placeholder="Enter amenity name"
                                        value={amenity?.name || ""}
                                        onChange={handleOnChange}
                                        fullWidth
                                    />

                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="flex-end"
                                        marginTop={2}
                                    >
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={{ background: "#3c4ee0" }}
                                                disabled={loaderAddAmenity}
                                            >
                                                Save
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </Modal>
                        <Grid className="flex justify-center ">
                            <div className="flex w-[80%] pt-2 text-center sm:w-[30%] lg:w-[20%]">
                                <ButtonIconComponent
                                    loader={loaderAddAmenity}
                                    name="Add a Amenity"
                                    imageBool={true}
                                    styles={{
                                        marginLeft: "10px",
                                        marginTop: "10px",
                                    }}
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                        </Grid>
                    </form>
                    <Grid
                        container
                        spacing={0}
                        style={{
                            marginTop: "30px",
                        }}
                    >
                        {data?.map((item, index) => (
                            <Grid
                                key={index}
                                style={{
                                    backgroundColor: "white",
                                    border: " 1px solid #E8E8E8",
                                    boxShadow: "1px 1px 4px #C5C5C5",
                                    margin: "10px",
                                    borderRadius: "10px",
                                    width: "250px",
                                    position: "relative",
                                    overflow: "hidden",
                                    textAlign: "center",
                                }}
                            >
                                <AmenityCard
                                    amenity={item}
                                    data={data}
                                    setData={setData}
                                    setCategoryIndex={setAmenityIndex}
                                    index={index}
                                    handleRemove={handleRemove}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </DefaultLayout>
    );
};

export default Amenities;
