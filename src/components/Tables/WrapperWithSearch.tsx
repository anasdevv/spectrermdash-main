import React from 'react';
import { TextField, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

interface WrapperWithSearchProps {
    title: string;
    children?: React.ReactNode;
}

const WrapperWithSearch: React.FC<WrapperWithSearchProps> = ({ title, children, }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h6 className="text-xxs font-semibold text-black dark:text-white">
                    {title}
                </h6>

                <div
                    style={{ display: "flex", alignItems: "flex-end", marginBottom: "20px", width: '30%' }}
                >
                    <TextField
                        name="search"
                        placeholder='Search here.....'
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


                </div>
            </div>

            {children}

        </div>
    );
};

export default WrapperWithSearch;
