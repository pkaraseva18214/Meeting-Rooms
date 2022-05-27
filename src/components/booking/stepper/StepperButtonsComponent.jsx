import React from 'react';
import Button from "@mui/material/Button";
import {steps} from "../../../constants/stepperConstants";
import Box from "@mui/material/Box";

const StepperButtonsComponent = ({activeStep, handleBack, handleNext, disabled}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                pt: 2
            }}
        >
            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{mr: 1}}
            >
                Back
            </Button>
            <Button disabled={disabled} onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box>
    );
};

export default StepperButtonsComponent;