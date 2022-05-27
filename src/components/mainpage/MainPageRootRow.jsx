import {TableCell} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Temporal} from "@js-temporal/polyfill";
import {v4} from "uuid";
import {selectColor} from "../../constants/styleConstants";
import React from "react";

function MainPageRootRow({date, events}) {
    return (
        <React.Fragment>
            <TableCell sx={{border: '0'}}>
                <Typography>
                    {date
                        ? Temporal.PlainDateTime.from(date)
                            .toPlainTime().toString({smallestUnit: "minute"})
                        : 'Time exp.'}
                </Typography>
            </TableCell>
            <TableCell sx={{display: 'flex', flexWrap: 'wrap', border: '0'}}>
                {events && events.map((event, color) =>
                    <Typography key={v4()}
                                sx={{
                                    backgroundColor: `${selectColor(color)}`,
                                    maxWidth: '1.8rem',
                                    borderRadius: '4px',
                                    padding: '0.15rem 0.3rem',
                                    textAlign: 'center',
                                    margin: '5px'
                                }}
                    >
                        {event.room ? event.room?.roomNumber : 'Room exp.'}
                    </Typography>
                )}
            </TableCell>
        </React.Fragment>
    );

}

export default MainPageRootRow;