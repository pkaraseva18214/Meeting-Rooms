import {mainPageBoxStyle} from "../../constants/styleConstants";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {PATH} from "../../constants/mainConstants";
import React from "react";
import {useNavigate} from "react-router-dom";
import MainPageNavigator from "./MainPageNavigator";
import MainPageTableComponent from "./MainPageTableComponent";
import MainPageRoomAndCityFilters from "./MainPageRoomAndCityFilters";

function MainPageComponent({rows}) {
    const navigate = useNavigate();

    return (
        <Box sx={mainPageBoxStyle}>

            <MainPageNavigator/>
            <MainPageRoomAndCityFilters />

            <MainPageTableComponent rows={rows}/>

            <Button variant="contained" size="large"
                    sx={{marginTop: '1rem'}}
                    onClick={() => navigate(PATH.BOOKING)}
            >
                Add event
            </Button>
        </Box>
    );
}




export default MainPageComponent;