import React from 'react';
import {PATH} from "../../constants/mainConstants";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const LoginButtonComponent = () => {
    return (
        <Link style={{textDecoration: 'none'}} to={PATH.LOGIN}>
            <Button
                style={{color: 'white', borderColor: 'white'}}
                color="info"
                variant="outlined"
            >
                Login
            </Button>
        </Link>
    );
};

export default LoginButtonComponent;