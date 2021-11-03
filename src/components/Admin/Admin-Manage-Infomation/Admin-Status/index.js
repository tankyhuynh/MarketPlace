/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog, Confirm } from 'react-st-modal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-definition';

import { fetchStatuses, createStatus, editStatus, deleteStatus } from '../../../../actions/status';
import { connect } from 'react-redux';

import FormEdit from '../FormEdit'

const formConfig_Add = {
    title: "Thêm trạng thái",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const formConfig_Edit = {
    title: "Sửa trạng thái",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});

    useEffect(() => {
        props.fetchStatuses()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    const onEdit = (value) => {
        console.log('FormEdit onEdit status: ', value);
        props.editStatus(value)
        props.fetchStatuses()
    }

    const onAdd = (value) => {
        console.log('FormEdit onAdd  status: ', value);
        props.createStatus(value)
        props.fetchStatuses()
    }

    const onBtnEditClick = async (status) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Edit}
                initialValue={status}
                fields={columns} 
                onSubmit={onEdit}
            />, {
            title: formConfig_Edit.title,
            showCloseIcon: true,
        });

    }

    const onBtnAddClick = async (status) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Add}
                initialValue={status}
                fields={columns} 
                onSubmit={onAdd}
            />, {
            title: formConfig_Add.title,
            showCloseIcon: true,
        });

    }

    const onBtnDeleteClick = async (field) => {
        const CONSTFIRM_TITLE = 'Xác nhận' 
        const CONSTFIRM_TEXT = `Bạn muốn xóa ''${field.name}'' ? `
        const CONSTFIRM_OK_BUTTON_TEXT = 'Đồng ý' 
        const CONSTFIRM_OK_CANCEL_TEXT = 'Hủy' 

        const result = await Confirm(
            CONSTFIRM_TEXT, 
            CONSTFIRM_TITLE,
            CONSTFIRM_OK_BUTTON_TEXT,
            CONSTFIRM_OK_CANCEL_TEXT
        );
        
        if (result) {
            props.deleteStatus(field.id)
        } else {
        // Сonfirmation not confirmed
        }
    }

    const renderRows = (rows) => {
        return rows.map(row => {
            const action = (
                <div className="flex gap-2 mx-auto">
                    <button 
                        onClick={() => onBtnEditClick(row)}
                        className="text-white rounded-lg"    
                    >
                        <EditIcon color="warning" />
                    </button>
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
                rows={renderRows(props.status)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        status:  Object.values(state.status),
    };
}

export default connect(
    mapStateToProps, 
    { fetchStatuses, createStatus, editStatus, deleteStatus }
)(AdminField);
