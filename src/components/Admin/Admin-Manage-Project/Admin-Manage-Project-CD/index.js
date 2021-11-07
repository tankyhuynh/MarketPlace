/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { 
    fetchProjects_all_by_domainId
} 
from '../../../../actions/project';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-cols';
import { Link } from 'react-router-dom';

const CD_PROJECT_ID = 2;


const AdminProjectAll = (props) => {

    useEffect(() => {
        props.fetchProjects_all_by_domainId();
        // props.fetchProjects_Researching();
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
                        to={`/admin/projects/edit/${row.id}`}
                        className="self-center px-2 text-white rounded-lg w-28"
                        style={{ backgroundColor: 'deepskyblue' }}
                    >
                        Bấm để duyệt
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
                rows={renderRows(props.projects.filter(project => project.status.id === CD_PROJECT_ID))}
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
        fetchProjects_all_by_domainId
    }
)(AdminProjectAll);
