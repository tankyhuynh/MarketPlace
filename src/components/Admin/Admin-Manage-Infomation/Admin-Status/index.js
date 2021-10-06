/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Confirm } from 'react-st-modal';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-definition';

import { fetchStatuses } from '../../../../actions/status'
import { connect } from 'react-redux';


const AdminStatus = (props) => {

    // const [levels, setLevels] = useState({});
    const [editRowsModel, setEditRowsModel] = useState({});

    useEffect(() => {
        props.fetchStatuses()
    }, [])

    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
        // setLevels(previousState => ({...previousState, editRowsModel}))
    }, []);

    const onCellEditStop = async() => {
        const modal = {
            title: 'Are you sure?',
            content: 'Confirm'
        }
        const result = await Confirm(modal.title, modal.content);

        if(result){
            // alert('confirm')            
        }
        else  {
            // alert('cancel')
        }            
    }

    return (
        
        <div className="mt-4">
            <Table 
                columns={columns} 
                rows={props.status}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
                onCellEditStop={onCellEditStop}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        status:  Object.values(state.status),
    };
}

export default connect(
    mapStateToProps, 
    { fetchStatuses }
)(AdminStatus);
