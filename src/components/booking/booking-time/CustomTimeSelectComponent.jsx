import React from 'react';
import TextField from '@mui/material/TextField';
import {convertTemporalToUsualTime} from "../../../helper/workWithDates";

const CustomTimeSelectComponent = ({destination, time, changeTime, disabled}) => {
    return (
        <TextField
            disabled={disabled}
            id="time"
            label={destination}
            type="time"
            value={convertTemporalToUsualTime(time)}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                step: 300, // 5 min
            }}
            sx={{ width: 150 }}
            onChange={changeTime}
        />
    );
};

export default CustomTimeSelectComponent;