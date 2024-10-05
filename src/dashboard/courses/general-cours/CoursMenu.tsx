import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CourseMenu = () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const router = useRouter();

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box>
            <Accordion dir="rtl" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    <Typography>Basic</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        <Typography variant="caption">جلسه اول : Meeting</Typography>
                        <Typography variant="caption">جلسه اول : Meeting</Typography>
                        <Typography variant="caption">جلسه اول : Meeting</Typography>
                        <Typography variant="caption">جلسه اول : Meeting</Typography>
                        <Typography variant="caption">جلسه اول : Meeting</Typography>
                        <Typography variant="caption">جلسه اول : Meeting</Typography>
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                >
                    <Typography>Intermediate</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                >
                    <Typography>Upper Intermediate</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                >
                    <Typography>Pre Advanced</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography></Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};
