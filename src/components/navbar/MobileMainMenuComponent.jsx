import React from 'react';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {PATH} from "../../constants/mainConstants";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MobileMainMenuComponent = ({handleMenuFunctions, navPanelState, navigate}) => {
    return (
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuFunctions.handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={navPanelState}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(navPanelState)}
                onClose={handleMenuFunctions.handleCloseNavMenu}
                sx={{
                    display: {xs: 'block', md: 'none'},
                }}
            >
                <MenuItem onClick={() => handleMenuFunctions.handleCloseNavMenu && navigate(PATH.BOOKING)}>
                    <Typography textAlign="center">{'Booking'}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuFunctions.handleCloseNavMenu && navigate(PATH.FREE_ROOMS)}>
                    <Typography textAlign="center">{'Free rooms'}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuFunctions.handleCloseNavMenu && navigate(PATH.MY_EVENTS)}>
                    <Typography textAlign="center">{'My Events'}</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default MobileMainMenuComponent;