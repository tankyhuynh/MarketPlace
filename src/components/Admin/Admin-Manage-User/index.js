/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Table from '../../Table/Table-Admin';
import { columns } from './table-definition';

import { fetchRoles, createRole, editRole } from '../../../actions/role';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert'


import FormEdit from './FormEdit'

const formConfig_Add = {
    title: "Thêm vai trò",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const formConfig_Edit = {
    title: "Sửa vai trò",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});
    const alertUseAlert = useAlert()

    useEffect(() => {
        props.fetchRoles()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    const onEdit = (value) => {
        console.log('FormEdit onEdit role: ', value);
        props.editRole(value)
        alertUseAlert.show('Chỉnh sửa hoàn tất')
    }

    const onAdd = (value) => {
        console.log('FormEdit onAdd role: ', value);
        props.createRole(value)
        alertUseAlert.show('Thêm hoàn tất')
        // props.fetchRoles()
    }

    const onBtnEditClick = async (role) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Edit}
                initialValue={role}
                roles={columns} 
                onSubmit={onEdit}
            />, {
            title: formConfig_Edit.title,
            showCloseIcon: true,
        });

    }

    const onBtnAddClick = async (role) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Add}
                initialValue={role}
                roles={columns} 
                onSubmit={onAdd}
            />, {
            title: formConfig_Add.title,
            showCloseIcon: true,
        });

    }


    const renderRows = (rows) => {
        return rows.map(row => {
            const action = (
                <div className="">
                    <button 
                        onClick={() => onBtnEditClick(row)}
                        className="px-2 text-white bg-green-500 rounded-lg"    
                    >
                        Edit
                    </button>
                </div>
            )
            return {...row, action: action}
        })
    }

    return (
        
        <div className="mt-4">
            <button 
                className="px-4 py-2 mb-4 text-white bg-green-500 rounded-lg"
                onClick={() => onBtnAddClick()}
            >
                <ControlPointIcon />
            </button>
            <Table 
                columns={columns} 
                rows={renderRows(props.roles)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        roles:  Object.values(state.roles),
    };
}

export default connect(
    mapStateToProps, 
    { fetchRoles, createRole, editRole }
)(AdminField);
