/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { Confirm } from 'react-st-modal';

import Table from '../../../Table/Table-Admin';
import { columns, rows } from '../table-data-field';


const AdminField = () => {

    // const [levels, setLevels] = useState({});
    const [editRowsModel, setEditRowsModel] = useState({});

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
                rows={rows}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
                onCellEditStop={onCellEditStop}
            />
        </div>
    )
}

export default AdminField;