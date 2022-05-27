import React, {useEffect, useState} from 'react';
import EmptyRoomsPageComponent from "../../components/rooms/EmptyRoomsPageComponent";
import {Temporal} from "@js-temporal/polyfill";
import {clearAllFreeRooms, getFreeRoomsRequest} from "../../ducks/rooms";
import {convertTemporalToRequestFormat} from "../../helper/workWithDates";
import {useDispatch, useSelector} from "react-redux";
import {selectFreeRooms} from "../../ducks/rooms/selectors";

const EmptyRoomsPageContainer = () => {
    const [selectedCity, setSelectedCity] = useState('Новосибирск');
    const [selectedDate, setSelectedDate] = useState(Temporal.Now.plainDateISO());
    const [emptyRoomsList, setEmptyRoomsList] = useState([]);
    const [selectedTime, setSelectedTime] = useState({
        from: Temporal.Now.plainTimeISO().add(
            Temporal.Duration.from({minutes: 5})
        ),
        to: Temporal.Now.plainTimeISO().add(
            Temporal.Duration.from({minutes: 30})
        )
    });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCapacity, setSelectedCapacity] = useState(0);
    const [equipmentSelected, setEquipmentSelected] = useState([]);
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
    } , [list]);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(Temporal.PlainDate.from(e.target.value));
    };

    const changeEmptyRoomsList = async () => {
        setIsLoading(true);
        dispatch(getFreeRoomsRequest({
            city: selectedCity,
            from: convertTemporalToRequestFormat(selectedDate, selectedTime, 'from'),
            to: convertTemporalToRequestFormat(selectedDate, selectedTime, 'to'),
        }));
    }

    return (
        <EmptyRoomsPageComponent
            selectedCity={selectedCity}
            handleCityChange={handleCityChange}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            emptyRoomsList={emptyRoomsList}
            setEmptyRoomsList={setEmptyRoomsList}
            changeEmptyRoomsList={changeEmptyRoomsList}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            isLoading={isLoading}
            equipmentSelected={equipmentSelected}
            setEquipmentSelected={setEquipmentSelected}
            selectedCapacity={selectedCapacity}
            setSelectedCapacity={setSelectedCapacity}
            list={list}
            quickTimeSelect={quickTimeSelect}
            setQuickTimeSelect={setQuickTimeSelect}
            alignment={alignment}
            setAlignment={setAlignment}
            disabled={disabled}
            setDisabled={setDisabled}
        />
    );
};

export default EmptyRoomsPageContainer;