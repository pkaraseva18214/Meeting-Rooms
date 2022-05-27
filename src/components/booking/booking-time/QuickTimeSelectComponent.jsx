import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Temporal} from "@js-temporal/polyfill";

const QuickTimeSelectComponent = ({setQuickTimeSelect, alignment, setAlignment}) => {

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);

        switch (event.target.value) {
            case '15m':
                setQuickTimeSelect(Temporal.Duration.from({minutes: 15}));
                break;
            case '30m':
                setQuickTimeSelect(Temporal.Duration.from({minutes: 30}));
                break;
            case '1h':
                setQuickTimeSelect(Temporal.Duration.from({hours: 1}));
                break;
            case '1.5h':
                setQuickTimeSelect(Temporal.Duration.from({hours: 1, minutes: 30}));
                break;
            case '2h':
                setQuickTimeSelect(Temporal.Duration.from({hours: 2}));
                break;
            default:
                break;
        }
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{
                mr: 2,
                display: 'flex',
                flexDirection: 'row',
                width: {md: '50%', xs: '100%'},
            }}
        >
            <ToggleButton value="15m">15m</ToggleButton>
            <ToggleButton value="30m">30m</ToggleButton>
            <ToggleButton value="1h">1h</ToggleButton>
            <ToggleButton value="1.5h">1.5h</ToggleButton>
            <ToggleButton value="2h">2h</ToggleButton>
        </ToggleButtonGroup>
    );
};

export default QuickTimeSelectComponent;