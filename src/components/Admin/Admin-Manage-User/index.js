/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Confirm } from 'react-st-modal';
import { useAlert } from 'react-alert'

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Table from '../../Table/Table-Admin';
import { columns } from './table-definition';

import { fetchUsers, createUser, editUser, deleteUser } from '../../../actions/user';

import {
    STATUS_DELETE_SUCCESS,
    STATUS_DELETE_CANCEL,
} from '../../status.messsage'

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});
    const alertUseAlert = useAlert()

    useEffect(() => {
        props.fetchUsers()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

    const onBtnDeleteClick = async (field) => {
        const CONSTFIRM_TITLE = 'Xác nhận' 
        const CONSTFIRM_TEXT = `Bạn muốn xóa ''${field.fullName}'' ? `
        const CONSTFIRM_OK_BUTTON_TEXT = 'Đồng ý' 
        const CONSTFIRM_OK_CANCEL_TEXT = 'Hủy' 

        const result = await Confirm(
            CONSTFIRM_TEXT, 
            CONSTFIRM_TITLE,
            CONSTFIRM_OK_BUTTON_TEXT,
            CONSTFIRM_OK_CANCEL_TEXT
        );
        
        if (result) {
            props.deleteUser(field.id)
            alertUseAlert.success(STATUS_DELETE_SUCCESS)
        } else {
            alertUseAlert.info(STATUS_DELETE_CANCEL)
        }
    }

    const renderRows = (rows) => {
        if(rows) {
            return rows.map(row => {
                const action = (
                    <div className="flex gap-2">
                        <Link 
                            // onClick={() => onBtnEditClick(row)}
                            to={`/admin/users/edit/${row.id}`}
                            className=""    
                        >
                            <EditIcon color="warning" />
                        </Link>
                        <button 
                            onClick={() => onBtnDeleteClick(row)}
                            className="text-white rounded-lg"    
                        >
                            <DeleteIcon color="error" />
                        </button>
                    </div>
                )
                return {...row, action: action}
            })
        }
        return null
    }

    return (
        
        <div className="mt-4">
            <Link 
                to={`/admin/users/new`}
                className="px-4 py-2 mb-10 text-white bg-green-500 rounded-lg"
            >
                <ControlPointIcon />
            </Link>
            <div className="h-2"></div>
            <Table 
                columns={columns} 
                pageSize={20}
                rows={renderRows(props.users ? props.users : [])}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        users:  Object.values(state.users),
    };
}

export default connect(
    mapStateToProps, 
    { fetchUsers, createUser, editUser, deleteUser }
)(AdminField);
