import environment from '../../../environments/environment'

import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CKEditor } from 'ckeditor4-react';
import { useAlert } from 'react-alert'

import { Container, TextField } from '@mui/material';

// import { Link } from 'react-router-dom'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Avatar from '@mui/material/Avatar';
// import avatar from '../../../assets/ReseacherG/vietnamese-agriculture-strengthened-by-ma.jpg'
// import Editable from './TestEditables'

import ChangePassword from './change-password'

import { fetchUserProfileById , createUser, editResearcherUser } from '../../../actions/user'
import { fetchRoles } from '../../../actions/role'
import { fetchDomains } from '../../../actions/domain'

import { columns } from './table-definition'
import Combobox from './Combobox'
import Navbar from './Navbar'
// import Checkbox from './Checkcbox'



const TYPE_TEXT = 'text'
const TYPE_DATE = 'date'
const TYPE_EDITOR = 'editor'
const TYPE_PASSWORD = 'password'
const TYPE_COMBOBOX = 'combobox'
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

const ResearcherAccount = (props) => {

    const alertUseAlert = useAlert()


    const [isDisable, setDisable] = useState(true)
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState( props.user ? props.user : {} );
    // const [user, setUser] = useState(props.user ? props.user : {});
    
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   


    useEffect(() => {
        // props.fetchUserProfileById(props.userId)
        //     .then(response => {
        //         console.log('fetchUserProfileByIdresponse: ', response)
        //         setUser(response)
        //     })
        props.fetchDomains()
        props.fetchRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderTextFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.isShow && ( field.type === TYPE_TEXT || field.type === TYPE_DATE ) ) )            
                            .map(field => {
                                return (
                                    <TextField 
                                        id="outlined-basic" 
                                        type={field.type}
                                        label={field ? field.headerName : ''} 
                                        variant="outlined"
                                        disabled={isDisable || !field.editable}
                                        defaultValue={props.user ? props.user[field.field] : ''}
                                        onChange={(e) => handleChange(field.field, e.target.value)}
                                    />
                                )
        })
    
        return (
            <>
                { usersFormat }
            </>
        )
    }

    const handleCKEditorChange = (event, editor) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        
        handleChange(name, data)
    }

    const renderEditorFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.isShow && field.type === TYPE_EDITOR) )            
                            .map(field => {
                               if(!isDisable){
                                    return (
                                        <>
                                            <div className="mt-4 text-lg">
                                                { field.headerName }
                                            </div>
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
                                        </>
                                    )
                                }
                                return (
                                        <div 
                                            className="mt-6"
                                            dangerouslySetInnerHTML={{ __html: props.user ? props.user[field.field] : '' }} 
                                        />
                                )
                                
        })
    
        return (
            <>
                { usersFormat }
            </>
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
                            .filter(field => ( field.isShow && field.type === TYPE_COMBOBOX) )            
                            .map(field => {
                               if(field.field === 'gender'){
                                    return (
                                        <Combobox 
                                            label={field.headerName} 
                                            data={genders ? genders : []} 
                                            selectedIndex={ props.user ? props.user.gender : 1 } 
                                            onChecked={onGenderChange} 
                                        />
                                    )
                               }
                               else {
                                   if(!isDisable){
                                        return (
                                            <Combobox 
                                                label={field.headerName} 
                                                data={props[field.data]} 
                                                disabled={true}
                                                // selectedIndex={1} 
                                                selectedIndex={props.user ? (props.user[field.field] ? props.user[field.field].id : 1) : 1} 
                                                onChecked={field.field === 'domain' ? onDomainChange : onRoleChange} 
                                            />
                                        )
                                   }
                                   return (
                                       <div>
                                          {props.user ? (props.user[field.field] ? props.user[field.field].name : '') : ''} 
                                       </div>
                                   )
                               }
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
        handleChange('gender', genderNumber - 1)
    }

    // const onCheckboxEnableChange = (checked) => {
    //     handleChange('isEnabled', checked)
    // }
    // const onCheckboxUserFunctionChange = (checked) => {
    //     handleChange('userFunctiions', checked)
    // }

    const onDisableStatusChange = (event) => {
        event.preventDefault();
        setDisable(!isDisable)

    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log('onSubmitForm: ', value)

        const updateValue = {...value, 
            domainId: value.domain ? value.domain.id : null,
            roleId: value.role ? value.role.id : null,
        }
        // _.unset(updateValue, 'role')
        const omitObject = _.omit(updateValue, ['domain', 'role', 'userFunctionList'])

        console.log('onSubmitForm omitObject: ', omitObject)

        props.editResearcherUser(omitObject)
        alertUseAlert.success('Cập nhật thành công')
        setDisable(true)

        // history.push('/')

    }

    // const onCancelForm = () => {
    //     console.log(value)
    // }

    // const renderCheckboxUserFunctions = () => {
    //     const userFunctionList 
    //         = props.user ? (
    //             props.user.userFunctionList
    //                 .map(userFunction => {
    //                     return (
    //                         <Checkbox 
    //                             label={userFunction.function.description} 
    //                             isChecked={true} 
    //                             onCheckboxChange={(checked) => onCheckboxUserFunctionChange(checked)}
    //                         />
    //                     )
    //                 })
    //     )
    //     : null 
    
    //     return (
    //         <div className="flex flex-col gap-4">
    //             { userFunctionList }
    //         </div>
    //     )
    // }

    // const { fullName } = props.user

    return (

        <>
            {/* <Link to={'/admin/users'}>
                <ArrowBackIcon />
            </Link> */}
            <Container 
                maxWidth="lg"
                className="flex gap-4 p-2 mt-4"
            >   
            
            <div className="grid grid-cols-12 grid-rows-1 gap-4">
     
                <div className="flex flex-col col-span-3 border-2">
                    <Navbar user={props.user ? props.user : {}}/>
                </div>

                {/* <div className="col-span-9">
                    <Editable />
                </div> */}

                <div className="col-span-9"> 
                    
                    <div className="col-span-9 mb-4 text-3xl font-bold text-left">
                        Thông tin cá nhân
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        { renderTextFields() }
                    </div>
                    
                    <div className="mt-2">
                        { renderPasswordFields() }
                    </div>
                    
                    <div className="flex flex-col gap-4 mt-4">
                        { renderComboboxFields() }
                    </div>

                    <div className="mt-2">
                        { renderEditorFields() }
                    </div>
                    
                    <div className="mt-2">
                        {
                            !isDisable && <ChangePassword 
                                            isDisable={isDisable} 
                                            password={props.user ? props.user.password : ''}
                                            handleChange={handleChange}
                                        />
                        }
                    </div>

                    <div className="flex justify-end gap-2 my-2">
                        <button
                            onClick={e => onDisableStatusChange(e)}
                            className={`${isDisable ? 'bg-gray-500' : 'bg-red-500'} px-4 text-white py-2 rounded-lg`}
                        >
                            { isDisable ? 'Chỉnh sửa' : 'Hủy' }
                        </button>
                        {
                            !isDisable
                            ? (
                                <button
                                    onClick={e => onSubmitForm(e)}
                                    className="px-4 py-2 text-white bg-green-500 rounded-lg"
                                >
                                    Lưu lại
                                </button>
                            )
                            : null
                        }
                    </div>
                </div>
            </div>

            </Container>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        // user: state.users[state.auth.userId],
        // userId: state.auth.userId,
        roles: Object.values(state.roles),
        domains: Object.values(state.domains),
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchRoles,
        fetchDomains,
        fetchUserProfileById, 
        createUser, editResearcherUser
    }
  )(ResearcherAccount);

  