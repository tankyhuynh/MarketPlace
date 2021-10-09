import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDialog } from 'react-st-modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// const categories_test = [
//     {
//         name: '1',
//         code: 'CODE1'
//     },
//     {
//         name: '2',
//         code: 'CODE2'
//     }
// ]


const FormEditField = ({ formConfig, initialValue, fields, onSubmit, fetchCategories, categories }) => {

    const [value, setValue] = useState(initialValue);
    const dialog = useDialog();

    const handleComboboxChange = (event) => {
        setValue(previousState => ({...previousState, categoryId: event.target.value }))
    };
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    const renderCombobox = (items) => {

        const renderItems = items 
                    ? items.map(item => {
                        return <MenuItem value={item.id}>{item.name}</MenuItem>
                    })
                    : null

        return (
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={1}
                defaultValue={initialValue ? initialValue.category.id : 1}
                onChange={handleComboboxChange}
                label="Category"
            >
               { renderItems }
            </Select>
        )
    }

    const renderFields = () => {
        return (
            fields
                .filter(field => field.editable && field.type === 'text')            
                .map(field => {
                    return (
                        <TextField 
                            id="outlined-basic" 
                            label={field ? field.field : ''} 
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
            <div className="flex gap-2">
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
            { renderCombobox(categories) }
            { renderActions() }
        </Box>
    )
}


export default FormEditField;