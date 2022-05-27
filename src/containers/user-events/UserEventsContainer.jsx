import React, {useEffect} from 'react';
import {findUpcomingDate, makeGroupsByDate, sortByDate} from "../../helper/workWithDates";
import UserEventsListComponent from "../../components/user-events/UserEventsListComponent;";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../ducks/users/selectors";
import {getUserDataByIdRequest} from "../../ducks/users";

function UserEventsContainer() {
    const user = useSelector(selectUser);
    let upcomingEvents = [];
    let groups = [];
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getUserDataByIdRequest(user._id));
        }
    }, [])

    if (user) {
        const userEvents = user && user.events;
        const rows = sortByDate([...userEvents]);
        upcomingEvents = findUpcomingDate(userEvents);
        groups = makeGroupsByDate(rows);
    }

    return <UserEventsListComponent upcomingEvents={upcomingEvents} rows={groups ? Object.entries(groups) : null}/>
}

export default UserEventsContainer;