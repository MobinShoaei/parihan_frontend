import { Box, Typography } from '@mui/material';
import React from 'react';
import { InputItem } from './InputItem';
import { MdOutlineShortText, MdOutlineRadioButtonChecked, MdChecklistRtl } from 'react-icons/md';
import { GrTextAlignCenter } from 'react-icons/gr';
import { BsCalendar } from 'react-icons/bs';
import { TbNumbers } from 'react-icons/tb';
import { AiOutlineClockCircle } from 'react-icons/ai';
import {
    Draggable,
    DraggableStateSnapshot,
    DraggingStyle,
    Droppable,
    NotDraggingStyle,
} from 'react-beautiful-dnd';

export type controlsType = {
    type: string;
    label: string;
    icon: JSX.Element;
};

export const InputList = () => {
    const controls = [
        {
            type: 'TextField',
            label: 'کوتاه پاسخ',
            icon: <MdOutlineShortText />,
        },
        {
            type: 'MultilineField',
            label: 'بلند پاسخ',
            icon: <GrTextAlignCenter />,
        },
        {
            type: 'RadioBox',
            label: 'تک انتخابی',
            icon: <MdOutlineRadioButtonChecked />,
        },

        {
            type: 'SelectBox',
            label: 'چند انتخابی',
            icon: <MdChecklistRtl />,
        },
        {
            type: 'IntegerField',
            label: 'عددی',
            icon: <TbNumbers />,
        },
        {
            type: 'DateField',
            label: 'تاریخ',
            icon: <BsCalendar />,
        },
        {
            type: 'TimeField',
            label: 'ساعت',
            icon: <AiOutlineClockCircle />,
        },
    ];

    const getStyle = (style: any, snapshot: any) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.0000001s`,
        };
    };

    return (
        <Box
            sx={{
                background: 'rgba(234, 211, 211, 0.1)',
                border: '0.747929px solid #EAD3D3',
                borderRadius: '6px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '16px 0',
                    borderBottom: '1px solid #EAD3D3',
                }}
            >
                <Typography>فیلدهای فرم</Typography>
            </Box>
            <Droppable droppableId="controls_droppable" type="controls" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{ p: '16px', display: 'flex', flexDirection: 'column' }}
                    >
                        {controls.map((control, key) => {
                            return (
                                <Draggable
                                    key={`control_draggable_${control.type}`}
                                    draggableId={`${control.type}`}
                                    index={key}
                                >
                                    {(provided, snapshot) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{ mb: '10px' }}
                                            style={getStyle(
                                                provided.draggableProps.style,
                                                snapshot,
                                            )}
                                        >
                                            <InputItem
                                                key={key}
                                                icon={control.icon}
                                                title={control.label}
                                            />
                                        </Box>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Box>
    );
};
