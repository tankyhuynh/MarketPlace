/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import { useHistory } from 'react-router-dom';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Confirm } from 'react-st-modal';

// import Table from '../../../Table/Table-Admin';
import { columns } from './table-definition';

import { fetchFields, createField, editField, deleteField } from '../../../../actions/field';
import { connect } from 'react-redux';

import FormEdit from './FormEdit'
import CheckboxView from './CheckboxTreeView'

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
    const history = useHistory();

    const [stateFieldsChecked, setFieldsChecked] = useState({
        checked: props.project ? (
            props.project.projectFieldList.map(field => {
                return field.field.id
            } )
        ) : [],
        expanded: []
    })

    useEffect(() => {
        props.fetchFields()
    }, [])

    
    const handleEditRowsModelChange = useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);


    console.log("AdminField props", props)

    
    const onEdit = (value) => {
        console.log('FormEdit onEdit field: ', value);
        props.editField(value)
        // props.fetchFields()
    }

    const onAdd = (value) => {
        console.log('FormEdit onAdd value: ', { ...value, id: Number(value.id) });
        props.createField(value)
        props.fetchFields()
        window.location.reload()
    }

    const onBtnDeleteClick = async (field) => {
        const CONSTFIRM_TITLE = 'Xác nhận' 
        const CONSTFIRM_TEXT = `Bạn muốn xóa ''${field.name}'' ? `

        const result = await Confirm(
            CONSTFIRM_TEXT, 
            CONSTFIRM_TITLE
        );
        
        if (result) {
            props.deleteField(field.id)
            window.location.reload()
        } else {
        // Сonfirmation not confirmed
        }
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

    const onBtnAddClick = async (categoryId) => {
        const initialValue = { childOfFieldId: categoryId }
        await CustomDialog(
            <FormEdit 
                formConfig={formConfig_Add}
                initialValue={initialValue}
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
            const actions = (
                <div className="flex gap-1">
                    <button 
                        onClick={() => onBtnEditClick(row)}
                        className="flex px-2 py-2 text-white bg-gray-500 rounded-lg"    
                    >
                        <EditIcon />
                    </button>
                    <button 
                        onClick={() => onBtnDeleteClick(row)}
                        className="flex px-2 py-2 text-white bg-red-600 rounded-lg"    
                    >
                        <DeleteIcon />
                    </button>
                </div>
            )
            const actionAdd = row.childOfFieldList  
                        ? (
                            <div className="">
                                <button 
                                    className="flex px-4 py-2 text-white bg-green-500 rounded-lg"
                                    onClick={() => onBtnAddClick(row.id)}
                                >
                                    <ControlPointIcon />
                                </button>
                            </div>
                        ): null
            return {...row, actions, actionAdd}
        })
    }

    const renderCheckboxCategoryChildren = (field) => {
        let children = [];
        let fieldIdString = field.id.toString();
        if(field && fieldIdString.length !== 5){
            if(field.childOfFieldList){
                if(field.childOfFieldList.length){
                    field.childOfFieldList
                        .map(fieldChild => {
                            if(renderCheckboxCategoryChildren(fieldChild)){
                                return children.push({
                                    value: `${fieldChild.id}`,
                                    label: (
                                        <>
                                            { fieldChild.name } 
                                            {
                                                fieldChild.id.toString().length !== 5
                                                ? 
                                                    <>
                                                        <button 
                                                            onClick={() => onBtnAddClick(fieldChild.id)}
                                                            className="mx-1"
                                                        >
                                                            <ControlPointIcon color="success" />
                                                        </button>
                                                        <button 
                                                            onClick={() => onBtnEditClick(fieldChild)}
                                                            className="mx-1"
                                                        >
                                                            <EditIcon color="warning" />
                                                        </button>
                                                        <button 
                                                            onClick={() => onBtnDeleteClick(fieldChild)}
                                                            className="mx-1"
                                                        >
                                                            <DeleteIcon color="error" />
                                                        </button>
                                                    </>
                                                
                                                : 
                                                    <>
                                                        <button 
                                                            onClick={() => onBtnEditClick(fieldChild)}
                                                            className="mx-1"
                                                        >
                                                            <EditIcon color="warning" />
                                                        </button>
                                                        <button 
                                                            onClick={() => onBtnDeleteClick(fieldChild)}
                                                            className="mx-1"
                                                        >
                                                            <DeleteIcon color="error" />
                                                        </button>
                                                    </>
                                            }
                                        </>
                                    ),
                                    children: renderCheckboxCategoryChildren(fieldChild)
                                })
                            }
                            return children.push({
                                value: `${fieldChild.id}`,
                                label: (
                                    <>
                                        { fieldChild.name } 
                                        {
                                            fieldChild.id.toString().length !== 5
                                            ? 
                                                <>
                                                    <button 
                                                        onClick={() => onBtnAddClick(fieldChild.id)}
                                                        className="mx-1"
                                                    >
                                                        <ControlPointIcon color="success" />
                                                    </button>
                                                    <button 
                                                        onClick={() => onBtnEditClick(fieldChild)}
                                                        className="mx-1"
                                                    >
                                                        <EditIcon color="warning" />
                                                    </button>
                                                    <button 
                                                        onClick={() => onBtnDeleteClick(fieldChild)}
                                                        className="mx-1"
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </button>
                                                </>
                                            :  
                                                <>
                                                    <button 
                                                        onClick={() => onBtnEditClick(fieldChild)}
                                                        className="mx-1"
                                                    >
                                                        <EditIcon color="warning" />
                                                    </button>
                                                    <button 
                                                        onClick={() => onBtnDeleteClick(fieldChild)}
                                                        className="mx-1"
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </button>
                                                </>
                                        }
                                    </>
                                ),
                            })
                        })
                }
                
                if(children.length){
                    return children
                }
            }
        }
        return null
    }


    const nodes = props.fields ? props.fields.map(field => {
        if(renderCheckboxCategoryChildren(field)){
            return {
                value: `${field.id}`,
                // label: `${ field.name }`,
                // label: (
                //     <>
                //         <button onClick={() => onBtnAddClick(field.id)}>
                //             <ControlPointIcon />
                //         </button>
                //         { c.name }
                //     </>
                // ),
                label: (
                    <>
                        { field.name } 
                        <button 
                            onClick={() => onBtnAddClick(field.id)}
                            className="mx-1"
                        >
                            <ControlPointIcon color="success" />
                        </button>
                        <button 
                            onClick={() => onBtnEditClick(field)}
                            className="mx-1"
                        >
                            <EditIcon color="warning" />
                        </button>
                        <button 
                            onClick={() => onBtnDeleteClick(field)}
                            className="mx-1"
                        >
                            <DeleteIcon color="error" />
                        </button>
                    </>
                ),
                children: renderCheckboxCategoryChildren(field)
            }
        }
        return {
            value: `${field ? field.id : ''}`,
            label: (
                <>
                    { field.name } 
                    <button 
                        onClick={() => onBtnAddClick(field.id)}
                        className="mx-1"
                    >
                        <ControlPointIcon color="success" />
                    </button>
                    <button 
                        onClick={() => onBtnEditClick(field)}
                        className="mx-1"
                    >
                        <EditIcon color="warning" />
                    </button>
                    <button 
                        onClick={() => onBtnDeleteClick(field)}
                        className="mx-1"
                    >
                        <DeleteIcon color="error" />
                    </button>
                </>
            ),
        }
    })
    : [];

    const onCheckboxTreeViewChecked = (checked) => {
        // setStateFieldsChecked({ checked }) prevMovies => ([...prevMovies, ...result])
        setFieldsChecked(previousState => ({...previousState, checked}))
    }


    const renderCheckboxTreeView = (fields) => {
        return (
            <CheckboxView 
                id={fields.length} 
                nodes={nodes} 
                stateFieldIdList={stateFieldsChecked} 
                setStateFieldIdListChecked={onCheckboxTreeViewChecked} 
                setStateFieldIdListExpanded={expanded => setFieldsChecked(previousState => ({ ...previousState, expanded: expanded }))} 
            />
        )
     }

    // const renderTablesByCategory = (fields) => {
    //     return fields.map((field, index) => {
    //         // const rows = props.fields.filter((field) => field.category.id === field.id)
    //         const rows = field.childOfFieldList ? field.childOfFieldList : [] 
    //         return (
    //             <>
    //                 <div className="my-2 text-xl font-medium">{ field.name }</div>
    //                 <button 
    //                     className="px-4 py-2 mb-4 text-white bg-green-500 rounded-lg"
    //                     onClick={() => onBtnAddClick(field.id)}
    //                 >
    //                     <ControlPointIcon />
    //                 </button>
    //                 <Table 
    //                     columns={columns} 
    //                     rows={renderRows(rows)}
    //                     editRowsModel={editRowsModel}
    //                     handleEditRowsModelChange={handleEditRowsModelChange} 
    //                 />
    //             </>
    //         )
    //     })

    // }


    return (
        
        <div className="mt-4">
            {/* <button 
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
            /> */}
            {/* { renderTablesByCategory(props.fields) } */}
            { renderCheckboxTreeView(props.fields) }
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        fields:  Object.values(state.fields),
        // categories:  Object.values(state.categories),
    };
}

export default connect(
    mapStateToProps, 
    { 
        fetchFields, createField, editField, deleteField
    }
)(AdminField);
