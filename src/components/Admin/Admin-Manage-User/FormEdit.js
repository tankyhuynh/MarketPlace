import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useDialog } from 'react-st-modal';


const FormEditField = ({ formConfig, initialValue, users, onSubmit }) => {

    const [value, setValue] = useState(initialValue);
    const dialog = useDialog();

    useEffect(() => {
        // fetchCategories()
    }, [])
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    // const renderCombobox = (items) => {

    //     const renderItems = items.map(item => {
    //         return <option value="A">{ item.name }</option>
    //     })

    //     return (
    //         <select value={1}>
    //             { renderItems }
    //         </select>
    //     )
    // }

    const renderFields = () => {
        const usersFormat = users
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
        })

        return (
            <div className="flex flex-col gap-2">
                { usersFormat }
            </div>
        )
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

    const renderActions = () => {
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
        // <Box
        //     component="form"
        //     sx={{
        //         '& > :not(style)': { m: 1, width: '50ch' },
        //     }}
        //     noValidate
        //     autoComplete="off"
        //     className="flex flex-col items-center w-full"
        // >
        //     { renderFields() }
        //     { renderActions() }
        //     {/* { renderCombobox(categories_test) } */}
        // </Box>
        <Container 
            maxWidth="lg"
        >
            {/* <Box sx={{ bgcolor: '#cfe8fc', height: '80vh' }}> */}
            <section className="mt-2">
                { renderFields() }
            </section>
            <section>
                { renderActions() }
            </section>
            {/* </Box> */}
        </Container>
    )
}


export default FormEditField