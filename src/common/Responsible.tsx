import {Box, SxProps} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {catchRequestError} from '../../utils/functions';
import AutoComplete from '../data-display/AutoComplete';
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";

interface ResponsibleProps {
    projectId: number;
    sx?: SxProps
    disabled?: boolean
    filter?: boolean
}

export const Responsible = (props: ResponsibleProps) => {
    const [responsibles, setResponsibles] = useState<{ label: string; value: number | string }[]>([]);

    const change_linked_user = useSelector((state: State) => state.accesses).includes("set_linked_user")

    useEffect(() => {
        sendRequest(BackendUrls.org_user, HttpMethod.GET, {project: props.projectId})
            .then((res) => {
                let persons: { label: string; value: number | string }[] = [];
                if (props.filter) persons.push({label: "خالی", value: "none"})
                res.data.results.map(
                    (item: { first_name: string; last_name: string; id: number; is_active: boolean }) => {
                        if (item.is_active) persons.push({
                            label: item.first_name + ' ' + item.last_name,
                            value: item.id,
                        });
                    },
                );
                setResponsibles(persons);
            })
            .catch((err) => catchRequestError(err));
    }, [props.projectId]);

    return (
        <Box>
            <AutoComplete
                options={responsibles}
                name="linked_user"
                label="تعیین مسئول"
                sx={props.sx ? props.sx : {
                    width: {
                        xs: '180px',
                        borderColor: 'red',
                    },
                }}
                color="info"
                disabled={props.filter ? !props.filter : props.disabled || !change_linked_user}
            />
        </Box>
    );
};
