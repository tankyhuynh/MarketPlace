/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog, Confirm } from 'react-st-modal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-definition';

import { fetchTransmissionMethods, createTransmissionMethod, editTransmissionMethod, deleteTransmissionMethod } from '../../../../actions/transmissionMethod';
import { connect } from 'react-redux';

import FormEdit from '../FormEdit'

const formConfig_Add = {
    title: "Thêm phương thức chuyển giao",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const formConfig_Edit = {
    title: "Sửa phương thức chuyển giao",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});

    useEffect(() => {
        props.fetchTransmissionMethods()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    const onEdit = (value) => {
        console.log('FormEdit onEdit transmission: ', value);
        props.editTransmissionMethod(value)
        props.fetchTransmissionMethods()
    }

    const onAdd = (value) => {
        console.log('FormEdit onAdd  transmission: ', value);
        props.createTransmissionMethod(value)
        props.fetchTransmissionMethods()
    }

    const onBtnEditClick = async (transmission) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Edit}
                initialValue={transmission}
                fields={columns} 
                onSubmit={onEdit}
            />, {
            title: formConfig_Edit.title,
            showCloseIcon: true,
        });

    }

    const onBtnAddClick = async (transmission) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Add}
                initialValue={transmission}
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
            props.deleteTransmissionMethod(field.id)
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
                rows={renderRows(props.transmissions)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        transmissions:  Object.values(state.transmissions),
    };
}

export default connect(
    mapStateToProps, 
    { fetchTransmissionMethods, createTransmissionMethod, editTransmissionMethod, deleteTransmissionMethod }
)(AdminField);
