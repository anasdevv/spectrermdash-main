import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


interface CopyToClipboardButtonInterFace {
    text: string;
}


const CopyToClipboardButton = ({ text }: CopyToClipboardButtonInterFace) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <Button onClick={handleClick} className='flex flex-row-reverse gap-3 items-center left-3'><ContentCopyIcon style={{ color: '#8d8d8d', }} fontSize="medium" /><h1>Click here to copy link</h1></Button>

            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                className='pl-[41%] mb-[12%] '
                message="Copied to clipboard"
            />
        </>
    )
}

export default CopyToClipboardButton