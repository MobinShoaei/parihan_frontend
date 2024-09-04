/**
 * تکست ادیتور
 */
import {Typography} from '@mui/material';
import {useField, useFormikContext} from 'formik';
import dynamic from 'next/dynamic';
import React from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'], // toggled buttons
        [{list: 'ordered'}, {list: 'bullet'}],

        [{color: []}], // dropdown with defaults from theme
        [{align: []}],
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        // [{ align: 'center' }, { align: '' }, { align: 'right' }, { align: 'justify' }],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const RichTextEditor: React.FC<{ name: string }> = (props) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props.name as string);

    const onChange = (value: string) => {
        setFieldValue(props.name as string, value);
    };

    return (
        <React.Fragment>
            <ReactQuill modules={modules} theme="snow" onChange={onChange} value={field.value}/>
            {meta && meta.touched && meta.error && (
                <Typography color="error">{meta.error}</Typography>
            )}
        </React.Fragment>
    );
};

export default RichTextEditor;
