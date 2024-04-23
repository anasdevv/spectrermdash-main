import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface RemoveButtonProps {
    text: string;
    onRemove: () => void;
}

const RemoveButton = ({ text, onRemove }: RemoveButtonProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = () => {
        onRemove();
        handleClose();
    };

    return (
        <>
            <Tooltip title="Delete Category" onClick={handleClickOpen}>
                <IconButton>
                    <Delete style={{ color: "#e63946", width: '20px' }}></Delete>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRemove} autoFocus>
                        Yes
                    </Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RemoveButton;
