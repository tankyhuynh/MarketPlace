import environment from '../../../../environments/environment'
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Container, TextField } from '@mui/material';
import { CKEditor } from 'ckeditor4-react';
import { DropzoneArea } from 'material-ui-dropzone';

import { createUser } from '../../../../actions/user'
import { fetchRoles } from '../../../../actions/role'
import { fetchDomains } from '../../../../actions/domain'

import Combobox from '../Combobox'
import Checkbox from '../Checkcbox'

import logo from '../../../../assets/logo.png'


const TYPE_TEXT = 'text'
const TYPE_EDITOR = 'editor'
const TYPE_PASSWORD= 'password'
const TYPE_COMBOBOX = 'combobox'
const TYPE_CHECKBOX = 'checkbox'
const TYPE_IMAGE = 'image'

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

const filebrowserUploadUrl = environment.url.java +  '/fileUploads/ckeditor';
const removeButtons = 'PasteFromWord'


const AddUser = (props) => {

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
        props.fetchDomains()
        props.fetchRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { columns } = props

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

    const handleCKEditorChange = () => {
        console.log();
    }

    const renderEditorFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.isShow && field.type === TYPE_EDITOR) )            
                            .map(field => {
                                return (
                                    <div className="flex flex-col gap-4 mt-4">
                                        <section>{ field.headerName }</section>
                                        <CKEditor 
                                            id={field.id}
                                            name={field.fieldName}
                                            activeClass={field.fieldName}
                                            // initData={project ? project[field.fieldName] : ''}
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

    const renderCheckboxFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_CHECKBOX) )            
                            .map(field => {
                                return (
                                    <Checkbox label={field.headerName} fieldName={field.field} isChecked={false} onCheckboxChange={onCheckboxEnableChange} />
                                )
        })
    
        return (
            <div className="flex gap-4">
                { usersFormat }
            </div>
        )
    }

    const onImageChange = (files) => {
        console.log('onProjectImageChange', files)
            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("upload", files[0]);

            axios.post(environment.url.java + '/fileUploads/ckeditor', formData, config)
                .then(response => {
                    console.log('upload iamge: ', response);
                    // console.log('reponse.data.location: ', response.data.location);
                    // const imgSrc = response.data.location;
                    console.log('response.data.url: ', response.data.url);
                    const imgSrc = response.data.url;

                    if (response.data) {
                        handleChange('productImage', imgSrc)
                    } else {
                        return alert('failed to upload file')
                    }
                })
    }

    const renderImageFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_IMAGE) )            
                            .map(field => {
                                return (
                                   <div className="flex flex-col gap-4 mt-4">
                                        <section>{ field.headerName }</section>
                                        <DropzoneArea
                                            acceptedFiles={['image/*']}
                                            dropzoneText={"Drag and drop an image here or click"}
                                            onChange={onImageChange}
                                            initialFiles={
                                            [ props.project 
                                                ? props.project.productImage 
                                                : logo
                                            ]}
                                        />
                                   </div>
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
                                            selectedIndex={0} 
                                            onChecked={onGenderChange} 
                                        />
                                    )
                               }
                               return (
                                <Combobox 
                                    label={field.headerName} 
                                    data={props[field.data]} 
                                    selectedIndex={1} 
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
    const onGenderChange = (gender) => {
        console.log('Combobox change - gender: ', gender)
        handleChange('gender', gender)
    }

    const onCheckboxEnableChange = (fieldName, checked) => {
        console.log('onCheckboxEnableChange: ', fieldName, checked);
        handleChange(fieldName, checked)
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log('onSubmitForm: ', value)
        // props.createUser(value)
    }

    const onCancelForm = () => {
        console.log(value)
    }


    return (
        <>
            <Container 
                maxWidth="lg"
                className="flex gap-4 p-2"
            >
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

                    { renderCheckboxFields() }
                </div>

                <div>
                    { renderEditorFields() }
                </div>
                
                <div>
                    { renderImageFields() }
                </div>

                <div className="flex justify-end gap-2 my-2">
                    <button
                        onClick={e => onSubmitForm(e)}
                        className="px-4 py-2 text-white bg-green-500 rounded-lg"
                    >
                        Thêm
                    </button>
                    <button
                        onClick={e => onCancelForm(e)}
                        className="px-4 py-2 text-white bg-red-500 rounded-lg"
                    >
                        Hủy
                    </button>
                </div>

            </Container>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        roles: Object.values(state.roles),
        domains: Object.values(state.domains),
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchRoles,
        fetchDomains,
        createUser
    }
  )(AddUser);