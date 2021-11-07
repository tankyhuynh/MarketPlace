import _ from 'lodash';
import environment from '../../../../environments/environment';
import { ROLE_ADMIN, ROLE_NNC, ROLE_USER } from '../../../../environments/constraints'

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from 'react-router-dom';

import { Container, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { 
    fetchUser, 
    fetchUserProfileById,
    createUser, 
    editUser, 
    editNormalUser_Admin,
    editResearcherUser_Admin, 
    editAdminUser_Admin,
    editUserFunction 

} from '../../../../actions/user'
import { fetchRoles } from '../../../../actions/role'
import { fetchDomains } from '../../../../actions/domain'

import { columns as normalUserColumn } from '../AddUser/table-definition-normalUser'
import { columns as researcherColumn } from '../AddUser/table-definition-researcherUser'
import { columns as adminColumn } from '../AddUser/table-definition-admin'

import Combobox from '../Combobox'
import Checkbox from '../Checkcbox'


const TYPE_TEXT = 'text'
const TYPE_DATE = 'date'
const TYPE_PASSWORD = 'password'
const TYPE_COMBOBOX = 'combobox'
const TYPE_EDITOR = 'editor'
// const TYPE_CHECKBOX = 'checkbox'

const filebrowserUploadUrl = environment.url.java +  '/fileUploads/ckeditor';
const removeButtons = 'PasteFromWord'

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
    const history = useHistory();


    const [value, setValue] = useState(props.user 
        ?  {
            ...props.user, 
            domainId: props.user ? (props.user.domain? props.user.domain.id : 1) : 1,
            roleId: props.user ? (props.user.role ? props.user.role.id : 1 ) : 1,
        } 
        : {}
    );
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   


    useEffect(() => {
        props.fetchUserProfileById(props.match.params.id);
        props.fetchDomains()
        props.fetchRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderTextFields = () => {
        const usersFormat = 
                            (
                                props.user 
                                ? (
                                    props.user.role
                                    ? (
                                        props.user.role.code === ROLE_USER ? normalUserColumn : 
                                        props.user.role.code === ROLE_NNC ? researcherColumn : 
                                        props.user.role.code === ROLE_ADMIN ? adminColumn : []
                                    ) 
                                    : []
                                )
                                : [] 
                            )
                            .filter(field => ( field.editable && (field.type === TYPE_TEXT || field.type === TYPE_DATE) ) )            
                            .map(field => {
                                return (
                                    <TextField 
                                        id="outlined-basic" 
                                        type={field.type}
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
        const usersFormat = 
                            (
                                props.user 
                                ? (
                                    props.user.role
                                    ? (
                                        props.user.role.code === ROLE_USER ? normalUserColumn : 
                                        props.user.role.code === ROLE_NNC ? researcherColumn : 
                                        props.user.role.code === ROLE_ADMIN ? adminColumn : []
                                    ) 
                                    : []
                                )
                                : [] 
                            )
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

    const handleCKEditorChange = (event, editor) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        
        handleChange(name, data)
    }

    const renderEditorFields = () => {
        const usersFormat = 
                            (
                                props.user 
                                ? (
                                    props.user.role
                                    ? (
                                        props.user.role.code === ROLE_USER ? normalUserColumn : 
                                        props.user.role.code === ROLE_NNC ? researcherColumn : 
                                        props.user.role.code === ROLE_ADMIN ? adminColumn : []
                                    ) 
                                    : []
                                )
                                : [] 
                            )
                            .filter(field => ( field.isShow && field.type === TYPE_EDITOR) )            
                            .map(field => {
                                return (
                                    <div className="flex flex-col gap-4">
                                        <section>{ field.headerName }</section>
                                        <CKEditor 
                                            id={field.field}
                                            name={field.field}
                                            activeClass={field.field}
                                            initData={props.user ? props.user[field.field] : ''}
                                            editorUrl="https://cdn.ckeditor.com/4.16.2/full/ckeditor.js"
                                            config={{
                                                filebrowserUploadUrl: filebrowserUploadUrl,
                                                removeButtons: removeButtons,
                                                isReadOnly: true,
                                                height: 400
                                            }}
                                            onChange={handleCKEditorChange}
                                        />
                                    </div>
                                )
        })
    
        return (
            <>
                { usersFormat }
            </>
        )
    }

    const renderComboboxFields = () => {
        const usersFormat = 
                            (
                                props.user 
                                ? (
                                    props.user.role
                                    ? (
                                        props.user.role.code === ROLE_USER ? normalUserColumn : 
                                        props.user.role.code === ROLE_NNC ? researcherColumn : 
                                        props.user.role.code === ROLE_ADMIN ? adminColumn : []
                                    ) 
                                    : []
                                )
                                : [] 
                            )
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
                                    selectedIndex={props.user ? (props.user[field.parent] ? props.user[field.parent].id : 1) : 1} 
                                    // selectedIndex={props.user ? props.user[field.parent].id  : 1} 
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
        console.log('onCheckboxEnableChange change - enable: ', checked)
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

    const onSubmit_NormalUser = (event) => {

        // "fullName": "string",
        // "avatar": "string",
        // "email": "string",
        // "phoneNumber": "string",
        // "address": "string",
        // "getNews": true,
        // "gender": 0,
        // "username": "string",
        // "password": "string"

        event.preventDefault();
        
        const updateValue = {...value, 
            domainId: value.domain ? value.domain.id : null,
            // roleId: value.role ? value.role.id : null,
        }
        // _.unset(updateValue, 'role')
        const omitObject = _.omit(updateValue, ['domain', 'role', 'userFunctionList'])

        console.log('onSubmitForm omitObject: ', omitObject)
        props.editNormalUser_Admin(omitObject)
            .then(() => {
                alertUseAlert.success('Đã cập nhật thông tin người dùng')
                history.push('/admin/users')
            })

    }
    const onSubmit_ResearcherUser = (event) => {

        // {
        //     "fullName": "string",
        //     "email": "string",
        //     "phoneNumber": "string",
        //     "address": "string",
        //     "gender": 0,
        //     "dob": "string",
        //     "username": "string",
        //     "password": "string",
        //     "avatar": "string",
        //     "bio": "string",
        //     "website": "string",
        //     "qualification": "string",
        //     "domainId": 0,
        //     "roleId": 0,
        //     "isEnabled": true
        //   }

        event.preventDefault();
        
        const updateValue = {...value, 
            domainId: value.domain ? value.domain.id : null,
            roleId: value.role ? value.role.id : null,
        }
        // _.unset(updateValue, 'role')
        const omitObject = _.omit(updateValue, ['domain', 'role', 'userFunctionList'])

        console.log('onSubmitForm omitObject: ', omitObject)
        props.editResearcherUser_Admin(omitObject)
        alertUseAlert.success('Đã cập nhật thông tin người dùng')

        history.push('/admin/users')
    }
    const onSubmit_AdminUser = (event) => {

        // "fullName": "string",
        // "email": "string",
        // "phoneNumber": "string",
        // "address": "string",
        // "username": "string",
        // "password": "string",
        // "isEnabled": true,
        // "domainId": 0,
        // "roleId": 0

        event.preventDefault();
        
        const omitObject = _.omit(value, ['domain', 'role', 'userFunctionList'])

        console.log('onSubmitForm omitObject: ', omitObject)
        props.editAdminUser_Admin(omitObject)
            .then(response => {
                history.push('/admin/users')
                alertUseAlert.success('Đã cập nhật quản trị viên')
            })

    }

    const onSubmitForm = (event) => {
        console.log('onSubmitForm: ', value)
        if(props.user.role.code === ROLE_NNC){
            onSubmit_ResearcherUser(event)
        }
        if(props.user.role.code === ROLE_ADMIN){
            onSubmit_AdminUser(event)
        }
        else {
            onSubmit_NormalUser(event)
        }
    }

    const onCancelForm = () => {
        console.log(value)
    }

    const renderCheckboxUserFunctions = () => {
        const userFunctionList 
            = props.user 
            ? (
                props.user.userFunctionList
                ? props.user.userFunctionList
                    .map(userFunction => {
                        return (
                            <Checkbox 
                                label={userFunction.function.description} 
                                isChecked={userFunction.isEnable} 
                                onCheckboxChange={(fieldName, checked) => onCheckboxUserFunctionChange(props.user.id, userFunction.function.id, checked, userFunction.function.description)}
                            />
                        )
                    })
                : null
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

                            <Checkbox 
                                label="Enable" 
                                fieldName="isEnabled"
                                isChecked={ props.user ? props.user.isEnabled : false } 
                                onCheckboxChange={(fieldName, isChecked) => onCheckboxEnableChange(isChecked)} 
                            />

                        <div className="mt-2">
                            { renderEditorFields() }
                        </div>

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
        fetchUser, fetchUserProfileById, createUser, editUser, 
        editNormalUser_Admin, editResearcherUser_Admin, editAdminUser_Admin,
        editUserFunction
    }
  )(EditUser);

  