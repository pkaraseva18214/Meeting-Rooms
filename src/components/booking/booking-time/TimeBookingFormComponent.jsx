import React from 'react';

import {Button, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

import QuickTimeSelectComponent from "./QuickTimeSelectComponent";
import CustomTimeSelectComponent from "./CustomTimeSelectComponent";
import {formStyles} from "../../../constants/styleConstants";

const TimeBookingFormComponent = (
    {
        changeEmptyRoomsList,
        emptyRoomsList,
        selectedTime,
        changeFromTime,
        changeToTime,
        setQuickTimeSelect,
        isLoading,
        disabled,
        alignment,
        setAlignment,
    }
) => {
    return (
        <Stack sx={formStyles} spacing={3}>
            <QuickTimeSelectComponent
                setQuickTimeSelect={setQuickTimeSelect}
                alignment={alignment}
                setAlignment={setAlignment}
            />
            <Box sx={{display: 'flex', gap: '10px'}}>
                <CustomTimeSelectComponent
                    time={selectedTime.from}
                    destination={'from'}
                    changeTime={changeFromTime}
                    disabled={false}
                />
                <CustomTimeSelectComponent
                    time={selectedTime.to}
                    destination={'to'}
                    changeTime={changeToTime}
                    disabled={disabled}
                />
            </Box>
            <Box sx={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                {
                    isLoading
                        ? <CircularProgress sx={{margin: '0 auto'}} disableShrink/>
                        : emptyRoomsList.length !== 0 ? emptyRoomsList.map((room) => (
                            <div key={room._id} className="empty-room-number">
                                {room.roomNumber}
                            </div>
                        )) : null
                }
            </Box>
            <Button
                type={'submit'}
                onClick={changeEmptyRoomsList}
                fullWidth
                variant={'contained'}
                sx={{mt: 3, mb: 2, alignSelf: 'flex-end'}}
            >
                Show available rooms
            </Button>
        </Stack>
    );
};

export default TimeBookingFormComponent;