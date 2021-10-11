import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDialog } from 'react-st-modal';


const FormEdit = ({ formConfig, initialValue, fields, onSubmit }) => {

    const [value, setValue] = useState(initialValue);
    const dialog = useDialog();
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    const renderFields = () => {
        return (
            fields
                .filter(field => field.editable)            
                .map(field => {
                    return (
                        <TextField 
                            id="outlined-basic" 
                            label={field ? field.headerName : ''} 
                            variant="outlined"
                            fullWidth
                            defaultValue={initialValue ? initialValue[field.field] : ''}
                            onChange={(e) => handleChange(field.field, e.target.value)} 
                        />
                    )
        }))
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        dialog.close(value)
        onSubmit(value)
    }
    const onCancelForm = (event) => {
        event.preventDefault();
        dialog.close(value)
    }

    const renderActions =() => {
        return (
            <div className="flex justify-end gap-2 my-2">
                <button
                    onClick={e => onSubmitForm(e)}
                    className="px-4 py-2 text-white bg-green-500 rounded-lg"
                >
                    { formConfig ? formConfig.button_text_ok : '' }
                </button>
                <button
                    onClick={e => onCancelForm(e)}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg"
                >
                    { formConfig ? formConfig.button_text_cancel : '' }
                </button>
            </div>
        )
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '60ch' },
            }}
            noValidate
            autoComplete="off"
            className="flex flex-col items-center"
        >
            { renderFields() }
            { renderActions() }
        </Box>
    )
}

export default FormEdit;