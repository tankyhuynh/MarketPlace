import environment from '../../../../environments/environment'
import axios from 'axios';
// import _ from 'lodash';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert'

import { Container, TextField  } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

import { CKEditor } from 'ckeditor4-react';
import { DropzoneArea } from 'material-ui-dropzone';

import { editGroup } from '../../../../actions/researchGroup'

import {
    STATUS_EDIT_SUCCESS

} from '../../../status.messsage'

import Combobox from '../Combobox'
import Checkbox from '../Checkcbox'

import logo from '../../../../assets/logo.png'
// import user_avatar from '../../../../assets/ReseacherG/vietnamese-agriculture-strengthened-by-ma.jpg'

const TYPE_TEXT = 'text'
const TYPE_EDITOR = 'editor'
// const TYPE_PASSWORD= 'password'
const TYPE_COMBOBOX = 'combobox'
const TYPE_CHECKBOX = 'checkbox'
const TYPE_IMAGE = 'image'

const genders = [
    {
        id: true,
        name: 'Nam'
    },
    {
        id: false,
        name: 'Nữ'
    },
    {
        id: false,
        name: 'Khác'
    }
]

const filebrowserUploadUrl = environment.url.java +  '/fileUploads/ckeditor';
const removeButtons = 'PasteFromWord'


const UpdateUser = (props) => {

    const history = useHistory();
    const alertUseAlert = useAlert()

    const [value, setValue] = useState(props.group ? props.group : {});

    // eslint-disable-next-line no-unused-vars
    const [isShowChipMember, setShowChipMember] = useState(false)
    // const [members, setMembers] = useState([])
    // const [searchMember, setSearchMember] = useState(null)
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   


    useEffect(() => {
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
                                        defaultValue={props.group ? props.group[field.field] : ''}
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
        const usersFormat = columns
                            .filter(field => ( field.isShow && field.type === TYPE_EDITOR) )            
                            .map(field => {
                                return (
                                    <div className="flex flex-col gap-4 mt-4">
                                        <section>{ field.headerName }</section>
                                        <CKEditor 
                                            id={field.id}
                                            name={field.field}
                                            activeClass={field.field}
                                            initData={props.group ? props.group[field.field] : ''}
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

    // const renderPasswordFields = () => {
    //     const usersFormat = columns
    //                         .filter(field => ( field.editable && field.type === TYPE_PASSWORD) )            
    //                         .map(field => {
    //                             return (
    //                                 <TextField 
    //                                     id="outlined-basic" 
    //                                     label={field ? field.headerName : ''} 
    //                                     variant="outlined"
    //                                     fullWidth
    //                                     className="w-full"
    //                                     type={field.type}
    //                                     // defaultValue={initialValue ? initialValue[field.field] : ''}
    //                                     onChange={(e) => handleChange(field.field, e.target.value)}
    //                                 />
    //                             )
    //     })
    
    //     return (
    //         <div className="flex flex-col gap-4">
    //             { usersFormat }
    //         </div>
    //     )
    // }

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
                                        <section>{ field.headerName }</section>
                                        <DropzoneArea
                                            acceptedFiles={['image/*']}
                                            dropzoneText={"Drag and drop an image here or click"}
                                            onChange={onImageChange}
                                            initialFiles={
                                            [ props.group 
                                                ? props.group.groupImage 
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
                                            selectedIndex={true} 
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
        props.editGroup(value)
        history.push('/admin/groups')
        alertUseAlert.success(STATUS_EDIT_SUCCESS)
    }

    const onCancelForm = () => {
        console.log(value)
    }

    

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     // return { ...state, ..._.mapKeys(action.payload, 'id') };
    //     let member = {};

    //     member = {
    //         name: searchMember,
    //         avatar: user_avatar
    //     }

    //     setMembers(
    //         { ...members, ..._.mapKeys(member, 'name') 
    //     })

    //     if(searchMember){
    //         member = {
    //             name: searchMember,
    //             avatar: user_avatar
    //         }
    //     }
    //     if(member){
    //         setMembers(
    //             { ...members, ..._.mapKeys(member, 'name') 
    //         })
    //     }
    //     setSearchMember(null)
        

    //     console.log('handleClick: ', members)

    // }

    // const handleDeleteMember = (member) => {
    //     console.log('handleDeleteMember: ', member)
    //     if(searchMember){
    //         setMembers(_.omit(members, member.name))
    //     }
    // }
    // const handleDeleteResult = () => {
    //     console.log('handleDeleteResult: ')
    //     setSearchMember(null)
    // }

    // const onSearchMember =  (member) => {
    //     console.log('onSearchMember: ', member)
    //     if(member === 'tanky'){
    //         setSearchMember({
    //             name: member,
    //             avatar: user_avatar
    //         })
    //     }
    //     else setShowChipMember(false)
    // }

    // const renderListMember = () => {
    //     if(members){
    //         return Object.values(members).map(member => {
    //             if(member.name){
    //                 return (
    //                     <Chip
    //                         label={member ? member.name : ''}
    //                         avatar={<Avatar alt="Natacha" src={member ? member.avatar : logo} />}
    //                         // onClick={handleClick}
    //                         onDelete={e =>handleDeleteMember(member)}
    //                         deleteIcon={<DeleteIcon />}
    //                         variant="outlined"
    //                     />
    //                 )
    //             }
    //             return null
    //         })
    //     }
    //     return null
    // }

    // const renderSearchResultMemberList = () => {
    //     if(searchMember){
    //         return (
    //             <section>
    //                 <Chip
    //                     label={searchMember ? searchMember.name : ''}
    //                     avatar={<Avatar alt="Natacha" src={searchMember ? searchMember.avatar : logo} />}
    //                     onClick={e => handleClick(e)}
    //                     onDelete={handleDeleteResult}
    //                     deleteIcon={<DeleteIcon />}
    //                     variant="outlined"
    //                 />
    //             </section>
    //         )
    //     }
    //     return null
    // } 

    return (
        <>
            <Container 
                maxWidth="lg"
                className="flex gap-4 p-2"
            >
                <div className="mt-2">
                    { renderTextFields() }
                </div>

                <div className="flex flex-col gap-4 mt-4">
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
                        Cập nhật
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
        // group: state.researchGroups[ownProps.match.params.id],
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        editGroup
    }
  )(UpdateUser);