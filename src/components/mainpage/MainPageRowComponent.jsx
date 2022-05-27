import React from "react";
import {Collapse, TableCell, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {fromStringToInstantPlainDateTime, toNormalFormat} from "../../helper/workWithDates";
import MainPageRootRow from "./MainPageRootRow";
import MainPageChildRow from "./MainPageChildRow";

export function calculateDuration(from, to) {
    const plannedDate = fromStringToInstantPlainDateTime(from);
    const durationDate = fromStringToInstantPlainDateTime(to);

    const durationTime = plannedDate.until(durationDate);

    return toNormalFormat(durationTime);
}

function Row({row}) {
    const [date, events] = row;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            {row &&
                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCell sx={{maxWidth: '0.2rem', padding: '3px 8px', border: '0'}}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </TableCell>

                    <MainPageRootRow date={date} events={events}/>

                </TableRow>
            }
            {events &&
                <TableRow sx={{backgroundColor: '#F3F4F6'}}>
                    <TableCell style={{padding: '0'}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>

                            <MainPageChildRow events={events}/>

                        </Collapse>
                    </TableCell>
                </TableRow>
            }
        </React.Fragment>
    );
}

export default Row;