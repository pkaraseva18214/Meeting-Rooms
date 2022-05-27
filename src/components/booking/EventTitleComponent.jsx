import React from 'react';
import TextField from '@mui/material/TextField';
import {formStyles} from "../../constants/styleConstants";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const EventTitleComponent = ({title, setTitle, description, setDescription}) => {
    return (
        <Box sx={{
            ...formStyles,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            width: {
                md: '300px',
                xs: '240px',
            },
            margin: '0 auto',
        }}>
            <Box >
                <Typography mb={2}>
                    Enter the title of the event
                </Typography>
                <TextField
                    fullWidth
                    size="small"
                    label="Required"
                    required
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </Box>
            <Box>
                <Typography mb={2}>
                    Enter event description
                </Typography>
                <TextField
                    size="small"
                    multiline
                    fullWidth
                    label="Required"
                    required
                    maxRows={4}
                    id="descr"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </Box>
        </Box>
    );
};

export default EventTitleComponent;