import {
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useIsMobile } from '../../../../hook/useIsMobile';
import { useRouter } from 'next/router';
import { PartMenu } from '../Video/PartMenu';
import Radio from '@mui/material/Radio';

export const Grammer = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [answers, setAnswers] = useState<any>({});
    const [showModal, setShowModal] = useState<boolean>(false);
    const matches = useIsMobile();
    const router = useRouter();

    const handleRadioChange = (event: any) => {
        const { name, value } = event.target;
        setAnswers((prevAnswers: any) => ({
            ...prevAnswers,
            [name]: value,
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // لاگ کردن تمام مقادیر ذخیره شده
        console.log('Selected Answers:', answers);
        setShowModal(true);
    };

    return (
        <Grid container minHeight="calc(100vh - 250px)">
            {matches && (
                <BsFillMenuButtonWideFill
                    style={{
                        position: 'absolute',
                        top: 25,
                        left: 25,
                        fontSize: '22px',
                        color: '#751A29',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        console.log('sad');

                        setOpen(true);
                    }}
                />
            )}
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                sx={{ '.MuiDrawer-paper': { width: '100%' } }}
                anchor="right"
            >
                <Box sx={{ background: '#e0d0c3', padding: '15px', height: '100%' }}>
                    <Box
                        sx={{
                            background: '#fff',
                            padding: '15px',
                            boxShadow: 3,
                            borderRadius: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                            transition: 'width 0.4s',
                            height: '100%',
                        }}
                    >
                        <Stack>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'start'}
                            >
                                <img src="/images/logo.svg" width={'140px'} />
                                <VscClose
                                    size={50}
                                    color="#751A29"
                                    cursor={'pointer'}
                                    onClick={() => setOpen(false)}
                                />
                            </Stack>

                            <Divider sx={{ height: '1px', width: '100%' }} />

                            <PartMenu open={open} setOpen={setOpen} />
                        </Stack>
                    </Box>
                </Box>
            </Drawer>
            <Grid item md={7.8} xs={12}>
                <Stack gap={3}>
                    <Box
                        sx={{
                            background: '#FFF',
                            p: '20px 25px',
                            borderRadius: '20px 20px 20px 20px',
                            position: 'relative',
                            border: '1px solid #751A298F',
                        }}
                        height={550}
                        overflow={'auto'}
                    >
                        <Stack mb={3} direction={'row'} alignItems={'center'}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">سوالات گرامری جلسه اول</Typography>
                        </Stack>
                        <Typography>پس از مشاهده درس لطفا به سوالات زیر پاسخ دهید.</Typography>
                        <Divider sx={{ mt: 1 }} />
                        <Stack
                            alignItems={'end'}
                            mt={2}
                            sx={{ maxHeight: 'calc(100vh - 350px)', overflow: 'auto', pr: '20px' }}
                        >
                            <form style={{ width: '100%' }} dir="ltr" onSubmit={handleSubmit}>
                                <FormControl sx={{ width: '100%' }} variant="standard">
                                    <FormLabel id="demo-error-radios" sx={{ mt: 3 }}>
                                        1. What does the author say about the culinary world?
                                    </FormLabel>

                                    <RadioGroup
                                        aria-labelledby="demo-error-radios"
                                        name="question1" // کلید یکتا برای این گروه
                                        value={answers['question1'] || ''} // مقدار ذخیره شده در شیء
                                        onChange={handleRadioChange}
                                    >
                                        <Grid container>
                                            <Grid item md={6} xs={12}>
                                                <FormControlLabel
                                                    value="best"
                                                    control={<Radio />}
                                                    label="The best!"
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <FormControlLabel
                                                    value="worst"
                                                    control={<Radio />}
                                                    label="The worst."
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <FormControlLabel
                                                    value="best1"
                                                    control={<Radio />}
                                                    label="The best!"
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <FormControlLabel
                                                    value="worst1"
                                                    control={<Radio />}
                                                    label="The worst."
                                                />
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                    <FormLabel id="demo-error-radios" sx={{ mt: 3 }}>
                                        1. What does the author say about the culinary world?
                                    </FormLabel>

                                    <RadioGroup
                                        aria-labelledby="demo-error-radios"
                                        name="question2" // کلید یکتا برای این گروه
                                        value={answers['question2'] || ''} // مقدار ذخیره شده در شیء
                                        onChange={handleRadioChange}
                                    >
                                        <Grid container>
                                            <Grid item md={6} xs={12}>
                                                <FormControlLabel
                                                    value="best"
                                                    control={<Radio />}
                                                    label="The best!"
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <FormControlLabel
                                                    value="worst"
                                                    control={<Radio />}
                                                    label="The worst."
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <FormControlLabel
                                                    value="best1"
                                                    control={<Radio />}
                                                    label="The best!"
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <FormControlLabel
                                                    value="worst1"
                                                    control={<Radio />}
                                                    label="The worst."
                                                />
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>

                                    <Divider />
                                    <Stack alignItems={'end'}>
                                        <Button
                                            sx={{ mt: 2, mr: 1 }}
                                            type="submit"
                                            variant="contained"
                                        >
                                            ثبت پاسخ ها
                                        </Button>
                                    </Stack>
                                </FormControl>
                            </form>
                        </Stack>
                    </Box>
                </Stack>
            </Grid>
            <Grid item md={0.2} xs={12}></Grid>
            {!matches && (
                <Grid item md={4} xs={12}>
                    <Stack
                        sx={{
                            background: '#E1D0C3',
                            p: '20px 25px',
                            borderRadius: '20px 20px 20px 20px',
                            position: 'relative',
                            height: '100%',
                        }}
                        gap={8}
                    >
                        <PartMenu open={open} setOpen={setOpen} />
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};
