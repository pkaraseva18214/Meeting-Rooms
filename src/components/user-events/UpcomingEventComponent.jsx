import {Box, Divider, Typography} from "@mui/material";
import {convertEventTimeToNormalDate} from "../../helper/workWithDates";
import React from "react";

function UpcomingEventComponent({upcomingEvent}) {

    return (
        <>
            <Box>
                <div className='upcoming-event-title'>
                    {upcomingEvent.title}
                </div>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {convertEventTimeToNormalDate(upcomingEvent.from)}
                </Typography>
                <Typography variant="body2">
                    {upcomingEvent.description}
                </Typography>
            </Box>
            <Divider/>
        </>

    );
}

export default UpcomingEventComponent;