/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Table from '../../../Table/Table-Admin';
import { columns } from '../table-definition';

import { fetchLevelDevelopments, createLevel } from '../../../../actions/levelDevelopment';
import { connect } from 'react-redux';

import FormEdit from '../FormEdit'

const formConfig_Add = {
    title: "Thêm mức độ phát triển",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const formConfig_Edit = {
    title: "Sửa mức độ phát triển",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});

    useEffect(() => {
        props.fetchLevelDevelopments()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    const onEdit = (value) => {
        console.log('FormEdit onEdit level: ', value);
    }

    const onAdd = (value) => {
        console.log('FormEdit onAdd  level: ', value);
        props.createLevel(value)
        props.fetchLevelDevelopments()
    }

    const onBtnEditClick = async (level) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Edit}
                initialValue={level}
                fields={columns} 
                onSubmit={onEdit}
            />, {
            title: formConfig_Edit.title,
            showCloseIcon: true,
        });

    }

    const onBtnAddClick = async (level) => {
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Add}
                initialValue={level}
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
                className="px-4 py-2 mb-4 text-white bg-green-500 rounded-lg"
                onClick={() => onBtnAddClick()}
            >
                <ControlPointIcon />
            </button>
            <Table 
                columns={columns} 
                rows={renderRows(props.levels)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        levels:  Object.values(state.levels),
    };
}

export default connect(
    mapStateToProps, 
    { fetchLevelDevelopments, createLevel }
)(AdminField);
