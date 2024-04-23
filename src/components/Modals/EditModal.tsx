import { Edit } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface EditModalProps {
    value: string;
    onChange: (value: string) => void;
}

const EditModal = ({ value, onChange }: EditModalProps) => {
    const [open, setOpen] = useState(false);
    const [editedValue, setEditedValue] = useState(value);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const lowercaseEditedValue = editedValue.toLowerCase()
        onChange(lowercaseEditedValue);
        handleClose();
    };

    return (
        <div>
            <Edit style={{ color: "grey", width: '20px' }} onClick={handleClickOpen}></Edit>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        type="text"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        style={{ width: "400px" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditModal;
