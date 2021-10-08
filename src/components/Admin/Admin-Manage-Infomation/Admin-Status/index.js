/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-definition';

import { fetchStatuses, createStatus } from '../../../../actions/status';
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
                className="px-4 py-2 text-white bg-green-500 rounded-lg"
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
    { fetchStatuses, createStatus }
)(AdminField);
