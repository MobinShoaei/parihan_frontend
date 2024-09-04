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


const RichTextEditorReadOnly: React.FC<{ value?: string }> = (props) => {

    const modules = {
        toolbar: false,
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };


    return (
        <React.Fragment>
            <ReactQuill modules={modules} theme="snow"
                        value={props.value}
                        readOnly/>

        </React.Fragment>
    );
};

export default RichTextEditorReadOnly;
