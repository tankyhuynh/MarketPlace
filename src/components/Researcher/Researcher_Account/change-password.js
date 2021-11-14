import React from 'react';

import { TextField } from '@mui/material';

const ChangePassword = (props) => {

    const { 
        isDisable,
        password,
        handleChange

    } = props;

    return (
        <div>
            <TextField 
                fluid
                id="outlined-basic" 
                type={'password'}
                fullWidth={true}
                label={'Mật khẩu'}
                variant="outlined"
                disabled={isDisable}
                defaultValue={password}
                onChange={(e) => handleChange('password', e.target.value)}
            />
        </div>
    )
}

export default ChangePassword;