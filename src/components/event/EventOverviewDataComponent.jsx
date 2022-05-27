import {Box, Container, Input, TextField} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import TitleIcon from "@mui/icons-material/Title";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import StarsIcon from "@mui/icons-material/Stars";
import React from "react";
import MainPageRoomAndCityFilters from "../mainpage/MainPageRoomAndCityFilters";
import {getListOfUsersOfCurrentEvent} from "../../helper/eventConverter";

function EventOverviewDataComponent({
                                        eventData,
                                        setEventData,
                                        time,
                                        setTime,
                                        isEditing
                                    }) {

    const handleTimeChange = (e) => {
        setTime((prevState) =>
            ({...prevState, [e.target.name]: e.target.value}));
    }

    const handleChange = (e) => {
        setEventData((prevState) =>
            ({...prevState, [e.target.name]: e.target.value.toString()}));
    }
    const listOfUsers = getListOfUsersOfCurrentEvent(eventData.appliedUsers);

    return (
        <Container>
            <Box sx={{alignItems: 'center', mt: 3, justifyContent: 'space-between'}}>
                {!isEditing ?
                    <Box>
                        <RoomIcon sx={{color: 'action.active', mt: 2.5, mr: 0.5}}/>
                        <TextField
                            sx={{minWidth: '250px', maxWidth: '250px'}}
                            disabled
                            id="city"
                            name="city"
                            label="City"
                            defaultValue={eventData.room.city}
                        />
                        <TextField
                            sx={{maxWidth: '55px'}}
                            disabled
                            id="room"
                            name="room"
                            label="Room"
                            defaultValue={eventData.room.roomNumber}
                        />
                    </Box>
                    :
                    <Box sx={{alignItems: 'center', ml: 3}}>
                        <RoomIcon sx={{color: 'action.active', mr: 0.5}}/>
                        <MainPageRoomAndCityFilters/>
                    </Box>
                }
            </Box>
            <Box sx={{alignItems: 'center', mt: 3}}>
                <TitleIcon sx={{color: 'action.active', mt: 2.5, mr: 0.5}}/>
                <TextField
                    sx={{maxWidth: '305px', minWidth: '305px'}}
                    onChange={handleChange}
                    disabled={!isEditing}
                    id="title"
                    name="title"
                    label="Title"
                    defaultValue={eventData.title}
                />
            </Box>
            <EventIcon sx={{color: 'action.active', mt: 2.5}}/>
            <Box sx={{alignItems: 'center', mt: 1}}>
                <Input
                    type="datetime-local"
                    onChange={handleTimeChange}
                    disabled={!isEditing}
                    name='from'
                    sx={{maxWidth: '185px',}}
                    value={time.from.toString()}
                />
                <br/>
                <Input
                    type="datetime-local"
                    onChange={handleTimeChange}
                    sx={{maxWidth: '185px', mt: 1}}
                    disabled={!isEditing}
                    name='to'
                    value={time.to.toString()}
                />
            </Box>
            <Box sx={{alignItems: 'flex-end', mt: 3}}>
                <DescriptionIcon sx={{color: 'action.active', mt: 2}}/>
                <TextField
                    sx={{maxWidth: '305px'}}
                    onChange={handleChange}
                    disabled={!isEditing}
                    id="description"
                    name="description"
                    label="Description"
                    defaultValue={eventData.description}
                    rows={5}
                    multiline
                    fullWidth
                />
            </Box>
            <Box sx={{alignItems: 'flex-end', mt: 3}}>
                <AccessibilityIcon sx={{color: 'action.active', mt: 2}}/>
                <TextField
                    sx={{minWidth: '305px'}}
                    onChange={handleChange}
                    disabled
                    id="participants"
                    name="participants"
                    label="Participants"
                    defaultValue={listOfUsers}
                />
            </Box>
            <Box sx={{alignItems: 'flex-end', mt: 3}}>
                <AccountBoxIcon sx={{color: 'action.active', mt: 2.5, mr: 0.5}}/>
                <TextField
                    sx={{maxWidth: '185px'}}
                    onChange={handleChange}
                    disabled
                    id="authorName"
                    name="authorName"
                    label="Author"
                    defaultValue={eventData.appliedUsers[0].username}
                    variant='standard'
                />
                <StarsIcon sx={{color: 'action.active', mt: 2.5, mr: 0.5}}/>
                <TextField
                    sx={{maxWidth: '85px'}}
                    onChange={handleChange}
                    disabled
                    id="createdAt"
                    name="createdAt"
                    label="Created at"
                    defaultValue={eventData.appliedUsers[0].createdAt.slice(0, 10)}
                    variant='standard'
                />
            </Box>
        </Container>
    );
}

export default EventOverviewDataComponent;