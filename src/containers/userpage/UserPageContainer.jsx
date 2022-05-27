import React, {useEffect} from 'react';
import UserPageComponent from "../../components/user/UserPageComponent";
import {useDispatch, useSelector} from "react-redux";
import {getUserDataByIdRequest} from "../../ducks/users";
import {selectUser, selectUserError, selectUserStatus} from "../../ducks/users/selectors";
import {Alert, Box, CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {STATUS} from "../../constants/mainConstants";

function UserDataContainer() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const error = useSelector(selectUserError);

    useEffect(() => {
        dispatch(getUserDataByIdRequest(id));
    }, [dispatch, id]);

    if (userStatus === STATUS.LOADING) {

        return (
            <Box sx={{display: 'flex', marginTop: '8rem', justifyContent: 'center'}}>
                <CircularProgress size='5rem' disableShrink/>
            </Box>
        )
    }

    return <UserPageComponent user={user} error={error}/>;
}

export default UserDataContainer;
