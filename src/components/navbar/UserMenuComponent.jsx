import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {PATH} from "../../constants/mainConstants";
import Typography from "@mui/material/Typography";
import {logout} from "../../ducks/auth";
import Box from "@mui/material/Box";

const UserMenuComponent = ({user, handleMenuFunctions, userPanelState, dispatch, navigate}) => {
    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleMenuFunctions.handleOpenUserMenu} sx={{p: 0}}>
                    {user?.avatar
                        ? <Avatar alt="User" src={user?.avatar}/>
                        : <Avatar alt="User" src={'https://placekitten.com/200/200'}/>
                    }
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={userPanelState}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(userPanelState)}
                onClose={handleMenuFunctions.handleCloseUserMenu}
            >
                <MenuItem onClick={() =>
                    handleMenuFunctions.handleCloseNavMenu && navigate(`${PATH.USERS}/${user._id}`)
                }>
                    <Typography textAlign="center">{'Profile'}</Typography>
                </MenuItem>
                <MenuItem onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem('token');
                    handleMenuFunctions.handleCloseUserMenu();
                    dispatch(logout());
                }}>
                    <Typography textAlign="center">{'Logout'}</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenuComponent;