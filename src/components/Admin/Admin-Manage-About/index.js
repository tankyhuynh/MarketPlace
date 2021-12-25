/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import { CustomDialog } from 'react-st-modal';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';

import Table from '../../Table/Table-Admin';
import { columns } from './table-definition-show';

import { fetchAbouts, createAbout, editAbout } from '../../../actions/aboutAdmin';
import { connect } from 'react-redux';

const AdminAbout = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});
    // const alertUseAlert = useAlert()

    useEffect(() => {
        props.fetchAbouts()
    }, [])
    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

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
        abouts:  Object.values(state.adminAbouts),
    };
}

export default connect(
    mapStateToProps, 
    { fetchAbouts, createAbout, editAbout }
)(AdminAbout);
