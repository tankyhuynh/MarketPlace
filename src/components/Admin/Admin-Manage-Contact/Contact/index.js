/* eslint-disable react-hooks/exhaustive-deps */
// import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CustomDialog } from 'react-st-modal';
// import { useAlert } from 'react-alert'

import ReplyIcon from '@mui/icons-material/Reply';
// import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Table from '../../../Table/Table-Admin';
import { columns } from './table-definition';
import FormSubmit from '../FormEdit'

import { fetchContacts } from '../../../../actions/contactAdmin';
// import FormEdit from '../FormEdit'

const formConfig = {
    title: "Phản hồi liên hệ",
    button_text_ok: 'Phản hồi',
    button_text_cancel: 'Hủy'
}


const AdminManageGroup = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});
    // const alertUseAlert = useAlert()

    useEffect(() => {
        props.fetchContacts()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

    const onSubmit = (value) => {
        console.log('FormEdit onSubmit contact: ', value);
        // props.editDomain(value)
        // alertUseAlert.show('Chỉnh sửa hoàn tất')
    }

    
    const onBtnReplyClick = async (project) => {
        // const pickedFieldsProject = _.pick(project, 'id', 'fullName')
            await CustomDialog(
                <FormSubmit 
                    formConfig={formConfig}
                    initialValue={project}
                    // initialValue={pickedFieldsProject}
                    domains={columns} 
                    onSubmit={onSubmit}
                />, {
                title: formConfig.title,
                showCloseIcon: true,
            });

    }
   

    const renderRows = (rows) => {
        return rows.map(row => {
            const action = (
                <div className="flex gap-4">
                    <button 
                        onClick={() => onBtnReplyClick(row)}
                        // to={`/admin/groups/edit/${row.id}`}
                        // className="px-4 py-2 rounded-lg bgye"    
                    >
                        <ReplyIcon color="success" />
                    </button>
                    {/* <Link 
                        // onClick={() => onBtnEditClick(row)}
                        to={`/admin/groups/add-member`}
                        className=""    
                    >
                        <GroupAddIcon color="success" />
                    </Link> */}
                </div>
            )
            return {...row, action: action}
        })
    } 

    
    // const onAdd = (value) => {
    //     console.log('FormEdit onAdd domain: ', value);
    //     props.createDomain(value)
    //     props.fetchDomains()
    //     alertUseAlert.show('Thêm hoàn tất')
    //     // props.fetchRoles()
    // }

    // const onBtnAddClick = async (domain) => {
    //     await CustomDialog(
    //         <FormEdit 
    //             formConfig={formConfig}
    //             initialValue={domain}
    //             domains={columns} 
    //             onSubmit={onAdd}
    //         />, {
    //         title: formConfig.title,
    //         showCloseIcon: true,
    //     });

    // }

    return ( 
        
        <div className="mt-4">
            {/* <button 
                className="px-4 py-2 mb-4 text-white bg-green-500 rounded-lg"
                onClick={() => onBtnAddClick()}
            >
                <ControlPointIcon />
            </button> */}
            {/* <Link 
                to={`/admin/groups/new`}
                className="px-4 py-2 text-white bg-green-500 rounded-lg"
            >
                <ControlPointIcon />
            </Link> */}
            <div className="h-2"></div>
            <Table 
                columns={columns} 
                rows={renderRows(props.contacts)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        contacts:  Object.values(state.contacts),
    };
}

export default connect(
    mapStateToProps, 
    { fetchContacts }
)(AdminManageGroup);
