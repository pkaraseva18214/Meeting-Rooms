import React from 'react';
import {Link} from "react-router-dom";
import {PATH} from "../../constants/mainConstants";
import Typography from "@mui/material/Typography";

const DesktopLogoComponent = () => {
    return (
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
        >
            <Link className="logo" to={PATH.HOME}>
                Peregovorki
            </Link>
        </Typography>
    );
};

export default DesktopLogoComponent;