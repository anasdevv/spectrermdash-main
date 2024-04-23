// MenuSelect.tsx
import React, { useState } from 'react';

interface MenuSelectProps {
    rowID: string;
    status: string;
}

const MenuSelect: React.FC<MenuSelectProps> = ({ rowID, status }) => {
    const [_package, setPackage] = useState(status);

    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        setPackage(newStatus);

    };

    return (
        <select
            style={{
                color: "white",
                fontSize: "12px",
                background: "#3c4ee0",
                borderRadius: "15px",
                margin: '10px',
                padding: '10px',

            }}
            onChange={handleChange}
            value={_package}
        >
            <option value="General">General</option>
            <option value="Featured">Featured</option>
        </select>
    );
};

export default MenuSelect;
