import {PATH} from '../constants/mainConstants';
import {useSelector} from "react-redux";
import {selectLogin} from "../ducks/auth/selectors";
import {Outlet, Navigate} from "react-router-dom";

function AuthLayoutComponent() {
    const isLoggedIn = useSelector(selectLogin);

    return isLoggedIn ? <Navigate to={PATH.HOME}/> : <Outlet/>
}

export default AuthLayoutComponent;