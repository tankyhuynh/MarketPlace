import React, { useState, useEffect } from 'react';
import { fetchStatuses } from '../../../../../actions/status'

import {
    Select,
    MenuItem,
    InputLabel,
    FormControl
  } from "@mui/material";
import { connect } from 'react-redux';

const ComboboxStatusId = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [statusId, setStatusId] = useState(1);

    useEffect(() => {
        props.fetchStatuses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const statusID = event.target.value 
        setStatusId(statusID)
        props.onStatusChange(statusID)
    };

    return (
        <FormControl>
                <InputLabel id="select-category">Trạng thái</InputLabel>
                <Select
                    labelId="select-category"
                    id="demo-simple-select-standard"
                    // value={1}
                    defaultValue={props.selectedIndex ? props.selectedIndex : 1}
                    onChange={handleComboboxChange}
                    label={"Status"}
                >
                    { renderCombobox(props.status) }
                </Select>
        </FormControl>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        status: Object.values(state.status),
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchStatuses
    }
  )(ComboboxStatusId);