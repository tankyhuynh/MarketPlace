import environment from '../../../../environments/environment'
import axios from 'axios';
// import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert'

import { Container, TextField  } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

import { CKEditor } from 'ckeditor4-react';
import { DropzoneArea } from 'material-ui-dropzone';

import { createGroup } from '../../../../actions/researchGroup_Admin'
import { fetchDomains } from '../../../../actions/domain'

import {
    STATUS_ADD_SUCCESS

} from '../../../status.messsage'

import Combobox from '../Combobox'
import Checkbox from '../Checkcbox'

import logo from '../../../../assets/logo.png'

const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
const TYPE_EDITOR = 'editor'
const TYPE_COMBOBOX = 'combobox'
const TYPE_CHECKBOX = 'checkbox'
const TYPE_IMAGE = 'image'

const filebrowserUploadUrl = environment.url.java +  '/fileUploads/ckeditor';
const removeButtons = 'PasteFromWord'


const AddGroup = (props) => {

    const history = useHistory();
    const alert = useAlert();

    const [value, setValue] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [isShowChipMember, setShowChipMember] = useState(false)
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    useEffect(() => {
        props.fetchDomains()
        // props.fetchRoles()
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

    const renderTextAreaFields = () => {
        return (
            columns
                .filter(field => field.editable && field.type === TYPE_TEXTAREA)            
                .map(field => {
                    return (
                        <TextField 
                            id="outlined-basic" 
                            label={field ? field.headerName : ''} 
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={6}
                            rowsMax={10}
                            // defaultValue={initialValue ? initialValue[field.field] : ''}
                            onChange={(e) => handleChange(field.field, e.target.value)} 
                        />
                    )
        }))
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
                                return (
                                    <div className="flex flex-col gap-4 mt-4">
                                        <section className="font-bold">
                                            { field.headerName }
                                        </section>
                                        <CKEditor 
                                            id={field.field}
                                            name={field.field}
                                            activeClass={field.field}
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
                    const imgSrc = response.data.url;

                    if (response.data) {
                        handleChange('groupImage', imgSrc)
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
                                        <section className="font-bold">
                                            { field.headerName }
                                        </section>
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

    const onCheckboxEnableChange = (fieldName, checked) => {
        console.log('onCheckboxEnableChange: ', fieldName, checked);
        handleChange(fieldName, checked)
    }
 
    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log('onSubmitForm: ', value)
        props.createGroup(value)
        history.push('/admin/groups');
        alert.success(STATUS_ADD_SUCCESS)
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
                    { renderTextAreaFields() }
                </div>

                <div className="flex flex-col gap-4">
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
        // roles: Object.values(state.roles),
        domains: Object.values(state.domains),
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        // fetchRoles,
        fetchDomains,
        createGroup
    }
  )(AddGroup);