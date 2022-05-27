import React from 'react';
import {steps} from "../../../constants/stepperConstants";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

const StepperComponent = ({activeStep}) => {
    return (
        <Stepper
            activeStep={activeStep}
            sx={{
                marginBottom: '50px'
            }}
        >
            {steps.map((label) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default StepperComponent;