import React from 'react';
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {convertTemporalToUsualTime} from "../../helper/workWithDates";

const SelectedRoomComponent = ({
                                   selectedCity, selectedRoom, selectedDate, selectedTime,
                               }) => {
    return (
        <Box className="booking-success">
            <span>You selected:</span>
            <Typography sx={{display: 'flex', justifyContent: 'space-between'}}>
                City:
                <span className="small-room-number">{selectedCity}</span>
            </Typography>
            <Typography sx={{display: 'flex', justifyContent: 'space-between'}}>
                Room:
                <span className="small-room-number">{selectedRoom.roomNumber}</span>
            </Typography>
            <Typography sx={{display: 'flex', justifyContent: 'space-between'}}>
                Capacity:
                <span className="small-room-number">{selectedRoom.capacity}</span>
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                Equipment:
                <Box sx={{
                    marginLeft: '40px', display: 'flex', flexWrap: 'wrap', gap: '5px',
                }}
                >
                    {selectedRoom.equipment.map((item, index) =>
                        <span key={index} className="small-room-number">{item}</span>)}
                </Box>
            </Box>
            <Typography sx={{display: 'flex', justifyContent: 'space-between',}}>
                Date:
                <span className="small-room-number">
                    {`${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`}
                </span>
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                Time:
                <Box sx={{display: 'flex', gap: '5px'}}>
                    <span className="small-room-number">
                        {`from: ${convertTemporalToUsualTime(selectedTime.from)}`}
                    </span>
                    <span className="small-room-number">
                        {`to: ${convertTemporalToUsualTime(selectedTime.to)}`}
                    </span>
                </Box>
            </Box>
        </Box>);
};

export default SelectedRoomComponent;