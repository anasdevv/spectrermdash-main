import { Button, CircularProgress, Typography } from "@mui/material";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
interface ButtonIconComponentProps {
    loader: boolean;
    name: string;
    onClick?: () => void;
    dashboard?: boolean;
    styles?: any;
    imageBool?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    width?: string;
}

const ButtonIconComponent = ({
    loader,
    name,
    onClick,
    dashboard,
    styles,
    imageBool,
    type,
    disabled,
    width,
}: ButtonIconComponentProps) => {
    return (
        <>
            <Button
                type={type || "button"}
                style={{
                    width: "100%",
                    minWidth: "100%",
                    color: "#fff",
                    borderRadius: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    textTransform: "capitalize",
                    padding: "7px 16px",
                    fontWeight: 500,
                    fontSize: "14px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    backgroundColor: "#3c4fe0",
                    cursor: "pointer",
                    ...styles,
                }}
                onClick={onClick}
                disabled={disabled}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {imageBool ? (
                        <AddTwoToneIcon style={{ width: "17px", height: "17px" }} />
                    ) : (
                        ""
                    )}

                    {loader ? (
                        <CircularProgress size={23} color="primary" />
                    ) : (
                        <Typography sx={{ color: "#fff" }}>{name}</Typography>
                    )}
                </div>
            </Button>
        </>
    );
};

export default ButtonIconComponent;
