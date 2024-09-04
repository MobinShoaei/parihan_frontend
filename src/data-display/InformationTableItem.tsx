import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TableItem} from '../data-display/TableItem';
import {InformationDetails} from '../data-display/InformationDetails';
import {Accordion, AccordionDetails, AccordionSummary, Box, Divider} from '@mui/material';
import {FormContentType} from '../dashboard/InformationTable';
import {formFieldsType} from '../dashboard/InformationForm';

type InformationTableItemProps = {
    data: FormContentType;
    index: number;
    setCheckedItems: Dispatch<SetStateAction<number[]>>;
    setTabValue: Dispatch<SetStateAction<string>>;
    formFields: formFieldsType[];
    checkedItems: number[];
    isOperator: boolean
    setEndIndex: Dispatch<SetStateAction<number | undefined>>
    setStartIndex: Dispatch<SetStateAction<number | undefined>>
    page: number
    inputRef: any
};

export const InformationTableItem = (props: InformationTableItemProps) => {
    const [accordionVisibility, setAccordionVisibility] = useState<boolean>(false);


    return (
        <Box ref={props.inputRef} id={props.data.id.toString()}>
            <TableItem
                opened={accordionVisibility}
                data={props.data}
                index={props.index}
                setTabValue={props.setTabValue}
                formFields={props.formFields}
                setCheckedItems={props.setCheckedItems}
                checkedItems={props.checkedItems}
                isOperator={props.isOperator}
                setStartIndex={props.setStartIndex}
                setEndIndex={props.setEndIndex}
                page={props.page}
            />
            {/*<div ref={recordRef}/>*/}
        </Box>

    );
};
