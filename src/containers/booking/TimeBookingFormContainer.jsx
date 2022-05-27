import React, {useEffect, useState} from 'react';
import TimeBookingFormComponent from "../../components/booking/booking-time/TimeBookingFormComponent";
import {Temporal} from "@js-temporal/polyfill";

const TimeBookingFormContainer = (
    {
        emptyRoomsList,
        changeEmptyRoomsList,
        selectedTime,
        setSelectedTime,
        isLoading,
        quickTimeSelect,
        setDisabled,
        alignment,
        setQuickTimeSelect,
        disabled,
        setAlignment,
    }
) => {

    useEffect(() => {
        if (quickTimeSelect !== null) {
            setSelectedTime({
                from: selectedTime.from,
                to: selectedTime.from.add(quickTimeSelect)
            })
            setDisabled(true);
        }
    }, [quickTimeSelect, selectedTime.from, setSelectedTime, setDisabled]);

    useEffect(() => {
        if (alignment == null) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [alignment, setDisabled])

    const changeFromTime = (e) => {
        e.preventDefault();

        const [hour, minute] = e.target.value.split(':');
        const newValue = Temporal.PlainTime.from({hour, minute});

        switch (Temporal.PlainTime.compare(newValue, selectedTime.to)) {
            case 1:
                setQuickTimeSelect(null);
                setSelectedTime({
                    from: newValue,
                    to: newValue.add(
                        Temporal.Duration.from({minutes: 1})
                    )
                });
                break;
            case 0:
                setQuickTimeSelect(null);
                setSelectedTime({
                    from: newValue,
                    to: newValue.add(
                        Temporal.Duration.from({minutes: 1})
                    )
                });
                break;
            case -1:
                setQuickTimeSelect(null);
                setSelectedTime({
                    from: newValue,
                    to: selectedTime.to
                });
                break;
            default:
                break;
        }
    }

    const changeToTime = (e) => {
        e.preventDefault();

        const [hour, minute] = e.target.value.split(':');
        const newValue = Temporal.PlainTime.from({hour, minute});

        switch (Temporal.PlainTime.compare(newValue, selectedTime.from)) {
            case 1:
                setQuickTimeSelect(null);
                setSelectedTime({
                    from: selectedTime.from,
                    to: newValue
                });
                break;
            case 0:
                setQuickTimeSelect(null);
                setSelectedTime({
                    from: selectedTime.from,
                    to: selectedTime.from.add(
                        Temporal.Duration.from({minutes: 1})
                    )
                });
                break;
            case -1:
                setQuickTimeSelect(null);
                setSelectedTime({
                    from: selectedTime.from,
                    to: selectedTime.from.add(
                        Temporal.Duration.from({minutes: 1})
                    )
                });
                break;
            default:
                break;
        }
    }

    return (
        <TimeBookingFormComponent
            emptyRoomsList={emptyRoomsList}
            changeEmptyRoomsList={changeEmptyRoomsList}
            selectedTime={selectedTime}
            changeFromTime={changeFromTime}
            changeToTime={changeToTime}
            setQuickTimeSelect={setQuickTimeSelect}
            isLoading={isLoading}
            disabled={disabled}
            alignment={alignment}
            setAlignment={setAlignment}
        />
    );
};

export default TimeBookingFormContainer;