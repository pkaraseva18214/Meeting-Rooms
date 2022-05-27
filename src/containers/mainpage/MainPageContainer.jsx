import React, {useEffect} from 'react';
import {makeGroupsByDate, sortByDate} from "../../helper/workWithDates";
import {eventsRequest} from "../../ducks/events";
import {useDispatch, useSelector} from "react-redux";
import {selectEvents, selectEventsError, selectEventsStatus} from "../../ducks/events/selector";
import {Box, CircularProgress, Typography} from "@mui/material";
import MainPageComponent from "../../components/mainpage/MainPageComponent";
import {STATUS} from "../../constants/mainConstants";


function MainPageContainer() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(eventsRequest());
    }, [dispatch]);

    const responseStatus = useSelector(selectEventsStatus);
    const errorStatus = useSelector(selectEventsError);
    const responseEvents = useSelector(selectEvents);
    let rows = [];
    let groups = [];

    if (responseEvents.length > 0){
        rows = sortByDate([...responseEvents]);
        groups = makeGroupsByDate(rows);
    }

    if (responseStatus === STATUS.LOADING) {

        return (
            <Box sx={{display: 'flex', marginTop: '8rem', justifyContent: 'center'}}>
                <CircularProgress size='5rem' disableShrink/>
            </Box>
        );

    } else if (responseStatus === STATUS.ERROR) {

        return (
            <Typography
                variant="h2"
                sx={{marginTop: '8rem',
                    textAlign: 'center'}}
            >
                Error: {`${errorStatus}`}
            </Typography>
        )
    }

    return <MainPageComponent rows={groups ? Object.entries(groups) : null}/>
}

export default MainPageContainer;