/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { 
    fetchProjects_Commercial,
    fetchProjects_Researching
} 
from '../../../../actions/project';

import Table from '../../../Table/Table-Admin';
import { columns } from './table-cols';
import { Confirm } from 'react-st-modal';
// import InputModal from '../../../Modal/InputModal'

import FormEdit from './FormEditProject';
import { Link } from 'react-router-dom';


const fields = [
    {
        name: 'ID',
        fieldName: 'id'
    } ,
    {
        name: 'Name',
        fieldName: 'name'
    },
    {
        name: 'Field',
        fieldName: 'field'
    }    
]
             

const AdminProjectAll = (props) => {

    useEffect(() => {
        props.fetchProjects_Commercial();
        props.fetchProjects_Researching();
    }, [])

    // const [levels, setLevels] = useState({});
    const [editRowsModel, setEditRowsModel] = useState({});

    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
        // setLevels(previousState => ({...previousState, editRowsModel}))
    }, []);

    const renderFormEdit = (formValue) => {
        return (
            <form>
                <div>
                    ID: <input type="text" value={formValue.id}/>
                </div>
                <div>
                    Name: <input type="text" value={formValue.name} />
                </div>
                <div>
                    Field: <input type="text" value={formValue.field.name} />
                </div>
            </form>
        )
    }

    const onCellEditStop = async(event, row) => {
        event.preventDefault();

        const modal = {
            title: 'Confirm',
            // body: renderFormEdit(row)
            body: <FormEdit fields={fields} />
        }

        const result = await Confirm(modal.body, modal.title);

        // if(result){
        //     alert(name)            
        // }
        // else  {
        //     alert('cancel')
        // }            
    }

    const renderRows = (rows) => {
        return rows.map(row => {
            const action = (
                <div className="flex">
                    <Link
                        to={`/projects/edit/${row.id}`}
                        className="px-2 text-white bg-green-500 rounded-lg"
                        >
                        Edit
                    </Link>
                    <button 
                        onClick={(event) => onCellEditStop(event, row)}
                        className="px-2 text-white bg-green-500 rounded-lg"    
                    >
                        Test
                    </button>
                </div>
            )
            return {...row, action: action}
        })
    }
    
    return (
        
        <div className="mt-4">
            <Table 
                columns={columns} 
                rows={renderRows(props.projects)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange}
                // onCellEditStop={() => onCellEditStop()} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        projects: Object.values(state.projects)
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fetchProjects_Commercial,
        fetchProjects_Researching 
    }
)(AdminProjectAll);
