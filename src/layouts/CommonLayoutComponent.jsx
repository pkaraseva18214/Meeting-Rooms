import {PATH} from '../constants/mainConstants'
import {selectLogin} from "../ducks/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, Navigate} from "react-router-dom";
import {getUserDataByTokenRequest} from "../ducks/users";

const CommonLayoutComponent = () => {
    const isLoggedIn = useSelector(selectLogin);
    const dispatch = useDispatch();

    if (isLoggedIn) {
        dispatch(getUserDataByTokenRequest());
    }

    return isLoggedIn ? <Outlet/> : <Navigate to={PATH.LOGIN}/>;
}

export default CommonLayoutComponent;