import React, { useState } from 'react';

import {
    Select,
    MenuItem,
    InputLabel,
    FormControl
  } from "@mui/material";

const ComboboxCustom = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [checked, setChecked] = useState(1);

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
        const domainID = event.target.value 
        setChecked(domainID)
        props.onChecked(domainID)
    };

    return (
        <>
            <FormControl>
                <InputLabel id="select-category">{ props.label }</InputLabel>
                <Select
                    labelId="select-category"
                    id="demo-simple-select-standard"
                    // value={1}
                    defaultValue={props.selectedIndex ? props.selectedIndex : 1}
                    onChange={handleComboboxChange}
                    label={props.label}
                >
                    { renderCombobox(props.data) }
                </Select>
            </FormControl>
        </>
    )
}

export default ComboboxCustom;

  
// const mapStateToProps = (state, ownProps) => {
//     return { 
//         roles: Object.values(state.roles),
//     };
//   };
  
// export default connect(
//     mapStateToProps,
//     { 
//         fetchRoles,
//     }
// )(ComboboxCustom);