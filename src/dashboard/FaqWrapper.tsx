import {LoadingButton, TabContext, TabList, TabPanel} from '@mui/lab';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Skeleton,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import {Box} from '@mui/system';
import React, {useEffect, useState} from 'react';
import {SearchInput} from '../inputs/SearchInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {CircularProgress} from '@mui/material';
import useDebounce from '../hook/useDebounse';
import {Wrapper} from '../common/Wrapper';
import {checkProperties} from '../../utils/functions';
import RichTextEditor from "../inputs/RichTextEditor";
import RichTextEditorReadOnly from "../inputs/RichTextEditorReadOnly";

interface FaqWrapperProps {
    id: number;
    callText?: string;
    information?: string;
    loading?: boolean;
}

export type FaqApiResponse = {
    id: number;
    question: string;
    answer: string;
    project: number;
    is_visible: boolean;
};

export const FaqWrapper = (props: FaqWrapperProps) => {
    // state
    const [rerender, setRerender] = useState<boolean>(false);
    const [value, setValue] = useState<string>('1');
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [data, setData] = useState<FaqApiResponse[]>();

    // This variable changes when you stop typing search input after 500 milliseconds
    const searchDebounse = useDebounce(searchValue, 500);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        setSearchLoading(true);
        sendRequest<{ results: FaqApiResponse[]; count: number }>(
            BackendUrls.faq,
            HttpMethod.GET,
            checkProperties({
                project: props.id,
                search: searchValue,
            }),
        )
            .then((response) => {
                setData(response.data.results);
            })
            .catch((error) => {
            })
            .finally(() => {
                setSearchLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id, searchDebounse, rerender]);

    useEffect(() => {
        setSearchValue('');
        setData(undefined);
    }, [props.id]);

    const editorStyle = {
        textAlign: 'left',
        lineHeight: '43px',
        height: '100%',
        whiteSpace: 'pre-line',
        '& .ql-editor': {
            // height: '400px',
            textAlign: 'left',
            width: '100%',
            direction: 'ltr',
            fontFamily: 'iranSans',
            'li:not(.ql-direction-rtl)::before': {
                marginRight: 'unset '
            }
        },
        '& .ql-toolbar': {
            direction: 'rtl',
        },
        '& .ql-container': {border: 'none'}
    }
    return (
        <Wrapper
            sx={{
                '& .MuiTabs-flexContainer .Mui-selected': {
                    color: '#2B2828',
                    fontSize: {md: '14px', xs: '12px'},
                    fontWeight: '500',
                },
                height: {md: 'calc(100vh - 195px)', xs: '340px'},
            }}
        >
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'secondary.light'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        sx={{'& button': {fontSize: {md: '14px', xs: '12px'}}}}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="سوالات متداول کسب‌و‌کار" value="1"/>
                        <Tab label="متن مکالمه با مشتری" value="2"/>
                        <Tab label="اطلاعات پایه کسب‌وکار" value="3"/>
                    </Tabs>
                </Box>
                <TabPanel
                    value="1"
                    sx={{
                        padding: {md: '19px 13px', xs: '13px 9px'},
                        height: 'calc( 100% - 46px )',
                    }}
                >
                    <SearchInput
                        loading={searchLoading}
                        value={searchValue}
                        setSearchValue={setSearchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFinish={() => {
                            setRerender((o) => !o);
                        }}
                        placeholder="کلیدواژه سوال مشتری یا جواب کارشناس را وارد کنید؛ مثلا تعرفه"
                    />
                    <Box
                        sx={{
                            mt: 2,
                            height: '100%',
                            overflow: 'auto',
                            direction: 'rtl',
                            paddingLeft: '10px',
                            maxHeight: 'calc(100% - 66px)'
                        }}
                    >
                        {data ? (
                            data.map((item, index) => {
                                if (item.is_visible) {
                                    return (
                                        <Accordion
                                            key={index.toString()}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'secondary.light',
                                                boxShadow: 'none',
                                                borderRadius: '4px',
                                                mb: 1,
                                                direction: 'ltr',
                                                '& .MuiButtonBase-root': {padding: '12px 10px'},
                                                '& .MuiButtonBase-root .muirtl-o4b71y-MuiAccordionSummary-content':
                                                    {margin: 0},
                                                '& .muirtl-eb1v2s-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded':
                                                    {
                                                        minHeight: 0,
                                                    },
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={
                                                    <ExpandMoreIcon
                                                        sx={{color: 'secondary.main'}}
                                                    />
                                                }
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                sx={{margin: 0}}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: {md: '15px', xs: '13px'},
                                                        whiteSpace: 'pre-line',
                                                    }}
                                                >
                                                    {item.question}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    sx={{
                                                        whiteSpace: 'pre-line',
                                                        fontSize: {md: '14px', xs: '11.5px'},
                                                    }}
                                                >
                                                    {item.answer}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                }
                            })
                        ) : (
                            <Box>
                                {[...Array(4)].map((item, key) => {
                                    return <Skeleton height={'100px'} key={key}/>;
                                })}
                            </Box>
                        )}
                    </Box>
                </TabPanel>
                <TabPanel
                    value="2"
                    sx={{
                        padding: '15px',
                        height: 'calc( 100% - 46px )',
                        overflow: 'auto',
                    }}
                >
                    <Typography
                        fontSize={17}
                        sx={editorStyle}

                    >
                        {!props.loading ? (
                            props.callText !== undefined && (
                                <RichTextEditorReadOnly value={props.callText}/>
                            )
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    // paddingTop: '30px',
                                    justifyContent: 'center',
                                    height: '100%',
                                }}
                            >
                                {[...Array(19)].map((item, key) => {
                                    return (
                                        <Skeleton
                                            key={key}
                                            width={'70%'}
                                            animation="wave"
                                            height={15}
                                            style={{marginBottom: 10}}
                                        />
                                    );
                                })}
                            </Box>
                        )}
                    </Typography>
                </TabPanel>
                <TabPanel
                    value="3"
                    sx={{
                        padding: '15px',
                        height: 'calc( 100% - 46px )',
                        overflow: 'auto',
                    }}
                >
                    <Typography
                        fontSize={17}
                        sx={editorStyle}
                    >
                        {!props.loading ? (
                            props.information !== undefined && (
                                <RichTextEditorReadOnly value={props.information}/>
                            )
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    // paddingTop: '30px',
                                    justifyContent: 'center',
                                    height: '100%',
                                }}
                            >
                                {[...Array(19)].map((item, key) => {
                                    return (
                                        <Skeleton
                                            key={key}
                                            width={'70%'}
                                            animation="wave"
                                            height={15}
                                            style={{marginBottom: 10}}
                                        />
                                    );
                                })}
                            </Box>
                        )}
                    </Typography>
                </TabPanel>
            </TabContext>
        </Wrapper>
    );
};
