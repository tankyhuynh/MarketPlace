/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog, Confirm } from 'react-st-modal';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert'

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { fetchFaqs, fetchFaq, createFaq, editFaq, deleteFaq } from '../../../actions/faqAdmin';

import {
    STATUS_ADD_SUCCESS,
    STATUS_EDIT_SUCCESS,
    STATUS_DELETE_SUCCESS,
    STATUS_DELETE_CANCEL

} from '../../status.messsage'

import Table from '../../Table/Table-Admin';
import { columns } from './table-definition';


import FormEdit from './FormEdit'

const formConfig_Add = {
    title: "Thêm FAQ",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const formConfig_Edit = {
    title: "Sửa FAQ",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});
    const alert = useAlert()

    useEffect(() => {
        props.fetchFaqs()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    const onEdit = (value) => {
        console.log('FormEdit onEdit faq: ', value);
        props.editFaq(value)
        alert.success(STATUS_EDIT_SUCCESS)
    }

    const onAdd = (value) => {
        console.log('FormEdit onAdd faq: ', value);
        props.createFaq(value)
        props.fetchFaqs()
        alert.success(STATUS_ADD_SUCCESS)
    }

    const onBtnEditClick = async (domain) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Edit}
                initialValue={domain}
                domains={columns} 
                onSubmit={onEdit}
            />, {
            title: formConfig_Edit.title,
            showCloseIcon: true,
        });

    }

    const onBtnAddClick = async (domain) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Add}
                initialValue={domain}
                domains={columns} 
                onSubmit={onAdd}
            />, {
            title: formConfig_Add.title,
            showCloseIcon: true,
        });

    }

    const onBtnDeleteClick = async (field) => {
        const CONSTFIRM_TITLE = 'Xác nhận' 
        const CONSTFIRM_TEXT = `Bạn muốn xóa ''${field.question}'' ? `
        const CONSTFIRM_OK_BUTTON_TEXT = 'Đồng ý' 
        const CONSTFIRM_OK_CANCEL_TEXT = 'Hủy' 

        const result = await Confirm(
            CONSTFIRM_TEXT, 
            CONSTFIRM_TITLE,
            CONSTFIRM_OK_BUTTON_TEXT,
            CONSTFIRM_OK_CANCEL_TEXT
        );
        
        if (result) {
            props.deleteFaq(field.id)
            alert.success(STATUS_DELETE_SUCCESS)
        } else {
        // Сonfirmation not confirmed
            alert.info(STATUS_DELETE_CANCEL)
        }
    }

    const renderRows = (rows) => {
        return rows.map(row => {
            const action = (
                <div className="flex gap-2">
                    <button 
                        onClick={() => onBtnEditClick(row)}
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
                rows={renderRows(props.faqs)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        faqs:  Object.values(state.adminFaqs),
    };
}

export default connect(
    mapStateToProps, 
    { fetchFaqs, fetchFaq, createFaq, editFaq, deleteFaq }
)(AdminField);
