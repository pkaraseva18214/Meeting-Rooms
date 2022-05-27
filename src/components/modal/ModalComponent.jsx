import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {STATUS, PATH} from "../../constants/mainConstants";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetAddEventStatus} from "../../ducks/events";

const ModalComponent = ({status, children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Dialog
            aria-labelledby="dialog-title"
            open={true}
        >
            <DialogTitle id="dialog-title">
                { status === STATUS.SUCCESS && 'Success' }
                { status === STATUS.ERROR && 'Error' }
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    { status === STATUS.SUCCESS && 'The booking was successful.' }
                    { status === STATUS.ERROR && `An error occurred during the booking process, please, try again.` }
                </Typography>
                {children}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => {
                    dispatch(resetAddEventStatus());
                    navigate(PATH.HOME);
                }}>
                    To main page
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalComponent;