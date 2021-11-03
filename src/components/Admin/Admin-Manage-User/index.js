/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Confirm } from 'react-st-modal';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import Table from '../../Table/Table-Admin';
import { columns } from './table-definition';

import { fetchUsers, createUser, editUser } from '../../../actions/user';
import { connect } from 'react-redux';
// import { useAlert } from 'react-alert'


// import FormEdit from './FormEdit'

// const formConfig_Add = {
//     title: "Thêm người dùng",
//     button_text_ok: 'Thêm',
//     button_text_cancel: 'Hủy'
// }

// const formConfig_Edit = {
//     title: "Sửa người dùng",
//     button_text_ok: 'Sửa',
//     button_text_cancel: 'Hủy'
// }

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});
    // const alertUseAlert = useAlert()

    useEffect(() => {
        props.fetchUsers()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    // const onEdit = (value) => {
    //     console.log('FormEdit onEdit user: ', value);
    //     props.editUser(value)
    //     alertUseAlert.show('Chỉnh sửa hoàn tất')
    // }

    // const onAdd = (value) => {
    //     console.log('FormEdit onAdd user: ', value);
    //     props.createUser(value)
    //     alertUseAlert.show('Thêm hoàn tất')
    //     // props.fetchRoles()
    // }

    // const onBtnEditClick = async (user) => {
    //     // await CustomDialog(
    //     //     <FormEdit 
    //     //         formConfig={formConfig_Edit}
    //     //         initialValue={user}
    //     //         users={columns} 
    //     //         onSubmit={onEdit}
    //     //     />, {
    //     //     title: formConfig_Edit.title,
    //     //     showCloseIcon: true,
    //     // });

    // }

    // const onBtnAddClick = async (user) => {
    //     await CustomDialog(
    //         <FormEdit 
    //             formConfig={formConfig_Add}
    //             initialValue={user}
    //             users={columns} 
    //             onSubmit={onAdd}
                
    //         />, {
    //         title: formConfig_Add.title,
    //         showCloseIcon: true,
    //     });

    // }

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
            props.deleteGroup(field.id)
        } else {
        // Сonfirmation not confirmed
        }
    }

    const renderRows = (rows) => {
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

    return (
        
        <div className="mt-4">
            {/* <button 
                className="px-4 py-2 mb-4 text-white bg-green-500 rounded-lg"
                onClick={() => onBtnAddClick()}
            >
                <ControlPointIcon />
            </button> */}
            <Link 
                to={`/admin/users/new`}
                className="px-4 py-2 mb-10 text-white bg-green-500 rounded-lg"
            >
                <ControlPointIcon />
            </Link>
            <div className="h-2"></div>
            <Table 
                columns={columns} 
                rows={renderRows(props.users)}
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
    { fetchUsers, createUser, editUser }
)(AdminField);
