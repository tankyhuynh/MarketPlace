import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { Container, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { fetchUser, createUser, editUserFunction } from '../../../../actions/user'
import { fetchRoles } from '../../../../actions/role'
import { fetchDomains } from '../../../../actions/domain'

import { columns } from './table-definition'
import Combobox from '../Combobox'
import Checkbox from '../Checkcbox'


const TYPE_TEXT = 'text'
const TYPE_PASSWORD = 'password'
const TYPE_COMBOBOX = 'combobox'
// const TYPE_CHECKBOX = 'checkbox'

const genders = [
    {
        id: 1,
        name: 'Nam'
    },
    {
        id: 2,
        name: 'Nữ'
    },
    {
        id: 3,
        name: 'Khác'
    }
]

const EditUser = (props) => {
    const alertUseAlert = useAlert()

    const [value, setValue] = useState({
        domainId: 1,
        roleId: 1,
        isEnabled: false,
        gender: true
    });
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   


    useEffect(() => {
        props.fetchUser(props.match.params.id);
        props.fetchDomains()
        props.fetchRoles()
    }, [])

    const renderTextFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_TEXT) )            
                            .map(field => {
                                return (
                                    <TextField 
                                        id="outlined-basic" 
                                        label={field ? field.headerName : ''} 
                                        variant="outlined"
                                        fullWidth
                                        className="w-full"
                                        defaultValue={props.user ? props.user[field.field] : ''}
                                        onChange={(e) => handleChange(field.field, e.target.value)}
                                    />
                                )
        })
    
        return (
            <div className="flex flex-col gap-4">
                { usersFormat }
            </div>
        )
    }

    const renderPasswordFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_PASSWORD) )            
                            .map(field => {
                                return (
                                    <TextField 
                                        id="outlined-basic" 
                                        label={field ? field.headerName : ''} 
                                        variant="outlined"
                                        fullWidth
                                        className="w-full"
                                        type={field.type}
                                        // defaultValue={initialValue ? initialValue[field.field] : ''}
                                        onChange={(e) => handleChange(field.field, e.target.value)}
                                    />
                                )
        })
    
        return (
            <div className="flex flex-col gap-4">
                { usersFormat }
            </div>
        )
    }

    const renderComboboxFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_COMBOBOX) )            
                            .map(field => {
                               if(field.field === 'gender'){
                                    return (
                                        <Combobox 
                                            label={field.headerName} 
                                            data={genders ? genders : []} 
                                            selectedIndex={props.user ? props.user.gender : 0} 
                                            onChecked={onGenderChange} 
                                        />
                                    )
                               }
                               return (
                                <Combobox 
                                    label={field.headerName} 
                                    data={props[field.data]} 
                                    // selectedIndex={1} 
                                    selectedIndex={props.user ? (props.user[field.field] ? props.user[field.field].id : 1) : 1} 
                                    onChecked={field.field === 'domainId' ? onDomainChange : onRoleChange} 
                                />
                            )
        })
    
        return (
            <div className="flex flex-col gap-5">
                { usersFormat }
            </div>
        )
    }

    const onDomainChange = (domainId) => {
        console.log('Combobox change - domainId: ', domainId)
        handleChange('domainId', domainId)
    }
    const onRoleChange = (roleId) => {
        console.log('Combobox change - roleId: ', roleId)
        handleChange('roleId', roleId)
    }
    const onGenderChange = (genderNumber) => {
        console.log('Combobox change - gender: ', genderNumber)
        handleChange('gender', genderNumber - 1 )
    }

    const onCheckboxEnableChange = (checked) => {
        handleChange('isEnabled', checked)
    }
    const onCheckboxUserFunctionChange = (userId, functionId, checked, functionDescription)  => {
        console.log('onCheckboxUserFunctionChange: ', userId, functionId, checked)
        props.editUserFunction(userId, functionId, checked)

        const status = checked ? 'bật' : 'tắt';
        const message = 'Đã ' + status + ' chức năng ' +  functionDescription
        
        if(checked){
            alertUseAlert.success(message);
        }
        else {
            alertUseAlert.error(message)
        }
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log('onSubmitForm: ', value)
        props.createUser(value)
    }

    const onCancelForm = () => {
        console.log(value)
    }

    const renderCheckboxUserFunctions = () => {
        const userFunctionList 
            = props.user ? (
                props.user.userFunctionList
                    .map(userFunction => {
                        return (
                            <Checkbox 
                                label={userFunction.function.description} 
                                isChecked={userFunction.isEnable} 
                                onCheckboxChange={(fieldName, checked) => onCheckboxUserFunctionChange(props.user.id, userFunction.function.id, checked, userFunction.function.description)}
                            />
                        )
                    })
        )
        : null 
    
        return (
            <div className="flex flex-col gap-4">
                { userFunctionList }
            </div>
        )
    }

    return (

        <>
            <Link to={'/admin/users'}>
                <ArrowBackIcon />
            </Link>
            <Container 
                maxWidth="lg"
                className="flex gap-4 p-2"
            >   
                <div className="mb-6 text-2xl font-bold text-center uppercase">
                    Cập nhật người dùng
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6"> 
                        <div className="mb-4 text-2xl font-medium">
                            Thông tin người dùng
                        </div>
                        <div className="mt-2">
                            { renderTextFields() }
                        </div>
                        
                        <div className="mt-2">
                            { renderPasswordFields() }
                        </div>

                        <div className="flex flex-col gap-4 mt-4">

                            {/* // label, data, selectedIndex, onChecked */}
                            {/* <Combobox label="Tên miền" data={props.domains} selectedIndex={1} onDomainChange={onDomainChange} />
                            <Combobox label="Vai trò" data={props.roles} selectedIndex={1} onRoleChange={onRoleChange}/> */}
                            
                            { renderComboboxFields() }

                            <Checkbox label="Enable" isChecked={false} onCheckboxChange={onCheckboxEnableChange} />
                        </div>

                        <div className="flex justify-end gap-2 my-2">
                            <button
                                onClick={e => onSubmitForm(e)}
                                className="px-4 py-2 text-white bg-green-500 rounded-lg"
                            >
                                Cập nhật
                            </button>
                            <button
                                onClick={e => onCancelForm(e)}
                                className="px-4 py-2 text-white bg-red-500 rounded-lg"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>

                    <div className="col-span-6">
                        <div className="mb-4 text-2xl font-medium">
                            Quyền truy cập 
                        </div>
                        <div className="mt-2">
                            { renderCheckboxUserFunctions() }
                        </div>

                    </div>
                </div>

            </Container>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        user: state.users[ownProps.match.params.id],
        roles: Object.values(state.roles),
        domains: Object.values(state.domains),
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchRoles,
        fetchDomains,
        fetchUser, createUser, editUserFunction
    }
  )(EditUser);

  