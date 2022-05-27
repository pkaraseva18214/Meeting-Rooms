import Typography from "@mui/material/Typography";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {v4} from "uuid";
import {selectColor} from "../../constants/styleConstants";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
import {calculateDuration} from "./MainPageRowComponent";
import {useNavigate} from "react-router-dom";
import {PATH} from '../../constants/mainConstants'

function MainPageChildRow({events}) {
    const navigate = useNavigate();

    return (
            <Box sx={{margin: 1}}>
                <Typography variant="h6" gutterBottom component="div">
                    More information
                </Typography>
                <Table size="small" aria-label="more">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{padding: '3px 8px'}}>ROOM</TableCell>
                            <TableCell sx={{padding: '3px 8px'}}>TITLE</TableCell>
                            <TableCell sx={{padding: '3px 8px'}}>DURATION</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event, color) =>
                            <TableRow key={v4()}>
                                <TableCell>
                                    <Typography sx={{
                                        textAlign: 'center',
                                        backgroundColor: `${selectColor(color)}`,
                                        maxWidth: '1.8rem', marginBottom: '5px',
                                        borderRadius: '4px', padding: '0.15rem 0.3rem'
                                    }}>
                                        {event.room ? event.room?.roomNumber : 'Room exp.'}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{padding: '3px 8px'}}>
                                    <Typography sx={{}}>
                                        {event.title ?
                                            event.title.length > 40
                                                ? event.title.slice(0,40) + '...'
                                                : event.title
                                            : 'Title exp.'}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{padding: '3px 8px'}}>
                                    {calculateDuration(event.from, event.to)}
                                </TableCell>
                                <TableCell sx={{padding: '3px 8px'}}>
                                    <Button size="small"
                                    onClick={() => navigate(`${PATH.EVENTS}/${event._id}`)}>
                                        see...
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
    );
}

export default MainPageChildRow;