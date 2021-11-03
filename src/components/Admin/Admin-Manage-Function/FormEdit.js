import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDialog } from 'react-st-modal';

import Combobox from './Combobox'

const TYPE_TEXT = 'text'
const TYPE_COMBOBOX = 'combobox'

const FormEdit = (props) => {

    const [value, setValue] = useState({...props.initialValue, roleId: props.initialValue ? props.initialValue.role.id : 1});
    const dialog = useDialog();

    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    const renderFields = () => {
        return (
            props.fields
                .filter(field => field.editable && field.type === TYPE_TEXT)            
                .map(field => {
                    return (
                        <TextField 
                            id="outlined-basic" 
                            label={field ? field.headerName : ''} 
                            variant="outlined"
                            fullWidth
                            defaultValue={props.initialValue ? props.initialValue[field.field] : ''}
                            onChange={(e) => handleChange(field.field, e.target.value)} 
                        />
                    )
        }))
    }

    const onComboboxChange = (roleId) => {
        console.log('Combobox change - roleId: ', roleId)
        handleChange('roleId', roleId)
    }

    const renderComboboxFields = () => {
        const usersFormat = props.fields
                            .filter(field => ( field.editable && field.type === TYPE_COMBOBOX) )            
                            .map(field => {
                               return (
                                <Combobox 
                                    label={field.headerName}
                                    data={props.data} 
                                    selectedIndex={props.initialValue ? props.initialValue.role.id : 1} 
                                    onChecked={onComboboxChange} 
                                />
                            )
        })
    
        return (
            <div className="flex flex-col gap-5">
                { usersFormat }
            </div>
        )
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log('onSubmitForm value: ', value)
        dialog.close(value)
        props.onSubmit(value)
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
                    { props.formConfig ? props.formConfig.button_text_ok : '' }
                </button>
                <button
                    onClick={e => onCancelForm(e)}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg"
                >
                    { props.formConfig ? props.formConfig.button_text_cancel : '' }
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
            { renderComboboxFields() }
            { renderActions() }
        </Box>
    )
}

  
export default FormEdit