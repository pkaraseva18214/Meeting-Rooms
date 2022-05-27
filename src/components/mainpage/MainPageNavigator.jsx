import {Temporal} from "@js-temporal/polyfill";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {Input} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {useDispatch, useSelector} from "react-redux";
import {eventsByCurrentDate} from "../../ducks/events";
import {selectDate} from "../../ducks/events/selector";

const MainPageNavigator = React.memo(() => {
    const dispatch = useDispatch();
    const currentDateBySelect = useSelector(selectDate);
    const [currentDate, setCurrentDate] = useState(currentDateBySelect);

    const handleCalendarFunctions = {
        subtractDateHandler: (e) => {
            e.preventDefault();
            const newDate = currentDate.subtract({days: 1});
            dispatch(eventsByCurrentDate(newDate));
            return setCurrentDate(newDate);
        },
        addDateHandler: (e) => {
            e.preventDefault();
            const newDate = currentDate.add({days: 1});
            dispatch(eventsByCurrentDate(newDate));
            return setCurrentDate(newDate);
        },
        changeDateHandler: (e) => {
            e.preventDefault();
            const newDate = Temporal.PlainDate.from(e.target.value);
            dispatch(eventsByCurrentDate(newDate));
            return setCurrentDate(newDate);
        },
    }

    return (
        <React.Fragment>
            <Button onClick={handleCalendarFunctions.subtractDateHandler}>
                <KeyboardArrowLeftIcon/>
            </Button>

            <Input type={'date'} value={currentDate.toString()}
                   onChange={handleCalendarFunctions.changeDateHandler}
                   sx={{maxWidth: '9rem'}}/>

            <Button onClick={handleCalendarFunctions.addDateHandler}>
                <KeyboardArrowRightIcon/>
            </Button>
        </React.Fragment>
    );
})

export default MainPageNavigator;