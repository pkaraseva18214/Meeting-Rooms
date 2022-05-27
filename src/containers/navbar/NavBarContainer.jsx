import React from 'react';
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {useSelector} from "react-redux";
import {selectLogin} from "../../ducks/auth/selectors";

const NavBarContainer = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const isLoggedIn = useSelector(selectLogin);

    const handleMenuFunctions = {
        handleOpenNavMenu: (event) => {
            setAnchorElNav(event.currentTarget);
        },
        handleOpenUserMenu: (event) => {
            setAnchorElUser(event.currentTarget);
        },
        handleCloseNavMenu: () => {
            setAnchorElNav(null);
        },
        handleCloseUserMenu: () => {
            setAnchorElUser(null);
        },
    };

    return (
        <NavBarComponent
            navPanelState={anchorElNav}
            userPanelState={anchorElUser}
            handleMenuFunctions={handleMenuFunctions}
            isLoggedIn={isLoggedIn}
        />
    );
};

export default NavBarContainer;