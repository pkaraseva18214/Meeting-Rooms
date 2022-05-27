import React from 'react';
import {Link} from "react-router-dom";
import {PATH} from "../../constants/mainConstants";
import Typography from "@mui/material/Typography";

const MobileLogoComponent = () => {
    return (
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
        >
            <Link className="logo" to={PATH.HOME}>
                Peregovorki
            </Link>
        </Typography>
    );
};

export default MobileLogoComponent;