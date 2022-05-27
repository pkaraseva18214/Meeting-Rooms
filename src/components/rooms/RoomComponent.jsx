import React from 'react';
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const RoomComponent = (
    {
        _id,
        roomNumber,
        roomEquipment,
        roomDescription,
        roomPeopleCapacity,
        selectRoom,
        selectedRoom,
        needsButton
    }
) => {
    return (
        <Card
            sx={{
                minWidth: '180px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: selectedRoom && (selectedRoom?._id === _id)
                    ? 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;'
                    : 'none',
            }}
            variant="outlined"
        >
            <CardContent>
                <Typography sx={{
                    fontSize: 16,
                    fontWeight: 900,
                    textAlign: 'center'
                }}
                            color="#094067"
                            gutterBottom
                >
                    {roomNumber}
                </Typography>
                <Typography sx={{ mb: 1.5 }} >
                    {`People capacity: ${roomPeopleCapacity}`}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{maxWidth: '155px'}}
                >
                    {roomDescription}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    marginTop: '10px',
                    maxWidth: '155px',
                }}>
                    {
                        roomEquipment && roomEquipment.map((item, index) => {
                            return (
                            <div
                                key={index}
                                className="equipment-item"
                            >
                                {item}
                            </div>
                            )
                        })
                    }
                </Box>
            </CardContent>
            {
                needsButton && (
                    <CardActions sx={{marginTop: 'auto', display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={(e) => selectRoom(e, _id)} size="small">Select</Button>
                    </CardActions>
                )
            }
        </Card>
    );
};

export default RoomComponent;