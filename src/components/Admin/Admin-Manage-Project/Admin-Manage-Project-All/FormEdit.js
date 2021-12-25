import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useDialog } from 'react-st-modal';

import ComboboxHightlight from '../ProjectEdit/Stepper/ComboboxHightlight'

const FormEdit = ({ formConfig, initialValue, onSubmit }) => {
    
    const dialog = useDialog();

    const [value, setValue] = useState(initialValue ? initialValue.number : {});
    
    const onSubmitForm = (event) => {
        event.preventDefault();
        dialog.close(value)
        onSubmit(value, initialValue.id)
    }
    const onCancelForm = (event) => {
        event.preventDefault();
        dialog.close(value)
    }

    const renderHightlightIndexes = (maxNumber) => {
        let hightlightIndexes = [];
        for (var i = 1; i <= maxNumber; i++) {
            hightlightIndexes.push(i)
        } 
        
        return hightlightIndexes;
    }

    const onComboboxHightlightIndexChange = (hightlightNumber) => {
        setValue(hightlightNumber)
    }

    const renderComboboxHightlightIndex = () => {
        return (
            <>
                <ComboboxHightlight 
                    label={`Vị trí`} 
                    data={renderHightlightIndexes(10)} 
                    selectedIndex={value} 
                    onChecked={onComboboxHightlightIndexChange} 
                />
            </>
        )
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
            { renderComboboxHightlightIndex() }
            { renderActions() }
            
        </Box>
    )
}

export default FormEdit;