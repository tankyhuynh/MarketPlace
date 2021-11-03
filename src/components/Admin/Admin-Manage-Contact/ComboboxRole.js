import React, { useState, useEffect } from 'react';
import { fetchRoles } from '../../../actions/role'

import {
    Select,
    MenuItem,
    InputLabel,
    FormControl
  } from "@mui/material";
import { connect } from 'react-redux';

const ComboboxRoleId = (props) => {

    const [rolesId, setRoleId] = useState(1);

    useEffect(() => {
        props.fetchRoles()
    }, [])

    const renderCombobox = (items) => {

        const renderedItems 
                =  items 
                    ? items.map((item, index) => {
                        return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                    })
                    : null
        return renderedItems
        
    }

    const handleComboboxChange = (event) => {
        const roleID = event.target.value 
        setRoleId(roleID)
        props.onRoleChange(roleID)
    };

    return (
        <>
            <FormControl>
                <InputLabel id="select-category">Vai trò</InputLabel>
                <Select
                    labelId="select-category"
                    id="demo-simple-select-standard"
                    // value={1}
                    defaultValue={props.selectedIndex ? props.selectedIndex : 1}
                    onChange={handleComboboxChange}
                    label={"Status"}
                >
                    { renderCombobox(props.roles) }
                </Select>
            </FormControl>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        roles: Object.values(state.roles),
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchRoles
    }
  )(ComboboxRoleId);