import React from 'react';
import {Typography} from "@mui/material";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";

const CapacitySelectComponent = ({selectedCapacity, handleCapacityChange}) => {
    return (
        <FormControl sx={{m: 1, width: {md: 260, xs: '95%'}}}>
            <Typography color="text.secondary">
                People:
            </Typography>
            <Slider
                id="slider"
                min={0}
                max={30}
                aria-label="Always visible"
                step={1}
                valueLabelDisplay="on"
                value={selectedCapacity}
                onChange={handleCapacityChange}
            />
        </FormControl>
    );
};

export default CapacitySelectComponent;