"use client";
import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import FoodCategoryCard from "@/components/cards/FoodCategory";
import ButtonIconComponent from "@/components/ButtonsGroups/ButtonIcons";
import {
    DeleteSingleData,
    GetAllData,
    AddSingleDoc,
} from "@/Networkcalls/ServerReq";

const FoodCategory = () => {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "500px",
        bgcolor: "background.paper",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        p: 4,
        overflow: "hidden",
        boxSizing: "border-box",
        transition: "opacity 0.3s ease-in, transform 0.3s ease-in",
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loaderAddCategory, setLoaderAddCategory] = useState(false);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState({ name: "" });
    const handleRemove = useCallback(
        (categoryId: string) => {
            DeleteSingleData("Categories", categoryId);
            const result = data?.filter(({ id }) => id !== categoryId);
            setData(result);
        },
        [data, setData],
    );
    const getData = useCallback(async () => {
        try {
            setIsLoading(true);
            let arr: any = [];
            const response: any = await GetAllData("Categories");
            response.forEach((doc: any) => {
                arr.push(doc.data());
            });
            arr.sort((a: any, b: any) => a.name?.localeCompare(b.name));
            setData(arr);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }, [setData]);
    useEffect(() => {
        getData();
    }, [getData]);
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setCategory({ ...category, [name]: value });
        },
        [category],
    );

    const handleAddCategory = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!category.name.trim()) {
                alert("Category name cannot be empty.");
                return;
            }

            setLoaderAddCategory(true);
            AddSingleDoc("Categories", { name: category.name.toLowerCase() })
                .then(() => {
                    setCategory({ name: "" });
                    setLoaderAddCategory(false);
                    getData();
                    setIsModalOpen(false);
                })
                .catch((error: any) => {
                    setLoaderAddCategory(false);
                });
        },
        [category, getData],
    );

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Food Category" />

            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </div>
            ) : (
                <div className="shadow-grey-500/50 w-full  max-w-full bg-[#f1f5f9] shadow-lg">
                    <form>
                        <Modal
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            aria-labelledby="add-category-modal"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <form onSubmit={handleAddCategory}>
                                    <TextField
                                        type="text"
                                        name="name"
                                        placeholder="Enter food category name"
                                        value={category?.name || ""}
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
                                                disabled={loaderAddCategory}
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
                                    loader={loaderAddCategory}
                                    name="Add a Category"
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
                                <FoodCategoryCard
                                    category={item}
                                    data={data}
                                    setData={setData}
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

export default FoodCategory;
