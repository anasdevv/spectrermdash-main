import { IconButton, Tooltip } from '@mui/material';
import EditModal from '../Modals/EditModal';
import RemoveButton from './Alert';
import { UpdateSingleDoc } from '@/Networkcalls/ServerReq';

interface AmenityCardProps {
    amenity: {
        id: string;
        name: string;
    };
    data: {
        id: string;
        name: string;
    }[];
    setData: any;
    setCategoryIndex: any;
    index: number;
    handleRemove: (AmenitiesId: string) => void;
}

const AmenityCard = ({
    amenity,
    data,
    setData,
    setCategoryIndex,
    index,
    handleRemove,
}: AmenityCardProps) => {
    return (
        <div className="bg-white pb-6 pl-4 pr-2 shadow-default dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-400 hover:bg-[#C8CCED] cursor-pointer  font-medium text-bodydark3">
            <div className="flex justify-between">
                <div></div>
                <div>
                    <Tooltip title="Edit Amenities">
                        <IconButton>
                            <EditModal
                                value={amenity?.name}
                                onChange={(value: string) => {
                                    const updatedData = [...data];
                                    updatedData[index].name = value;
                                    setData(updatedData);
                                    UpdateSingleDoc('Amenities', amenity?.id, {
                                        name: value,
                                        category: 'your_category_value_here',
                                    });
                                    setCategoryIndex(0);
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <RemoveButton
                        text={'Are you sure you want to delete this item?'}
                        onRemove={() => handleRemove(amenity?.id)}
                    />
                </div>
            </div>

            <p className='capitalize'>{amenity?.name}</p>
        </div>
    );
};

export default AmenityCard;
