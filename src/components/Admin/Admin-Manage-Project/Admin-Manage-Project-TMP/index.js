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
import { columns } from '../table-cols';
import { Link } from 'react-router-dom';

const TMP_PROJECT_ID = 4;


const AdminProjectAll = (props) => {

    useEffect(() => {
        props.fetchProjects_Commercial();
        props.fetchProjects_Researching();
    }, [])

    const [editRowsModel, setEditRowsModel] = useState({});

    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

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
                </div>
            )
            return {...row, action: action}
        })
    }
    
    return (
        
        <div className="mt-4">
            <Table 
                columns={columns} 
                rows={renderRows(props.projects.filter(project => project.status.id === TMP_PROJECT_ID))}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange}
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
