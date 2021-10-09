/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Table from '../../../Table/Table-Admin';
import { columns } from './table-definition';

import { fetchFields, createField } from '../../../../actions/field';
import { fetchCategories } from '../../../../actions/category';
import { connect } from 'react-redux';

import FormEdit from './FormEdit'

const formConfig_Add = {
    title: "Thêm lĩnh vực",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const formConfig_Edit = {
    title: "Sửa lĩnh vực",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});

    useEffect(() => {
        props.fetchFields()
        props.fetchCategories()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    const onEdit = (value) => {
        console.log('FormEdit onEdit field: ', value);
    }

    const onAdd = (value) => {
        console.log('FormEdit onAdd field: ', value);
        props.createField(value)
        props.fetchFields()
    }

    const onBtnEditClick = async (field) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Edit}
                initialValue={field}
                fields={columns}
                categories={props.categories}
                onSubmit={onEdit}
            />, {
            title: formConfig_Edit.title,
            showCloseIcon: true,
        });

    }

    const onBtnAddClick = async (field) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Add}
                initialValue={field}
                fields={columns} 
                categories={props.categories}
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
                rows={renderRows(props.fields)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        fields:  Object.values(state.fields),
        categories:  Object.values(state.categories),
    };
}

export default connect(
    mapStateToProps, 
    { 
        fetchFields, createField,
        fetchCategories 
    }
)(AdminField);
