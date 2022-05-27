import {
    Box,
    Card, CardContent,
    Typography
} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {selectCity, selectDate, selectRoom} from "../../ducks/events/selector";
import {filterForMainPage} from "../../helper/workWithDates";
import MainPageNavigator from "../mainpage/MainPageNavigator";
import MainPageRoomAndCityFilters from "../mainpage/MainPageRoomAndCityFilters";
import UpcomingEventComponent from "./UpcomingEventComponent";
import TableComponent from "../TableComponent";

function UserEventsListComponent({upcomingEvents, rows}) {

    const currentDate = useSelector(selectDate);
    const currentCity = useSelector(selectCity);
    const currentRoom = useSelector(selectRoom);
    let rowsToRender = [];

    if (rows) {
        rowsToRender = filterForMainPage(rows, currentDate, currentCity, currentRoom)
            .filter((row) => row[1].length !== 0);
    }

    return (
        <Box className='my-events-list'>
            <Box sx={{
                flexGrow: '1',
                justifyContent: 'center',
                textAlign: "center",
                marginBottom: '5rem',
                maxWidth: '720px'
            }}>
                <div className='upcoming-event-title my-events'>My Events</div>
                <MainPageNavigator/>
                <MainPageRoomAndCityFilters/>
                <TableComponent rows={rowsToRender}/>
            </Box>
            <Card className='upcoming-event'
                  sx={{
                      border: 'solid 1px',
                      borderColor: 'rgba(211, 211, 211)',
                      boxShadow: '10px 5px 5px rgba(211, 211, 211, 0.7)'
                  }}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Upcoming Events
                    </Typography>
                    {
                        upcomingEvents.length > 0 ? (
                            upcomingEvents.map((event) =>
                                <UpcomingEventComponent key={event._id} upcomingEvent={event}/>
                            )
                        ) : (
                            'No upcoming events.'
                        )
                    }
                </CardContent>
            </Card>
        </Box>
    );
}

export default UserEventsListComponent;