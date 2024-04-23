import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Modal, Snackbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CancelOutlined, Search } from '@mui/icons-material';
import SelectOptionOne from '../SelectOption/SelectOptionOne';
import SelectGroupThree from '../SelectGroup/SelectGroupThree';
import QRCode from 'react-qr-code';

import QRCodeComponent from '../QRCode'

interface WrapperWithSearchProps {
    title: string;
    children?: React.ReactNode;
    businessNames: any
}

const WrapperWithSearch: React.FC<WrapperWithSearchProps> = ({ title, children, businessNames }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrScreen, setqrScreen] = useState(false)
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const ourhandler = (e: any) => {
        e.preventDefault()
        setqrScreen(true)
        console.log("our form's values",)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h6 className="text-xxs font-semibold text-black dark:text-white">
                    {title}
                </h6>

                <div
                    style={{ display: "flex", alignItems: "flex-end", marginBottom: "20px", width: '40%', marginRight: '30px' }}
                >
                    <TextField
                        name="search"
                        placeholder='Search QR code...'
                        fullWidth
                        inputProps={{ style: { fontSize: "12px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}

                        variant="standard"
                    />

                    <IconButton

                        style={{ padding: 1 }}
                    >
                    </IconButton>

                    <IconButton style={{ padding: 1 }}>
                        <Search />
                    </IconButton>
                    <button className="flex w-[30%] ml-5 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleModalOpen}>
                        QR CODE
                    </button>

                </div>
            </div>

            {children}
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className='ourModal bg-slate-400 flex justify-center items-center'
            >
                <div >
                    <div className="grid w-full gap-9 sm:grid-cols-1 lg:grid-cols-1">
                        <div className="flex flex-col gap-9">
                            {!qrScreen ?
                                <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                        <h3 className="text-center font-medium text-black dark:text-white">
                                            Add QR Code
                                        </h3>
                                    </div>
                                    <form action="" onSubmit={ourhandler}>
                                        <div className="p-6.5">
                                            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                                                <div className="w-full xl:w-full">
                                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                        QR CODE NAME
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Enter your Qr Code name"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>


                                            </div>
                                            <SelectGroupThree businessNames={businessNames} />
                                            <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
                                                <div className="w-full xl:w-full">
                                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                        POINTS
                                                    </label>
                                                    <input
                                                        type="number"
                                                        required
                                                        placeholder="Enter Points"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
                                                <div className="w-full xl:w-1/2">
                                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                        START DATE
                                                    </label>
                                                    <input
                                                        type="date"
                                                        placeholder="Select start date"
                                                        required
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>

                                                <div className="w-full xl:w-1/2">
                                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                        END DATE
                                                    </label>
                                                    <input
                                                        type="date"
                                                        required
                                                        placeholder="Select end date"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>




                                            <div className="mb-6">
                                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                    Description
                                                </label>
                                                <textarea
                                                    rows={6}
                                                    required
                                                    placeholder="Type your message"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                ></textarea>
                                            </div>

                                            <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                                GENERATE
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="rounded-xl border border-stroke  p-20 m-20 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className=' text-center'><h1>Your QR code</h1></div>
                                    <QRCode className='mb-10 mt-4' value={`https://admin.bestlocaleats.net/`} />
                                    <QRCodeComponent text='https://admin.bestlocaleats.net/' />
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default WrapperWithSearch;
