import {Box, Button, Typography} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {convertEventToSend} from "../../helper/eventConverter";
import {deleteEventRequest, patchEventRequest} from "../../ducks/events";
import {Temporal} from "@js-temporal/polyfill";
import {toTemporalPlainDate} from "../../helper/workWithDates";
import {useDispatch, useSelector} from "react-redux";
import {
    selectNewPatchError,
    selectPatchError,
    selectPatchOkStatus,
    selectPatchStatus,
    selectRoom
} from "../../ducks/events/selector";
import {selectRooms} from "../../ducks/rooms/selectors";
import {useNavigate} from "react-router-dom";
import {STATUS} from "../../constants/mainConstants";
import ModalComponent from "../modal/ModalComponent";
import successImg from "../modal/success.png";

function EventOverviewEditComponent({isEditing, setIsEditing, eventData, time}) {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const nowDate = Temporal.Now.plainDateTimeISO();
    const eventDate = toTemporalPlainDate(eventData.from, 'minutes');
    const isDatePass = Temporal.PlainDateTime.compare(nowDate, eventDate);
    const targetRoom = useSelector(selectRoom);
    const targetRoomId = useSelector(selectRooms);
    const patchError = useSelector(selectPatchError);
    const newError = useSelector(selectNewPatchError);
    const patchStatus = useSelector(selectPatchStatus);
    const okStatus = useSelector(selectPatchOkStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        setIsEditing(true);
    }

    const roomForBooking = targetRoomId.find(room =>
        room.roomNumber === targetRoom);

    if (newError) {
        setIsEditing(true);
    }

    const handleSave = () => {
        setError(null);
        if (roomForBooking == null) {
            setError('Choose city and room!');
        } else if (roomForBooking) {
            const eventToSend =
                convertEventToSend(eventData, time, roomForBooking);
            dispatch(patchEventRequest(eventToSend));
            setStatus(patchStatus);
        }
    }

    const handleDelete = () => {
        dispatch(deleteEventRequest(eventData._id));
        setIsEditing(false);
        navigate('/home');
    }

    return (
        <Box>
            {isDatePass !== 1 ?
                <Box>
                    {isEditing ?
                        <Box>
                            <Button
                                variant="outlined"
                                color="success"
                                sx={{width: '180px', alignSelf: 'center', mt: 3}}
                                startIcon={<SaveIcon/>}
                                onClick={handleSave}
                            >
                                Save Changes
                            </Button>
                            {error &&
                                <Typography>{error}</Typography>
                            }
                            {patchError?.error?.errorMessage &&
                                <Typography>{patchError?.error?.errorMessage}</Typography>
                            }
                            {newError &&
                                <Typography>{newError[0].message}</Typography>
                            }
                            <br/>
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{width: '180px', alignSelf: 'center', mt: 3}}
                                startIcon={<DeleteIcon/>}
                                onClick={handleDelete}
                            >
                                Delete event
                            </Button>
                        </Box>
                        : null
                    }
                    {
                        okStatus === "OK" &&
                        <ModalComponent status={STATUS.SUCCESS}>
                            <img style={{display: 'block', margin: '10px auto', width: '100px'}} src={successImg}
                                 alt="success"/>
                        </ModalComponent>
                    }
                    {
                        isEditing ?
                            null
                            : <Button
                                onClick={handleClick}
                                variant="contained"
                                sx={{width: '200px', alignSelf: 'center', mt: 1.5}}
                            >
                                Edit event
                            </Button>
                    }
                </Box>
                : <Typography variant="h6" sx={{mt: 2}}>
                    You cannot edit a past event
                </Typography>
            }
        </Box>
    );
}

export default EventOverviewEditComponent;