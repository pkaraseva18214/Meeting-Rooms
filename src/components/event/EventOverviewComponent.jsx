import {Box, Button, Typography} from "@mui/material";
import React, {useState} from "react";
import {toTemporalPlainDate} from "../../helper/workWithDates";
import {eventEditorBox} from "../../constants/styleConstants";
import {useSelector} from "react-redux";
import {selectUser} from "../../ducks/users/selectors";
import EventOverviewDataComponent from "./EventOverviewDataComponent";
import EventOverviewEditComponent from "./EventOverviewEditComponent";
import {eventApply, eventDeny} from "../../services/events";

function EventOverviewComponent({event, navigate}) {
    const [isEditing, setIsEditing] = useState(false);
    const [eventData, setEventData] = useState(event);
    const [time, setTime] = useState({
        from: toTemporalPlainDate(eventData.from, 'minutes'),
        to: toTemporalPlainDate(eventData.to, 'minutes'),
    });

    const selectCurrentUser = useSelector(selectUser);

    const me = () => (
        !!event.appliedUsers
            .find(user => user.username === selectCurrentUser.username))

    const [isJoined, setIsJoined] = useState(me());

    const handleJoin = () => {
        if (isJoined) {
            eventDeny(eventData._id);
            setIsJoined(false);
        } else {
            eventApply(eventData._id);
            setIsJoined(true);
        }
    };

    return (
        <Box sx={eventEditorBox}>

            <EventOverviewDataComponent
                eventData={eventData}
                setEventData={setEventData}
                time={time}
                setTime={setTime}
                isEditing={isEditing}/>

            {eventData.appliedUsers[0].username === selectCurrentUser.username ?

                <EventOverviewEditComponent
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    eventData={eventData}
                    time={time}/>

                : <Typography variant="h6" sx={{mt: 2}}>
                    You are not the author
                </Typography>}
            {isEditing === false &&
                <Box>
                    {
                        isJoined ?
                            <Button
                                onClick={handleJoin}
                                sx={{mt: 1.5, width: '140px'}}
                                variant="outlined"
                                color="error"
                            >
                                Leave event
                            </Button>
                            : <Button
                                onClick={handleJoin}
                                sx={{mt: 1.5, width: '140px'}}
                                variant="contained"
                                color="success"
                            >
                                Join event
                            </Button>
                    }
                </Box>
            }

            <Button
                onClick={() => navigate('/home')}
                sx={{mt: 1.5}}
                variant="contained"
                color="secondary"
            >
                Return home
            </Button>
        </Box>
    );
}

export default EventOverviewComponent;