import React from 'react';
import CitySelectComponent from "../../components/booking/booking-city&date/CitySelectComponent";
import TimeBookingFormContainer from "../../containers/booking/TimeBookingFormContainer";
import Container from "@mui/material/Container";
import FreeRoomsComponent from "./FreeRoomsComponent";
import {Box} from "@mui/material";

const EmptyRoomsPageComponent = (
    {
        selectedCity,
        handleCityChange,
        selectedDate,
        handleDateChange,
        emptyRoomsList,
        setEmptyRoomsList,
        changeEmptyRoomsList,
        selectedTime,
        setSelectedTime,
        isLoading,
        equipmentSelected,
        setEquipmentSelected,
        selectedCapacity,
        setSelectedCapacity,
        list,
        alignment,
        setAlignment,
        quickTimeSelect,
        setQuickTimeSelect,
        disabled,
        setDisabled,
    }
) => {

    return (
        <Box sx={{mr:10}}>
            <section className="empty-rooms-page">
                <Container className="city-date" maxWidth={'xs'}>
                    <CitySelectComponent
                        city={selectedCity}
                        handleCityChange={handleCityChange}
                        selectedDate={selectedDate}
                        handleDateChange={handleDateChange}
                    />
                    <TimeBookingFormContainer
                        emptyRoomsList={emptyRoomsList}
                        changeEmptyRoomsList={() => {
                            changeEmptyRoomsList();
                            setEquipmentSelected([]);
                            setSelectedCapacity(0);
                        }}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        isLoading={isLoading}
                        setQuickTimeSelect={setQuickTimeSelect}
                        quickTimeSelect={quickTimeSelect}
                        setAlignment={setAlignment}
                        alignment={alignment}
                        disabled={disabled}
                        setDisabled={setDisabled}
                    />
                </Container>
                <Container className="filters" maxWidth={'md'}>
                    <FreeRoomsComponent
                        equipmentSelected={equipmentSelected}
                        setEquipmentSelected={setEquipmentSelected}
                        emptyRoomsList={emptyRoomsList}
                        setEmptyRoomsList={setEmptyRoomsList}
                        selectedCapacity={selectedCapacity}
                        setSelectedCapacity={setSelectedCapacity}
                        list={list}
                        needsButton={false}
                    />
                </Container>
            </section>
        </Box>
    );
};

export default EmptyRoomsPageComponent;