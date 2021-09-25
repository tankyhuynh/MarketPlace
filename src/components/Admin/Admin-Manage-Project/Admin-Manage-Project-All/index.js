/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { 
    fetchProjects_DaDuyet,
    fetchProjects_ChoDuyet,
    fetchProjects_TuChoi,
    fetchProjects_Nhap
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
        props.fetchProjects_DaDuyet();
        props.fetchProjects_ChoDuyet();
        props.fetchProjects_TuChoi();
        props.fetchProjects_Nhap();
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

        

        // const modal = {
        //     title: 'Confirm',
        //     // body: renderFormEdit(row)
        //     body: <FormEdit fields={fields} />
        // }

        // const result = await Confirm(modal.body, modal.title);

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
                <>
                    <Link
                        // onClick={(event) => onCellEditStop(event, row)}
                        to={`/projects/edit/${row.id}`}
                        className="px-4 py-2 text-white bg-green-500 rounded-2xl"
                    >
                        Edit
                    </Link>
                </>
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
    { fetchProjects_DaDuyet, fetchProjects_ChoDuyet, fetchProjects_TuChoi, fetchProjects_Nhap }
)(AdminProjectAll);
