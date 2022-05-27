import React from 'react';
import {Input} from "@mui/material";

const DateSelectComponent = ({selectedDate, handleDateChange}) => {
    return <Input type={'date'} value={selectedDate.toString()} onChange={handleDateChange}/>;
};

export default DateSelectComponent;