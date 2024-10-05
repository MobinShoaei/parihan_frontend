import {
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    FormLabel,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    RadioGroup,
    Stack,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useIsMobile } from '../../../hook/useIsMobile';
import { useRouter } from 'next/router';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import { FaBook, FaEye, FaSpellCheck, FaFileAlt } from 'react-icons/fa';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '../Menu';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Modal from '../../../common/Modal';
import { VariableModal } from '../VariableModal';

export const SingleArticle = () => {
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
                sx={{ '.muirtl-4t3x6l-MuiPaper-root-MuiDrawer-paper': { width: '100%' } }}
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

                            <List
                                sx={{
                                    width: '100%',
                                    '& .Mui-selected': {
                                        color: '#fff !important',
                                        background: 'rgb(117, 26, 41) !important',
                                        borderRadius: '10px',
                                    },
                                    '& .Mui-selected:hover': {
                                        background: 'rgb(117, 26, 41)',
                                    },
                                    '& svg': {
                                        color: '#d1c5bb',
                                    },
                                    '.muirtl-66vpte-MuiButtonBase-root-MuiListItemButton-root:hover':
                                        {
                                            borderRadius: '10px',
                                        },
                                    '& .MuiListItemButton-root': {
                                        borderRadius: '10px',
                                    },
                                }}
                            >
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={
                                            router.pathname.split('/').length == 3 &&
                                            router.pathname.includes('courses')
                                        }
                                        onClick={(event) => router.push('/dashboard/courses')}
                                    >
                                        <ListItemIcon>
                                            <FaBook />
                                        </ListItemIcon>
                                        <ListItemText primary="دوره‌های آموزشی من" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('seen-lessons')}
                                        onClick={(event) =>
                                            router.push('/dashboard/courses/seen-lessons')
                                        }
                                    >
                                        <ListItemIcon>
                                            <FaEye />
                                        </ListItemIcon>
                                        {<ListItemText primary="درس های دیده شده" />}
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('seen-words')}
                                        onClick={(event) =>
                                            router.push('/dashboard/courses/seen-words')
                                        }
                                    >
                                        <ListItemIcon>
                                            <FaSpellCheck />
                                        </ListItemIcon>
                                        {<ListItemText primary="کلمات درس های دیده شده" />}
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('article')}
                                        onClick={() => router.push('/dashboard/courses/article')}
                                    >
                                        <ListItemIcon>
                                            <FaFileAlt />
                                        </ListItemIcon>
                                        {<ListItemText primary="مقالات انگلیسی" />}
                                    </ListItemButton>
                                </ListItem>
                            </List>
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
                    >
                        <Stack direction={'row'} alignItems={'center'}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">لیست مقالات | مقاله شماره 1</Typography>
                        </Stack>
                        <Divider sx={{ borderColor: '#751A298F', mt: 2 }} />
                        <Stack
                            alignItems={'end'}
                            mt={2}
                            sx={{ maxHeight: 'calc(100vh - 350px)', overflow: 'auto', pr: '20px' }}
                        >
                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                <Typography fontFamily={'mr-eaves-modern'} fontSize={28}>
                                    Exploring Culinary Passion
                                </Typography>
                                <QuizOutlinedIcon color="secondary" />
                            </Stack>
                            <Typography fontFamily={'mr-eaves-modern'} textAlign={'right'}>
                                Are you curious about the culinary world? Being a chef isn't just
                                about cooking food; it's about creating memorable experiences. From
                                the first sizzle of ingredients in a pan to the final presentation
                                on a plate, every step matters. How do you become a chef? Firstly,
                                you need to have a passion for food. It's not just a job; it's a way
                                of life. Many chefs start their journey at a young age,
                                experimenting in the kitchen and learning from family members. But
                                don't be afraid to pursue your dreams, no matter your age. Whether
                                you're 15 or 50 years old, it's never too late to follow your
                                passion. But what does it mean to be a chef? It's more than just
                                cooking; it's about understanding flavors, techniques, and
                                ingredients. A good chef knows how to balance flavors, create
                                beautiful presentations, and make every dish memorable. If you want
                                to become a chef, you need to study. Take cooking classes, read
                                cookbooks, and learn from experienced chefs. Practice daily and
                                don't be afraid to make mistakes. Every burnt dish is a lesson
                                learned. It's a hard road, but for those who are passionate, it's
                                worth it. The culinary world is competitive, but with dedication and
                                hard work, you can succeed. So, if you're passionate about food,
                                don't wait any longer. Start your journey to becoming a chef today!
                            </Typography>
                            <Stack
                                direction={'row'}
                                gap={1}
                                textAlign={'left'}
                                justifyContent={'start'}
                                width={'100%'}
                                mt={3}
                                sx={{ background: '#d9d9d94a', p: '10px 20px' }}
                            >
                                <DriveFileRenameOutlineIcon color="primary" />
                                <Typography>
                                    پس از مطالعه متن بالا به سوالات زیر پاسخ دهید.
                                </Typography>
                            </Stack>

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
                        <Menu open={open} setOpen={setOpen} />
                    </Stack>
                </Grid>
            )}
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                containerSx={{
                    minWidth: { md: '500px', xs: '90%' },
                    background: '#fff',
                    padding: '12px 16px',
                }}
                dir="rtl"
            >
                <VariableModal />
            </Modal>
        </Grid>
    );
};
