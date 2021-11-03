import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material/';

const CheckboxCustom = ({ label, isChecked, onCheckboxChange }) => {

    const [checked, setChecked] = React.useState(isChecked);

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onCheckboxChange(isChecked)
    };

    return (
        <FormControlLabel 
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            } 
            label={label} 
        />
    );
}

  
export default CheckboxCustom