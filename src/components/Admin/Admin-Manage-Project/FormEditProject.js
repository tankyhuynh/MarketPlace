import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const FormEdit = ({ fields }) => {

    const renderFields = () => {
        return fields.map(field => {
            return (
                <TextField 
                    id="outlined-basic" 
                    label={field.name} 
                    variant="outlined" 
                />
            )
        })
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            { renderFields() }
        </Box>
    )
}

export default FormEdit;