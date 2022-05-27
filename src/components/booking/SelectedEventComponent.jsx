import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {convertTemporalToRequestFormat} from "../../helper/workWithDates";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {addEventRequest} from "../../ducks/events";
import {selectEventsAddStatus} from "../../ducks/events/selector";
import {STATUS} from "../../constants/mainConstants";
import CircularProgress from "@mui/material/CircularProgress";
import SelectedRoomComponent from "./SelectedRoomComponent";
import ModalComponent from "../modal/ModalComponent";
import errorImg from "../modal/error.png";
import successImg from "../modal/success.png";


const SelectedEventComponent = (
    {
        selectedRoom,
        selectedCity,
        selectedDate,
        selectedTime,
        handleBack,
        activeStep,
        title,
        description,
    }
) => {
    const dispatch = useDispatch();
    const requestStatus = useSelector(selectEventsAddStatus);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 2,
        }}
        >
            <Box sx={{flex: '1 1 auto', marginBottom: '20px'}}>
                {
                    !selectedRoom
                        ? (
                            <Typography className="booking-error">
                                To book a room, you need to select it
                            </Typography>
                        )
                        :
                        <SelectedRoomComponent
                            selectedTime={selectedTime}
                            selectedRoom={selectedRoom}
                            selectedDate={selectedDate}
                            selectedCity={selectedCity}
                        />
                }
                {
                    (!title || !description) &&
                    (
                        <Typography mt={2} className="booking-error">
                            You need to enter title and description of the event
                        </Typography>
                    )
                }
            </Box>
            {
                requestStatus === STATUS.SUCCESS &&
                <ModalComponent status={STATUS.SUCCESS}>
                    <img style={{display: 'block', margin: '10px auto', width: '100px'}} src={successImg}
                         alt="success"/>
                </ModalComponent>
            }
            {
                requestStatus === STATUS.ERROR &&
                <ModalComponent status={STATUS.ERROR}>
                    <img style={{display: 'block', margin: '0 auto', width: '100px'}} src={errorImg} alt="error"/>
                </ModalComponent>
            }
            <Box sx={{alignSelf: 'flex-end', display: 'flex', alignItems: 'center'}}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Box>
                    {
                        requestStatus === STATUS.LOADING &&
                        <CircularProgress
                            sx={{margin: '0px auto'}}
                            size={20}
                            disableShrink
                        />
                    }
                </Box>
                <Button
                    disabled={!selectedRoom || !title || !description}
                    onClick={() => dispatch(addEventRequest({
                        title: title,
                        description: description,
                        images: [],
                        from: convertTemporalToRequestFormat(selectedDate, selectedTime, 'from'),
                        to: convertTemporalToRequestFormat(selectedDate, selectedTime, 'to'),
                        room: selectedRoom._id,
                    }))}
                >
                    confirm
                </Button>
            </Box>
        </Box>
    );
};

export default SelectedEventComponent;