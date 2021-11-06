/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import { CustomDialog } from 'react-st-modal';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';

import Table from '../../Table/Table-Admin';
import { columns } from './table-definition-show';

import { fetchAbouts, createAbout, editAbout } from '../../../actions/about';
import { connect } from 'react-redux';
// import { useAlert } from 'react-alert'


// import FormEdit from './FormEdit'

// const formConfig_Add = {
//     title: "Thêm giới thiệu",
//     button_text_ok: 'Thêm',
//     button_text_cancel: 'Hủy'
// }

// const formConfig_Edit = {
//     title: "Sửa giới thiệu",
//     button_text_ok: 'Sửa',
//     button_text_cancel: 'Hủy'
// }

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});
    // const alertUseAlert = useAlert()

    useEffect(() => {
        props.fetchAbouts()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    
    // const onEdit = (value) => {
    //     console.log('FormEdit onEdit introduction: ', value);
    //     props.editDomain(value)
    //     alertUseAlert.show('Chỉnh sửa hoàn tất')
    // }

    // const onAdd = (value) => {
    //     console.log('FormEdit onAdd introduction: ', value);
    //     props.createDomain(value)
    //     props.fetchDomains()
    //     alertUseAlert.show('Thêm hoàn tất')
    //     // props.fetchRoles()
    // }

    // const onBtnEditClick = async (domain) => {
    //     await CustomDialog(
    //         <FormEdit 
    //             formConfig={formConfig_Edit}
    //             initialValue={domain}
    //             domains={columns} 
    //             onSubmit={onEdit}
    //         />, {
    //         title: formConfig_Edit.title,
    //         showCloseIcon: true,
    //     });

    // }

    // const onBtnAddClick = async (domain) => {
    //     await CustomDialog(
    //         <FormEdit 
    //             formConfig={formConfig_Add}
    //             initialValue={domain}
    //             domains={columns} 
    //             onSubmit={onAdd}
    //         />, {
    //         title: formConfig_Add.title,
    //         showCloseIcon: true,
    //     });

    // }


    const renderRows = (rows) => {
        return rows.map(row => {
            const action = (
                <div className="">
                    <Link 
                        to={`/admin/abouts/edit/${row.id}`}
                        // onClick={() => onBtnEditClick(row)}
                    >
                        <EditIcon color="warning" />
                    </Link>
                </div>
            )
            return {...row, action: action}
        })
    }

    return (
        
        <div className="mt-4">
            <Link 
                to={'/admin/abouts/new'}
                className="px-4 py-2 mb-4 text-white bg-green-500 rounded-lg"
                // onClick={() => onBtnAddClick()}
            >
                <ControlPointIcon />
            </Link>
            <div className="h-2"></div>
            <Table 
                columns={columns} 
                rows={renderRows(props.abouts)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        abouts:  Object.values(state.abouts),
    };
}

export default connect(
    mapStateToProps, 
    { fetchAbouts, createAbout, editAbout }
)(AdminField);
