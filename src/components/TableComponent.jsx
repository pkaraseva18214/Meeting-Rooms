import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {v4} from "uuid";
import React from "react";
import Row from "./mainpage/MainPageRowComponent";
import {mainPageBoxChildStyle, mainPageTableCellStyle} from "../constants/styleConstants";
import {useSelector} from "react-redux";
import {selectCity, selectDate, selectRoom} from "../ducks/events/selector";
import {filterForMainPage} from "../helper/workWithDates";

function TableComponent({rows}) {
    const currentDate = useSelector(selectDate);
    const currentCity = useSelector(selectCity);
    const currentRoom = useSelector(selectRoom);

    const rowsToRender = filterForMainPage(rows, currentDate, currentCity, currentRoom)
        .filter((row) => row[1].length !== 0);

    if (!rowsToRender.length > 0) {
        return (
            <React.Fragment>
                <Typography variant="h3"
                            sx={{textAlign: 'center'}}
                            className="noEvents"
                >
                    NO EVENTS TODAY!
                </Typography>
            </React.Fragment>
        );
    } else if (rowsToRender.length > 0) {
        return (
            <Box sx={mainPageBoxChildStyle}>
                <TableContainer sx={{maxWidth: '720px'}} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={mainPageTableCellStyle}/>
                                <TableCell sx={mainPageTableCellStyle}>
                                    <Typography>
                                        Time
                                    </Typography>
                                </TableCell>
                                <TableCell sx={mainPageTableCellStyle}>
                                    <Typography>
                                        Room/s
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsToRender && rowsToRender.map((row) => (
                                <Row key={v4()} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }
}

export default TableComponent;