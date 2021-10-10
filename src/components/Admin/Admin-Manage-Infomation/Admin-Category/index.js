/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-definition';

import { fetchCategories, createCategory, editCategory } from '../../../../actions/category';
import { connect } from 'react-redux';

import FormEdit from '../FormEdit'

const formConfig_Add = {
    title: "Thêm danh mục",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const formConfig_Edit = {
    title: "Sửa danh mục",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const AdminCategory = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});

    useEffect(() => {
        props.fetchCategories()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    const onEdit = (value) => {
        console.log('FormEdit onEdit category: ', value);
        props.editCategory(value)
    }

    const onAdd = (value) => {
        console.log('FormEdit onAdd  category: ', value);
        props.createCategory(value)
        props.fetchCategories()
    }

    const onBtnEditClick = async (category) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Edit}
                initialValue={category}
                fields={columns} 
                onSubmit={onEdit}
            />, {
            title: formConfig_Edit.title,
            showCloseIcon: true,
        });

    }

    const onBtnAddClick = async (category) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Add}
                initialValue={category}
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
                <div className="my-4">
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
                rows={renderRows(props.categories)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        categories:  Object.values(state.categories),
    };
}

export default connect(
    mapStateToProps, 
    { fetchCategories, createCategory, editCategory }
)(AdminCategory);
