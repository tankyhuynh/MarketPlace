/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { 
    fetchProjects_all_by_domainId,
    fetchProjects
} 
from '../../../../actions/adminProject';

import { ROLE_SUPER_ADMIN } from '../../../../environments/constraints'

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-cols-all';
import { Link } from 'react-router-dom';


const AdminProjectAll = (props) => {

    useEffect(() => {
        // props.fetchProjects_Commercial();
        // props.fetchProjects_Researching();

        const userDataLocalStorage = localStorage.getItem("userData");
        const user = JSON.parse(userDataLocalStorage);

        if(user.role.code === ROLE_SUPER_ADMIN) {
            props.fetchProjects();
        }
        else {
            props.fetchProjects_all_by_domainId(user.domain.id);
        }
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
                        to={`/admin/projects/edit/${row.type}/${row.id}`}
                        className="self-center px-2 text-white rounded-lg w-28"
                        style={{ backgroundColor: 'deepskyblue' }}
                    >
                        Bấm để duyệt
                    </Link>
                </div>
            )
            
            const projectStatus = row.status ? row.status : ''

            return {...row, action: action, projectStatus}
        })
    }
    
    return (
        
        <div className="mt-4">
            <Table 
                columns={columns} 
                rows={renderRows(props.projects)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        projects: Object.values(state.adminProjects)
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fetchProjects_all_by_domainId,
        fetchProjects 
    }
)(AdminProjectAll);
