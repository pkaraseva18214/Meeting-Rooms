import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DateSelectComponent from "./DateSelectComponent";
import {formStyles} from "../../../constants/styleConstants";
import {Stack} from "@mui/material";
import {cities} from "../../../constants/cityConstants";

const CitySelectComponent = (
    {
        city,
        handleCityChange,
        selectedDate,
        handleDateChange,
    }
) => {
    return (
        <Stack component={'section'}
               sx={{
                   ...formStyles,
                   margin: '0 auto'
               }}
               spacing={3}
        >
            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="select-autowidth-label">City</InputLabel>
                <Select
                    labelId="select-autowidth-label"
                    id="select-autowidth"
                    value={city}
                    onChange={handleCityChange}
                    autoWidth
                    label="City"
                >
                    {
                        cities.map((city) => (
                            <MenuItem key={city} value={city}>{city}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <DateSelectComponent
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
            />
        </Stack>
    );
};

export default CitySelectComponent;