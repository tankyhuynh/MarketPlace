/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CustomDialog } from 'react-st-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import environment from '../../../../environments/environment'
// import { useHistory } from 'react-router-dom';

import { 
    fetchProjects_all_by_domainId,
    fetchProjects
} 
from '../../../../actions/adminProject';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-cols-all';
import FormEdit from './FormEdit'

import { ROLE_SUPER_ADMIN } from '../../../../environments/constraints'

const formConfig = {
    title: "Đổi vị trí nổi bật",
    button_text_ok: 'Đổi',
    button_text_cancel: 'Hủy'
}

const AdminProjectAll = (props) => {

    // const history = useHistory();

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

    const onSubmitHightlight = (hightlightNumber, projectId) => {
        axios.put(environment.url.java_admin + `/admin/projects/id/${projectId}/number/${hightlightNumber}`, {})
        .then(response => {
            if (response) {
                console.log('response:', response);
                
                const userDataLocalStorage = localStorage.getItem("userData");
                const user = JSON.parse(userDataLocalStorage);
                if(user.role.code === ROLE_SUPER_ADMIN) {
                    props.fetchProjects();
                }
                else {
                    props.fetchProjects_all_by_domainId(user.domain.id);
                }
            }
        })
    }

    
    const onBtnChangeHightlightClick = async (row) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig}
                initialValue={row}
                // fields={columns} 
                onSubmit={onSubmitHightlight}
            />,
            {
            title: 'Đổi vị trí nổi bật',
            showCloseIcon: true,
        });

    }

    const renderRows = (rows) => {
        return  _.orderBy(rows, ['number'], ['asc'])
                .map(row => {
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

                    const hightlightAndNumber = (
                        <div className="flex gap-2">
                            { 
                                row.isHighlight 
                                ? (
                                   <>
                                        <section className="bg-yellow-500 rounded-2xl text-center px-2 text-white">
                                            { `Hightlight` }
                                        </section>
                                        <button 
                                            onClick={(event) => onBtnChangeHightlightClick(row)}
                                            className="bg-red-500 rounded-2xl text-center px-2 text-white"
                                        >
                                            { row.number ? row.number : '' }
                                        </button>
                                   </>
                                ) 
                                : null 
                            }
                            
                        </div>
                    )
                    
                    const projectStatus = row.status ? row.status : ''

                    return {...row, action: action, projectStatus, hightlightAndNumber}
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
