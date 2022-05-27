import React from 'react';
import {Chip, InputLabel, OutlinedInput, Select, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import {equipment} from "../../constants/equipmentConstants";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const EquipmentSelectComponent = ({equipmentSelected, handleEquipmentChange}) => {
    const theme = useTheme();

    return (
        <FormControl sx={{width: {md: 300, xs: '100%'}}}>
            <InputLabel id="multiple-chip-label">Equipment</InputLabel>
            <Select
                labelId="multiple-chip-label"
                id="multiple-chip"
                sx={{maxWidth: '245px'}}
                multiple
                value={equipmentSelected}
                onChange={handleEquipmentChange}
                input={<OutlinedInput id="select-multiple-chip" label="Equipment"/>}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
            >
                {equipment.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                        style={getStyles(item, equipmentSelected, theme)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default EquipmentSelectComponent;