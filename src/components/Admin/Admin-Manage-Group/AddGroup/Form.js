import environment from '../../../../environments/environment'
import axios from 'axios';
// import _ from 'lodash';
import { useHistory } from 'react-router-dom';


import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Container, TextField  } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

import { CKEditor } from 'ckeditor4-react';
import { DropzoneArea } from 'material-ui-dropzone';


import { createGroup } from '../../../../actions/researchGroup'
import { fetchRoles } from '../../../../actions/role'
import { fetchDomains } from '../../../../actions/domain'

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



const filebrowserUploadUrl = environment.url.java +  '/fileUploads/ckeditor';
const removeButtons = 'PasteFromWord'


const AddGroup = (props) => {

    const history = useHistory();

    const [value, setValue] = useState({});

    // eslint-disable-next-line no-unused-vars
    const [isShowChipMember, setShowChipMember] = useState(false)
    // const [members, setMembers] = useState([])
    // const [searchMember, setSearchMember] = useState(null)
    
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
    // const onGenderChange = (gender) => {
    //     console.log('Combobox change - gender: ', gender)
    //     handleChange('gender', gender)
    // }

    const onCheckboxEnableChange = (fieldName, checked) => {
        console.log('onCheckboxEnableChange: ', fieldName, checked);
        handleChange(fieldName, checked)
    }
 
    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log('onSubmitForm: ', value)
        props.createGroup(value)
        history.push('/admin/groups');
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

    

    // const renderSearchMember = () => {
    //     return (
    //         <div>
    //             <TextField 
    //                 id="outlined-basic" 
    //                 label={`Thêm thành viên`} 
    //                 variant="outlined"
    //                 fullWidth
    //                 className="w-full"
    //                 // defaultValue={initialValue ? initialValue[field.field] : ''}
    //                 onChange={(e) => onSearchMember(e.target.value)}
    //             />

    //             <section className="mt-2">
    //                 { renderListMember() }
    //             </section>

    //             <section className="mt-10 bg-gray-400">
    //                 { renderSearchResultMemberList() }
    //             </section>
                
    //         </div>
    //     )
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

                {/* <div className="mt-2">
                    { renderPasswordFields() }
                </div> */}

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


                {/* <div className="mt-4">
                    { renderSearchMember() }
                </div> */}
                
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
        createGroup
    }
  )(AddGroup);