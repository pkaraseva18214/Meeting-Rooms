import FormControl from "@mui/material/FormControl";
import {Box, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCity, selectRoom} from "../../ducks/events/selector";
import {eventsByCurrentCity, eventsByCurrentRoom} from "../../ducks/events";
import {selectRooms} from "../../ducks/rooms/selectors";
import {v4} from "uuid";
import {clearAllRooms, getRoomsRequest} from "../../ducks/rooms";

function MainPageRoomAndCityFilters() {
    const currentRoomBySelector = useSelector(selectRoom);
    const currentCityBySelector = useSelector(selectCity);
    const currentRoomsByCity = useSelector(selectRooms);
    const dispatch = useDispatch();

    const [currentCity, setCurrentCity] = useState(currentCityBySelector);
    const [currentRoom, setCurrentRoom] = useState(currentRoomBySelector);

    const cityChangeHandler = (e) => {
        e.preventDefault();
        dispatch(eventsByCurrentCity(e.target.value));

        if (e.target.value !== '') {
            dispatch(getRoomsRequest({city: `${e.target.value}`}));
        } else {
            dispatch(clearAllRooms());
        }

        return setCurrentCity(e.target.value);
    };

    const roomChangeHandler = (e) => {
        e.preventDefault();
        dispatch(eventsByCurrentRoom(e.target.value));
        return setCurrentRoom(e.target.value);
    };

    return (
        <React.Fragment>
            <Box>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="city-select-helper-label">City</InputLabel>
                    <Select
                        labelId="city-select-helper-label"
                        id="city-select-helper"
                        value={currentCity}
                        label="City"
                        onChange={cityChangeHandler}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Новосибирск'}>Novosibirsk</MenuItem>
                        <MenuItem value={'Академгородок'}>Akademgorodok</MenuItem>
                        <MenuItem value={'Питер'}>St. Petersburg</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="room-select-helper-label">Room</InputLabel>
                    <Select
                        labelId="room-select-helper-label"
                        id="room-select-helper"
                        value={currentRoom}
                        label="Room"
                        onChange={roomChangeHandler}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        { currentRoomsByCity.length > 0
                            && currentRoomsByCity.map((room) =>
                                (<MenuItem value={room?.roomNumber} key={v4()}>{room?.roomNumber.toString()}</MenuItem>))
                        }
                    </Select>
                </FormControl>
            </Box>
        </React.Fragment>
    );
}

export default MainPageRoomAndCityFilters;