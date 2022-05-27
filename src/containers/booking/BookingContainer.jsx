import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TimeBookingFormContainer from "./TimeBookingFormContainer";
import {Temporal} from "@js-temporal/polyfill";
import CitySelectComponent from "../../components/booking/booking-city&date/CitySelectComponent";
import FreeRoomsComponent from "../../components/rooms/FreeRoomsComponent";
import {useDispatch, useSelector} from "react-redux";
import {clearAllFreeRooms, getFreeRoomsRequest} from "../../ducks/rooms/index";
import {convertTemporalToRequestFormat} from "../../helper/workWithDates";
import StepperComponent from "../../components/booking/stepper/StepperComponent";
import {steps} from "../../constants/stepperConstants";
import SelectedEventComponent from "../../components/booking/SelectedEventComponent";
import StepperButtonsComponent from "../../components/booking/stepper/StepperButtonsComponent";
import Container from "@mui/material/Container";
import {selectFreeRooms} from "../../ducks/rooms/selectors";
import EventTitleComponent from "../../components/booking/EventTitleComponent";

const BookingContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedCity, setSelectedCity] = useState('Новосибирск');
    const [selectedDate, setSelectedDate] = useState(Temporal.Now.plainDateISO);
    const [selectedTime, setSelectedTime] = useState({
        from: Temporal.Now.plainTimeISO().add(
            Temporal.Duration.from({minutes: 5})
        ),
        to: Temporal.Now.plainTimeISO().add(
            Temporal.Duration.from({minutes: 35})
        )
    });
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [emptyRoomsList, setEmptyRoomsList] = useState([]);
    const [equipmentSelected, setEquipmentSelected] = useState([]);
    const [selectedCapacity, setSelectedCapacity] = useState(15);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quickTimeSelect, setQuickTimeSelect] = useState(null);
    const [alignment, setAlignment] = React.useState('30m');
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();
    const list = useSelector(selectFreeRooms);

    useEffect(() => {
        dispatch(clearAllFreeRooms());
    }, [dispatch]);

    useEffect(() => {
        setIsLoading(false);
        setEmptyRoomsList(list);
    }, [list]);

    const changeEmptyRoomsList = async () => {
        setIsLoading(true);
        dispatch(getFreeRoomsRequest({
            city: selectedCity,
            from: convertTemporalToRequestFormat(selectedDate, selectedTime, 'from'),
            to: convertTemporalToRequestFormat(selectedDate, selectedTime, 'to'),
        }));
    }

    const changeSelectedRoom = (e, id) => {
        e.preventDefault();
        if (selectedRoom && selectedRoom._id === id) {
            setSelectedRoom(null);
        } else {
            setSelectedRoom(emptyRoomsList.filter((room) => (room._id === id))[0]);
        }
    }

    const handleDateChange = (e) => {
        return setSelectedDate(Temporal.PlainDate.from(e.target.value));
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{width: {xs: '85%', md: '50%'}, margin: '20vh auto'}}>
            <StepperComponent activeStep={activeStep}/>
            {
                activeStep === steps.length
                    ? <SelectedEventComponent
                        selectedTime={selectedTime}
                        selectedRoom={selectedRoom}
                        selectedDate={selectedDate}
                        selectedCity={selectedCity}
                        handleBack={handleBack}
                        activeStep={activeStep}
                        title={title}
                        description={description}
                    />
                    :
                    <React.Fragment>
                        {
                            activeStep === 0 &&
                            <Container component={'section'} maxWidth={'xs'}>
                                <CitySelectComponent
                                    city={selectedCity}
                                    selectedDate={selectedDate}
                                    handleCityChange={handleCityChange}
                                    handleDateChange={handleDateChange}
                                />
                            </Container>
                        }
                        {
                            activeStep === 1 &&
                            <Container component={'section'} maxWidth={'xs'}>
                                <TimeBookingFormContainer
                                    emptyRoomsList={emptyRoomsList}
                                    changeEmptyRoomsList={changeEmptyRoomsList}
                                    selectedTime={selectedTime}
                                    setSelectedTime={setSelectedTime}
                                    isLoading={isLoading}
                                    disabled={disabled}
                                    alignment={alignment}
                                    setAlignment={setAlignment}
                                    quickTimeSelect={quickTimeSelect}
                                    setDisabled={setDisabled}
                                    setQuickTimeSelect={setQuickTimeSelect}
                                />
                            </Container>
                        }
                        {
                            activeStep === 2 &&
                            <Container component={'section'} maxWidth={'md'}>
                                <FreeRoomsComponent
                                    equipmentSelected={equipmentSelected}
                                    setEquipmentSelected={setEquipmentSelected}
                                    selectedCapacity={selectedCapacity}
                                    setSelectedCapacity={setSelectedCapacity}
                                    emptyRoomsList={emptyRoomsList}
                                    setEmptyRoomsList={setEmptyRoomsList}
                                    selectRoom={changeSelectedRoom}
                                    selectedRoom={selectedRoom}
                                    list={list}
                                    needsButton={true}
                                />
                            </Container>
                        }
                        {
                            activeStep === 3 &&
                            <Container component={'section'} maxWidth={'md'}>
                                <EventTitleComponent
                                    title={title}
                                    setTitle={setTitle}
                                    description={description}
                                    setDescription={setDescription}
                                />
                            </Container>
                        }
                        <StepperButtonsComponent
                            disabled={
                                activeStep === 2 ? !selectedRoom :
                                    activeStep === 3 ? !title || !description : false
                            }
                            activeStep={activeStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </React.Fragment>
            }
        </Box>
    );
};

export default BookingContainer;