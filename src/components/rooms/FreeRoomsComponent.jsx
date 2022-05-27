import React, {useEffect} from 'react';
import {formStyles} from "../../constants/styleConstants";
import {
    Stack,
} from "@mui/material";
import Box from '@mui/material/Box';
import RoomComponent from "./RoomComponent";
import EquipmentSelectComponent from "../booking/EquipmentSelectComponent";
import CapacitySelectComponent from "../booking/CapacitySelectComponent";

function hasAllEquipment(neededEq, currentEq) {
    for (let i = 0; i < neededEq.length; i++) {
        if (currentEq.indexOf(neededEq[i]) === -1) {
            return false;
        }
    }
    return true;
}

const FreeRoomsComponent = (
    {
        equipmentSelected,
        setEquipmentSelected,
        selectedCapacity,
        setSelectedCapacity,
        emptyRoomsList,
        setEmptyRoomsList,
        selectRoom,
        selectedRoom,
        list,
        needsButton,
    }
) => {
    useEffect(() => setEmptyRoomsList(list.filter((room) =>
            (room.capacity >= selectedCapacity) && hasAllEquipment(equipmentSelected, room.equipment)))
        , [list, setEmptyRoomsList, equipmentSelected, selectedCapacity])

    const handleCapacityChange = (e) => {
        setSelectedCapacity(e.target.value);
    }

    const handleEquipmentChange = (event) => {
        const {
            target: {value},
        } = event;
        setEquipmentSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Stack sx={{...formStyles, padding: '20px'}} spacing={3}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                flexDirection: {
                    xs: 'column',
                    md: 'column',
                    lg: 'row',
                    xl: 'row',
                }
            }}
            >
                <EquipmentSelectComponent
                    equipmentSelected={equipmentSelected}
                    handleEquipmentChange={handleEquipmentChange}
                />
                <CapacitySelectComponent
                    selectedCapacity={selectedCapacity}
                    handleCapacityChange={handleCapacityChange}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: {xs: 'center', md: 'flex-around'},
                minWidth: {md: 275, xs: 230},
            }}>
                {
                    emptyRoomsList.length ? emptyRoomsList.map((room) =>
                        (<RoomComponent
                            key={room._id}
                            _id={room._id}
                            roomNumber={room.roomNumber}
                            roomEquipment={room.equipment}
                            roomDescription={room.description}
                            roomPeopleCapacity={room.capacity}
                            selectRoom={selectRoom}
                            selectedRoom={selectedRoom}
                            needsButton={needsButton}
                        />)) : <div className="no-rooms">No rooms</div>
                }
            </Box>
        </Stack>
    );
};

export default FreeRoomsComponent;