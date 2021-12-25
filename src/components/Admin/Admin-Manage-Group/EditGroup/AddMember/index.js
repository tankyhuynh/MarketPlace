import _ from 'lodash';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { Container, Chip, Avatar  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { fetchGroup, addMember, deleteMember } from '../../../../../actions/researchGroup_Admin'
import { fetchRolesOfGroup } from '../../../../../actions/roleOfGroup'
import { fetchUsers } from '../../../../../actions/userAdmin'
import { fetchDomains } from '../../../../../actions/domain'

import Combobox from '../../Combobox'
import ComboboxUser from '../../ComboboxUser'

const MESSAGE_ADD_SUCCCESS = "Thêm thành viên thành công"
const MESSAGE_DELETE_SUCCCESS = "Xóa thành viên thành công"

const EditUser = (props) => {

    const alertUseAlert = useAlert();

    const [value, setValue] = useState({
        researchGroupId: props.group ? props.group.id : 1,
        roleOfGroupId: 2,
        userProfileId: 1

    });

    const [members, setMembers] = useState(props.group ? props.group.groupDetailList : {})
    // eslint-disable-next-line
    const [searchMember, setSearchMember] = useState(null)
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    useEffect(() => {
        props.fetchGroup(props.match.params.id);
        props.fetchDomains()
        props.fetchRolesOfGroup()
        props.fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRoleChange = (roleId) => {
        console.log('Combobox change - roleId: ', roleId)
        handleChange('roleOfGroupId', roleId)
    }
    const onUserChange = (userProfileId) => {
        console.log('Combobox change - userId: ', userProfileId)
        handleChange('userProfileId', userProfileId)
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log('handleClick value: ', value);

        // setMembers( previousState => ({ ...previousState, [members.length]: props.users[value.userProfileId] }) )
        setMembers( previousState => ({ ...previousState, [value.userProfileId]: props.users[value.userProfileId - 1] }) )
        setSearchMember(null)

        props.addMember(value);
        alertUseAlert.success(MESSAGE_ADD_SUCCCESS)
    }

    const handleDeleteMember = (member, roleOfGroup) => {
        console.log('handleDeleteMember member: ', member, "roleOfGroupId: ", roleOfGroup)
        console.log('members.length: ', members.length)
        if(members){
            if(members.length){
                console.log('members.length: ', members.length)
                const filteredList = members.filter(item => item.userProfile.id !== member.id )
                setMembers(filteredList)
            }
            else setMembers(_.omit(members, [member.id]))

            props.deleteMember(value.researchGroupId, member.id, roleOfGroup)
            alertUseAlert.error(MESSAGE_DELETE_SUCCCESS)
        }
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
                                avatar={<Avatar alt="Natacha" src={member.userProfile ? member.userProfile.avatar : ''} />}
                                onDelete={e =>handleDeleteMember(member.userProfile, member.roleOfGroup.id)}
                                deleteIcon={<DeleteIcon />}
                                variant="outlined"
                            />
                        )
                   }
                    return (
                        <Chip
                            label={member ? member.fullName : ''}
                            avatar={<Avatar alt="Natacha" src={member.userProfile ? member.userProfile.avatar : ''} />}
                            onDelete={e =>handleDeleteMember(member, value.roleOfGroupId)}
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

    const renderComboboxRoles = () => {
        return (
            <div className="flex flex-col gap-2">
                <section className="grid grid-cols-2 gap-2 justify-between">
                    Tên thành viên
                    <ComboboxUser 
                        data={props.users} 
                        onChecked={onUserChange} 
                    />
                </section>
                <section className="grid grid-cols-2 gap-2 justify-between">
                    Chọn vai trò của thành viên
                    <Combobox 
                        data={props.rolesOfGroup} 
                        selectedIndex={2} 
                        onChecked={onRoleChange} 
                    />
                </section>
            </div>
        )
    }

    const renderSearchMember = () => {
        return (
            <div className="flex flex-col">
                <div className="grid">
                    <section className="flex gap-4 mt-4 ">
                        { renderComboboxRoles() }
                    </section>
                    
                    <section className="flex gap-4 mt-4 justify-end">
                        <button 
                            className="rounded-xl bg-green-500 px-4 py-2 text-white"
                            onClick={e => handleClick(e)}
                        >
                            Thêm thành viên
                        </button>
                    </section>
                </div>

                <section className="mt-2">
                    { renderListMember(members) }
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
        group: state.adminResearchGroups[ownProps.match.params.id],
        rolesOfGroup: Object.values(state.rolesOfGroup),
        domains: Object.values(state.domains),
        users: Object.values(state.users),
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchRolesOfGroup,
        fetchUsers,
        fetchDomains,
        fetchGroup, addMember, deleteMember
    }
  )(EditUser);

  