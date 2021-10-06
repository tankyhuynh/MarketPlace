/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Confirm } from 'react-st-modal';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-definition';

import { fetchCategories } from '../../../../actions/category';
import { connect } from 'react-redux';


const AdminCategory = (props) => {

    // const [levels, setLevels] = useState({});
    const [editRowsModel, setEditRowsModel] = useState({});

    useEffect(() => {
        props.fetchCategories()
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
                rows={props.categories}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
                onCellEditStop={onCellEditStop}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        categories:  Object.values(state.categories),
    };
}

export default connect(
    mapStateToProps, 
    { fetchCategories }
)(AdminCategory);
