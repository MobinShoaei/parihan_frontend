import {Box, Popover, TextField} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {MdOutlineDragHandle} from 'react-icons/md';
import {View} from '../common/View';
import useUpdateEffect from '../../hook/useUpdateEffect';
import {BackendUrls} from '../../../utils/backend-urls';
import {HttpMethod, sendRequest} from '../../../utils/axios';
import {catchRequestError} from '../../../utils/functions';
import {toast} from 'react-toastify';
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers";

interface TagItemProps {
    locked?: boolean;
    data?: TagType;
    setReRender: Dispatch<SetStateAction<boolean>>;
    newItem?: boolean;
}

export type TagType = {
    id: number;
    title: string;
    color_hex: string;
    order: number;
    is_visible: boolean;
};

export type visibleTag = {
    id: number;
    last_state: boolean;
};

export const Color = (props: {
    color: string;
    selected: boolean;
    setColor?: Dispatch<SetStateAction<string | undefined>>;
}) => {
    return (
        <Box
            sx={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: props.color,
                border: props.selected ? '2px solid red' : 'unset',
                p: props.selected ? '1px' : '0',
                cursor: 'pointer',
            }}
            onClick={() => props.setColor && props.setColor(props.color)}
        />
    );
};

export const TagItem = (props: TagItemProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [title, setTitle] = useState<string | undefined>(props.data?.title);
    const [color, setColor] = useState<string | undefined>(props.data?.color_hex);

    const projectId = useSelector((state: State) => state.projectId)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        !props.locked && setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const updateTag = (params: { [key: string]: string | boolean | undefined }) => {
        sendRequest(BackendUrls.tag + props.data?.id + '/', HttpMethod.PATCH, params)
            .then((res) => {
                // setTagList(res.data.results);
                props.setReRender((r) => !r);
            })
            .catch((err) => catchRequestError(err));
    };

    useUpdateEffect(() => {
        !props.newItem && updateTag({color_hex: color});
        handleClose();

    }, [color]);

    useEffect(() => {
        setTitle(props.data?.title);
        console.log(color)
    }, [props.data?.title]);

    const newTag = (title: string) => {
        sendRequest(BackendUrls.tag, HttpMethod.POST, {
            title: title,
            color_hex: color,
            project: projectId
        })
            .then((res) => {
                toast.success('وضعیت جدید با موفقیت ثبت شد');
                props.setReRender((r) => !r);
            })
            .catch((err) => catchRequestError(err));
    };

    return (
        <Box
            sx={{
                background: '#FFFFFF',
                border: '0.747929px solid #EAD3D3',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '50px',
                p: '13px 20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                }}
            >
                <MdOutlineDragHandle
                    style={{
                        fontSize: '30px',
                        color: '#EAD3D3',
                        opacity: props.locked ? '0.5' : '1',
                    }}
                />
                <Box
                    aria-describedby={id}
                    onClick={(e: any) => handleClick(e)}
                    sx={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: props.newItem ? color == undefined ? '#038cb8' : color : props.data?.color_hex,
                        cursor: 'pointer',
                        border: '1px solid rgba(128, 128, 128, 0.23)'
                    }}
                />
                <TextField
                    id="standard-basic"
                    variant="standard"
                    size="small"
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(event.target.value);
                    }}
                    placeholder={!props.newItem ? '' : 'عنوان وضعیت ...'}
                    onBlur={(e) =>
                        e.target.value.length > 0
                            ? props.newItem
                                ? newTag(e.target.value)
                                : updateTag({title: e.target.value})
                            : toast.error('عنوان وضعیت نباید خالی باشد')
                    }
                    disabled={props.locked}
                />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                {!props.newItem && (
                    <View
                        onClick={() => updateTag({is_visible: !props.data?.is_visible})}
                        locked={props.locked}
                    />
                )}
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        maxWidth: '215px',
                        flexWrap: 'wrap',
                        boxShadow: '1px 6px 15px rgba(0, 0, 0, 0.15)',
                        borderRadius: '6px',
                        p: '9px 12px',
                        justifyContent: 'space-between',
                        gap: '5px',
                    }}
                >
                    <Color color="#E53F4C" selected={color == '#E53F4C'} setColor={setColor}/>
                    <Color color="#FFAD33" selected={color == '#FFAD33'} setColor={setColor}/>
                    <Color color="#FFF733" selected={color == '#FFF733'} setColor={setColor}/>
                    <Color color="#33FF85" selected={color == '#33FF85'} setColor={setColor}/>
                    <Color color="#10D15D" selected={color == '#10D15D'} setColor={setColor}/>
                    <Color color="#06EFEF" selected={color == '#06EFEF'} setColor={setColor}/>
                    <Color color="#54B7FF" selected={color == '#54B7FF'} setColor={setColor}/>
                    <Color color="#EB00D3" selected={color == '#EB00D3'} setColor={setColor}/>
                    <Color color="#385A86" selected={color == '#385A86'} setColor={setColor}/>
                    <Color color="#2B2828" selected={color == '#2B2828'} setColor={setColor}/>
                </Box>
            </Popover>
        </Box>
    );
};
