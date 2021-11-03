import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useDialog } from 'react-st-modal';
// import {
//     Select,
//     MenuItem,
//     InputLabel,
//     TextField,
//     FormControl
//   } from "@mui/material";

import TextField from '@mui/material/TextField';


const FormEditField = ({ formConfig, initialValue, fields, onSubmit, categories }) => {

    const [value, setValue] = useState(initialValue ? initialValue : { categoryId: 1 });
    const dialog = useDialog();

    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    // const handleComboboxChange = (event) => {
    //     setValue(previousState => ({...previousState, categoryId: event.target.value }))
    // };

    // const renderCombobox = (items) => {

    //     const renderItems = items 
    //                 ? items.map((item, index) => {
    //                     return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
    //                 })
    //                 : null

    //     return (
    //         <FormControl>
    //             <InputLabel id="select-category">Danh mục</InputLabel>
    //             <Select
    //                 labelId="select-category"
    //                 id="demo-simple-select-standard"
    //                 // value={1}
    //                 defaultValue={initialValue ? initialValue.category.id : 1}
    //                 onChange={handleComboboxChange}
    //                 label={"Category"}
    //             >
    //                 { renderItems }
    //             </Select>
    //         </FormControl>
    //     )
    // }

    const renderFields = () => {
        console.log('initialValue: ', initialValue)
        return (
            fields
                .filter(field => field.editable && field.type === 'text')            
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
        // onSubmit(initialValue.childOfFieldId, value)
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
            {/* { renderCombobox(categories) } */}
            { renderActions() }
        </Box>
    )
}


export default FormEditField;