import _ from 'lodash';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { Container, TextField, Chip, Avatar  } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { fetchUser ,createUser } from '../../../../actions/user'
import { fetchRoles } from '../../../../actions/role'
import { fetchDomains } from '../../../../actions/domain'

import { columns } from './table-definition'
import Combobox from '../Combobox'
import Checkbox from '../Checkcbox'

import logo from '../../../../assets/logo.png'
import user_avatar from '../../../../assets/ReseacherG/vietnamese-agriculture-strengthened-by-ma.jpg'


const TYPE_TEXT = 'text'
const TYPE_PASSWORD = 'password'
const TYPE_COMBOBOX = 'combobox'
// const TYPE_CHECKBOX = 'checkbox'

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


const EditUser = (props) => {

    const [value, setValue] = useState({
        domainId: 1,
        roleId: 1,
        isEnabled: false,
        gender: true
    });

    const [isShowChipMember, setShowChipMember] = useState(false)
    const [members, setMembers] = useState([])
    const [searchMember, setSearchMember] = useState(null)
    
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
                                            selectedIndex={true} 
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
    const onGenderChange = (gender) => {
        console.log('Combobox change - gender: ', gender)
        handleChange('gender', gender)
    }

    const onCheckboxEnableChange = (checked) => {
        handleChange('isEnabled', checked)
    }
    const onCheckboxUserFunctionChange = (checked) => {
        handleChange('userFunctiions', checked)
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
                                isChecked={true} 
                                onCheckboxChange={(checked) => onCheckboxUserFunctionChange(checked)}
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

    const onSearchMember =  (member) => {
        console.log('onSearchMember: ', member)
        if(member === 'tanky' || member === 'tankyhuynh'){
            setSearchMember({
                name: member,
                avatar: user_avatar
            })
        }
        else setSearchMember(null)
    }

    const handleClick = (e) => {
        e.preventDefault()
        // return { ...state, ..._.mapKeys(action.payload, 'id') };
        let member = {};

        member = {
            name: searchMember,
            avatar: user_avatar
        }

        setMembers(
            { ...members, ..._.mapKeys(member, 'name') 
        })

        if(searchMember){
            member = {
                name: searchMember,
                avatar: user_avatar
            }
        }
        if(member){
            setMembers(
                { ...members, ..._.mapKeys(member, 'name') 
            })
        }
        setSearchMember(null)
        

        console.log('handleClick: ', members)

    }

    const handleDeleteMember = (member) => {
        console.log('handleDeleteMember member: ', member)
        console.log('handleDeleteMember member: ', member.name === members[0], member.name,  members[member.name])
        console.log('handleDeleteMember members: ', members)
        console.log('handleDeleteMember members _.omit(members, member.name): ', _.omit(members, [member.name, 'undefined']))
        // if(searchMember){
            setMembers(_.omit(members, [member.name, 'undefined']))
        // }
    }
    const handleDeleteResult = () => {
        console.log('handleDeleteResult: ')
        setSearchMember(null)
    }

    const renderListMember = () => {
        if(members){
            return Object.values(members).map(member => {
                if(member.name){
                    return (
                        <Chip
                            label={member ? member.name : ''}
                            avatar={<Avatar alt="Natacha" src={member ? member.avatar : logo} />}
                            // onClick={handleClick}
                            onDelete={e =>handleDeleteMember(member)}
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
                    <ControlPointIcon />
                    <Chip
                        label={searchMember ? searchMember.name : ''}
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
                <>
                    <section className="text-xl">
                        Chọn vai trò của thành viên
                    </section>
                    <Combobox 
                        label={searchMember.name} 
                        data={props.roles} 
                        // selectedIndex={1} 
                        selectedIndex={1} 
                        onChecked={onRoleChange} 
                    />
                </>
            )
        }
        return null;
    }

    const renderSearchMember = () => {
        return (
            <div className="flex flex-col">
                <TextField 
                    id="outlined-basic" 
                    label={`Thêm thành viên`} 
                    variant="outlined"
                    fullWidth
                    className="w-full"
                    // defaultValue={initialValue ? initialValue[field.field] : ''}
                    onChange={(e) => onSearchMember(e.target.value)}
                />

                <section className="flex items-center justify-between gap-4 mt-4">
                    { renderComboboxRole() }
                </section>

                <section className="mt-2">
                    { renderListMember() }
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
                    <div className="col-span-12 mb-4 text-3xl font-bold text-center uppercase">
                        Cập nhật nhóm
                    </div>
                    <div className="col-span-6 col-start-4"> 
                        <div className="mb-4 text-2xl font-medium text-center">
                            Thông tin nhóm
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

                            {/* <Checkbox label="Enable" isChecked={false} onCheckboxChange={onCheckboxEnableChange} /> */}
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
        fetchUser, createUser
    }
  )(EditUser);

  