// import _ from 'lodash';
import axios from 'axios';
import environment from '../../../../../environments/environment'

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
// import { useHistory } from 'react-router-dom';

import { Container, TextField, Chip, Avatar  } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { fetchGroup, addMember, deleteMember } from '../../../../../actions/researchGroup'
import { fetchRolesOfGroup } from '../../../../../actions/roleOfGroup'
import { fetchDomains } from '../../../../../actions/domain'

// import { columns } from '../table-definition'
import Combobox from '../../Combobox'
// import Checkbox from '../../Checkcbox'

import logo from '../../../../../assets/logo.png'
// import user_avatar from '../../../../../assets/ReseacherG/vietnamese-agriculture-strengthened-by-ma.jpg'


// const TYPE_TEXT = 'text'
// const TYPE_PASSWORD = 'password'
// const TYPE_COMBOBOX = 'combobox'
// const TYPE_CHECKBOX = 'checkbox'

// const genders = [
//     {
//         id: true,
//         name: 'Nam'
//     },
//     {
//         id: false,
//         name: 'Nữ'
//     },
//     {
//         id: false,
//         name: 'Khác'
//     }
// ]

const MESSAGE_ADD_SUCCCESS = "Thêm thành viên thành công"
const MESSAGE_DELETE_SUCCCESS = "Xóa thành viên thành công"


const EditUser = (props) => {

    const alertUseAlert = useAlert();
    // const history = useHistory();


    const [value, setValue] = useState({
        researchGroupId: props.group ? props.group.id : 1,
        roleOfGroupId: 2

    });

    // const [isShowChipMember, setShowChipMember] = useState(false)
    const [members, setMembers] = useState(props.group ? props.group.groupDetailList : {})
    const [searchMember, setSearchMember] = useState(null)
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   


    useEffect(() => {
        props.fetchGroup(props.match.params.id);
        props.fetchDomains()
        props.fetchRolesOfGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const renderTextFields = () => {
    //     const usersFormat = columns
    //                         .filter(field => ( field.editable && field.type === TYPE_TEXT) )            
    //                         .map(field => {
    //                             return (
    //                                 <TextField 
    //                                     id="outlined-basic" 
    //                                     label={field ? field.headerName : ''} 
    //                                     variant="outlined"
    //                                     fullWidth
    //                                     className="w-full"
    //                                     defaultValue={props.user ? props.user[field.field] : ''}
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

    // const renderComboboxFields = () => {
    //     const usersFormat = columns
    //                         .filter(field => ( field.editable && field.type === TYPE_COMBOBOX) )            
    //                         .map(field => {
    //                            if(field.field === 'gender'){
    //                                 return (
    //                                     <Combobox 
    //                                         label={field.headerName} 
    //                                         data={genders ? genders : []} 
    //                                         selectedIndex={true} 
    //                                         onChecked={onGenderChange} 
    //                                     />
    //                                 )
    //                            }
    //                            return (
    //                             <Combobox 
    //                                 label={field.headerName} 
    //                                 data={props[field.data]} 
    //                                 // selectedIndex={1} 
    //                                 selectedIndex={props.user ? (props.user[field.field] ? props.user[field.field].id : 1) : 1} 
    //                                 onChecked={field.field === 'domainId' ? onDomainChange : onRoleChange} 
    //                             />
    //                         )
    //     })
    
    //     return (
    //         <div className="flex flex-col gap-5">
    //             { usersFormat }
    //         </div>
    //     )
    // }

    // const onDomainChange = (domainId) => {
    //     console.log('Combobox change - domainId: ', domainId)
    //     handleChange('domainId', domainId)
    // }
    const onRoleChange = (roleId) => {
        console.log('Combobox change - roleId: ', roleId)
        handleChange('roleOfGroupId', roleId)
        handleChange('userProfileId', searchMember.id)
    }
    // const onGenderChange = (gender) => {
    //     console.log('Combobox change - gender: ', gender)
    //     handleChange('gender', gender)
    // }

    // const onCheckboxEnableChange = (checked) => {
    //     handleChange('isEnabled', checked)
    // }
    // const onCheckboxUserFunctionChange = (checked) => {
    //     handleChange('userFunctiions', checked)
    // }

    // const onSubmitForm = (event) => {
    //     event.preventDefault();
    //     console.log('onSubmitForm: ', value)
    //     props.createUser(value)
    // }

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

    const onSearchMember =  (username) => {

        axios.get(environment.url.java_admin + `/admin/users/username/${username}`)
                .then(response => {
                    // console.log('reponse.data.location: ', response.data.location);
                    // const imgSrc = response.data.location;
                    const memberData = response.data;
                    console.log('response.data: ', memberData);

                    if (response.data) {
                        setSearchMember(memberData)
                        // setMembers( previousState => ({ ...previousState, [memberData.username] : memberData }) )
                        handleChange('userProfileId', memberData.id)
                    } else {
                        setSearchMember(null)
                    }
                })

        // console.log('onSearchMember: ', username)
        // if(username === 'tanky' || username === 'tankyhuynh'){
        //     setSearchMember({
        //         name: username,
        //         avatar: user_avatar
        //     })
        // }
        // else setSearchMember(null)
    }


    const handleClick = (e) => {
        e.preventDefault()
        console.log('handleClick members: ', members);
        console.log('handleClick searchMember: ', searchMember);

        setMembers( previousState => ({ ...previousState, [members.length]: searchMember }) )
        setSearchMember(null)

        props.addMember(value);
        // history.push('/admin/groups')
        alertUseAlert.success(MESSAGE_ADD_SUCCCESS)
    }

    const handleDeleteMember = (member) => {
        // setMembers(_.omit(members, [member.username, 'undefined']))

        if(members.length){
            const filteredList = members.filter(item => item.userProfile.id !== member.id )
            setMembers(filteredList)
            props.deleteMember(value.researchGroupId, member.id, value.roleOfGroupId)
            alertUseAlert.error(MESSAGE_DELETE_SUCCCESS)
        }
    }
    const handleDeleteResult = () => {
        setSearchMember(null)
    }

    const renderListMember = (membersList) => {
        console.log('renderListMember: ', membersList)
        if(membersList){
            return Object.values(membersList).map(member => {
                 console.log('renderMember: ', member)
                if(member){
                   if(member.userProfile){
                        return (
                            <Chip
                                label={member ? member.userProfile.fullName : ''}
                                avatar={<Avatar alt="Natacha" src={member.userProfile ? member.userProfile.avatar : logo} />}
                                // onClick={handleClick}
                                onDelete={e =>handleDeleteMember(member.userProfile)}
                                deleteIcon={<DeleteIcon />}
                                variant="outlined"
                            />
                        )
                   }
                    return (
                        <Chip
                            label={member ? member.fullName : ''}
                            avatar={<Avatar alt="Natacha" src={member.userProfile ? member.userProfile.avatar : logo} />}
                            // onClick={handleClick}
                            onDelete={e =>handleDeleteMember(member.userProfile)}
                            deleteIcon={<DeleteIcon />}
                            variant="outlined"
                        />
                    )
                }
                return null
            })
        }
        return null
    }

    const renderSearchResultMemberList = () => {
        if(searchMember){
            return (
                <section>
                    <button onClick={e => handleClick(e)}>
                        <ControlPointIcon />
                    </button>
                    <Chip
                        label={searchMember ? searchMember.fullName : ''}
                        avatar={<Avatar alt="Natacha" src={searchMember ? searchMember.avatar : logo} />}
                        onClick={e => handleClick(e)}
                        onDelete={handleDeleteResult}
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                    />
                </section>
            )
        }
        return null
    } 

    const renderComboboxRole = () => {
        if(searchMember){
            return (
                <div className="grid w-full grid-cols-2">
                    <section className="w-1/2 text-lg">
                        Chọn vai trò của thành viên
                    </section>
                    <section className="w-1/2">
                        <Combobox 
                            label={searchMember.name} 
                            data={props.rolesOfGroup} 
                            // selectedIndex={1} 
                            selectedIndex={2} 
                            onChecked={onRoleChange} 
                        />
                    </section>
                </div>
            )
        }
        return null;
    }

    const renderSearchMember = () => {
        return (
            <div className="flex flex-col">
                <div className="grid">
                    <section>
                        <TextField 
                            id="outlined-basic" 
                            label={`Tên thành viên`} 
                            variant="outlined"
                            fullWidth
                            className="w-full"
                            // defaultValue={initialValue ? initialValue[field.field] : ''}
                            onChange={(e) => onSearchMember(e.target.value)}
                        />
                    </section>

                    <section className="flex gap-4 mt-4 ">
                        { renderComboboxRole() }
                    </section>
                </div>

                <section className="mt-2">
                    { renderListMember(members) }
                </section>

                <section className="mt-10">
                    { renderSearchResultMemberList() }
                </section>
                
            </div>
        )
    }

    return (

        <>
            <Link to={'/admin/groups'}>
                <ArrowBackIcon />
            </Link>
            <Container 
                maxWidth="lg"
                className="flex gap-4 p-2"
            >   
                

                <div className="grid grid-cols-12 gap-4">
                    {/* <div className="col-span-12 mb-4 text-3xl font-bold text-center uppercase">
                        Cập nhật nhóm
                    </div> */}
                    <div className="col-span-6 col-start-4"> 
                        <div className="mb-4 text-2xl font-medium text-center">
                            Thêm thành viên
                        </div>
                        <div className="mt-2">
                            { renderSearchMember() }
                        </div>
                        
                    </div>
                </div>

            </Container>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        group: state.researchGroups[ownProps.match.params.id],
        rolesOfGroup: Object.values(state.rolesOfGroup),
        domains: Object.values(state.domains),
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchRolesOfGroup,
        fetchDomains,
        fetchGroup, addMember, deleteMember
    }
  )(EditUser);

  