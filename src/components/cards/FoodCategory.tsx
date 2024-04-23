import { IconButton, Tooltip } from '@mui/material';
import EditModal from '../Modals/EditModal';
import RemoveButton from './Alert';
import { UpdateSingleDoc } from '@/Networkcalls/ServerReq';

interface FoodCategoryCardProps {
    category: {
        id: string;
        name: string;
    };
    data: {
        id: string;
        name: string;
    }[];
    setData: any;
    index: number;
    handleRemove: (categoryId: string) => void;
}

const FoodCategoryCard = ({
    category,
    data,
    setData,
    index,
    handleRemove,
}: FoodCategoryCardProps) => {
    return (
        <div className="bg-white pb-6 pl-4 pr-2 shadow-default dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-400 hover:bg-[#C8CCED] cursor-pointer font-medium text-bodydark3">
            <div className="flex justify-between">
                <div></div>
                <div>
                    <Tooltip title="Edit Category">
                        <IconButton>
                            <EditModal
                                value={category?.name}
                                onChange={(value: string) => {
                                    const updatedData = [...data];
                                    updatedData[index].name = value;
                                    setData(updatedData);
                                    UpdateSingleDoc('Categories', category?.id, {
                                        name: value,
                                        category: 'Your category value here',
                                    });
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <RemoveButton
                        text={'Are you sure you want to delete this item?'}
                        onRemove={() => handleRemove(category?.id)}
                    />
                </div>

            </div>

            <p className='capitalize'>{category?.name}</p>
        </div>
    );
};

export default FoodCategoryCard;
