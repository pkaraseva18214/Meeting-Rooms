import React from 'react';
import Button from "@mui/material/Button";
import {PATH} from "../../constants/mainConstants";
import Box from "@mui/material/Box";

const DesktopMainMenuComponent = ({navigate}) => {
    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <Button
                onClick={() => navigate(PATH.BOOKING)}
                sx={{my: 2, color: 'white', display: 'block'}}
            >
                {'Booking'}
            </Button>
            <Button
                onClick={() => navigate(PATH.FREE_ROOMS)}
                sx={{my: 2, color: 'white', display: 'block'}}
            >
                {'Free rooms'}
            </Button>
            <Button
                onClick={() => navigate(PATH.MY_EVENTS)}
                sx={{my: 2, color: 'white', display: 'block'}}
            >
                {'My events'}
            </Button>
        </Box>
    );
};

export default DesktopMainMenuComponent;