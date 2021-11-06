import React, { useState, useEffect } from 'react';

import {
    Select,
    MenuItem,
    InputLabel,
    FormControl
  } from "@mui/material";
import { connect } from 'react-redux';

import { fetchDomains } from '../../../actions/domain';

const ComboboxCustom = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [checked, setChecked] = useState(1);

    useEffect(() => {
        props.fetchDomains()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderCombobox = (items) => {

        const renderedItems 
                =  items 
                    ? items.map((item, index) => {
                        return (
                            <MenuItem 
                                key={index} 
                                value={item.id}
                            >
                                {item.name}
                            </MenuItem>
                        )
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
                    { renderCombobox(props.domains) }
                </Select>
            </FormControl>
        </>
    )
}

const mapStateToProps = (state) => {
    return { 
        domains:  Object.values(state.domains),
    };
}
  
export default connect(
    mapStateToProps, 
    { fetchDomains }
)(ComboboxCustom);