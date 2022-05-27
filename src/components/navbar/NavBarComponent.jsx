import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {selectUser} from "../../ducks/users/selectors";
import LoginButtonComponent from "./LoginButtonComponent";
import UserMenuComponent from "./UserMenuComponent";
import DesktopMainMenuComponent from "./DesktopMainMenuComponent";
import MobileLogoComponent from "./MobileLogoComponent";
import MobileMainMenuComponent from "./MobileMainMenuComponent";
import DesktopLogoComponent from "./DesktopLogoComponent";

const NavBarComponent = ({
                             navPanelState,
                             userPanelState,
                             handleMenuFunctions,
                             isLoggedIn
                         }
) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DesktopLogoComponent/>
                    <MobileMainMenuComponent
                        handleMenuFunctions={handleMenuFunctions}
                        navPanelState={navPanelState}
                        navigate={navigate}
                    />
                    <MobileLogoComponent/>
                    <DesktopMainMenuComponent
                        navigate={navigate}
                    />
                    {
                        isLoggedIn
                            ? <UserMenuComponent
                                user={user}
                                handleMenuFunctions={handleMenuFunctions}
                                userPanelState={userPanelState}
                                dispatch={dispatch}
                                navigate={navigate}/>
                            : <LoginButtonComponent/>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBarComponent;