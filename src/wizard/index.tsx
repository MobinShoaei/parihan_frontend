import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import {Stack, StepLabel} from "@mui/material";
import {CreateB} from "./CreateB";
import {Intro} from "./Intro";
import {OperatorNeeded} from "./OperatorNeeded";
import {Guide} from "./Guide";
import {Final} from "./Final";
import {Fade} from '@material-ui/core';

const steps = ['createB', 'hamcall-des', 'operator-needed', 'guids', 'final'];


export const WizardWrapper = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [needOperator, setNeedOperator] = useState<boolean>(false)
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});
    const [isTransitioning, setIsTransitioning] = useState<boolean>(true)

    useEffect(() => {
        setIsTransitioning(true)
    }, [activeStep])

    const step_content: { [key: string]: JSX.Element } = {
        0: <CreateB setActiveStep={setActiveStep}/>,
        1: <Intro setActiveStep={setActiveStep}/>,
        2: <OperatorNeeded setActiveStep={setActiveStep} setNeedOperator={setNeedOperator}/>,
        3: <Guide setActiveStep={setActiveStep} needOperator={needOperator}/>,
        4: <Final/>
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
    };

    return (
        <Stack justifyContent={'center'} direction={"column"} alignItems={'center'} gap={10}>
            <Box sx={{
                width: '30%', mt: '40px', '& .MuiStep-root': {
                    '.muirtl-1dumfs0-MuiSvgIcon-root-MuiStepIcon-root': {
                        color: "#EAD3D3"
                    },
                    '.muirtl-1dumfs0-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
                        color: "#fff"
                    },
                    '.muirtl-1dumfs0-MuiSvgIcon-root-MuiStepIcon-root.Mui-active .muirtl-d6hv88-MuiStepIcon-text': {
                        fill: "#E53F4C"
                    },

                    '.muirtl-d6hv88-MuiStepIcon-text': {
                        fill: '#8C8C8C'
                    }
                }
            }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepLabel/>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Fade key={activeStep} in={isTransitioning} timeout={500} onExited={handleTransitionEnd}>
                <Stack sx={{minHeight: '800px'}} alignItems={'center'} gap={5}>
                    {step_content[activeStep]}
                </Stack>
            </Fade>
        </Stack>

    )
}