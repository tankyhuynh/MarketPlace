/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Confirm } from 'react-st-modal';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';


import Table from '../../Table/Table-Admin';
import { columns } from './table-definition';

import { fetchGroups, createGroup, editGroup, deleteGroup } from '../../../actions/researchGroup';
import { connect } from 'react-redux';

const AdminManageGroup = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});
    // const alertUseAlert = useAlert()

    useEffect(() => {
        props.fetchGroups()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

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
            props.deleteGroup(field.id)
        } else {
        // Сonfirmation not confirmed
        }
    }
   

    const renderRows = (rows) => {
        return rows.map(row => {
            const action = (
                <div className="flex gap-4">
                    <Link 
                        // onClick={() => onBtnEditClick(row)}
                        to={`/admin/groups/edit/${row.id}`}
                        className=""    
                    >
                        <EditIcon color="warning" />
                    </Link>
                    <Link 
                        // onClick={() => onBtnEditClick(row)}
                        to={`/admin/groups/${row.id}/add-member`}
                        className=""    
                    >
                        <GroupAddIcon color="success" />
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
                to={`/admin/groups/new`}
                className="px-4 py-2 text-white bg-green-500 rounded-lg"
            >
                <ControlPointIcon />
            </Link>
            <div className="h-2"></div>
            <Table 
                columns={columns} 
                rows={renderRows(props.researchGroups)}
                editRowsModel={editRowsModel}
                handleEditRowsModelChange={handleEditRowsModelChange} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        researchGroups:  Object.values(state.researchGroups),
    };
}

export default connect(
    mapStateToProps, 
    { fetchGroups, createGroup, editGroup, deleteGroup }
)(AdminManageGroup);
