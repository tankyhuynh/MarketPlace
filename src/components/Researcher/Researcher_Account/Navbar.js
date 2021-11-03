import { Accordion, AccordionSummary } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.png';

// import { columns as columnsField, rows as rowsField} from '../Admin-Manage-Infomation/table-data-field';


import PeopleIcon from '@mui/icons-material/People';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BiotechIcon from '@mui/icons-material/Biotech';
import Avatar from '@mui/material/Avatar';

import avatar from '../../../assets/ReseacherG/vietnamese-agriculture-strengthened-by-ma.jpg'



const navItems = [
    {
        className: 'nav-items--active',
        icon: (
            <AddCircleOutlineIcon fontSize="large" />
        ),
        name: 'Tạo dự án',
        path: '/projects/new',
       
    },
    {
        className: 'nav-items',
        icon: (
            <BiotechIcon fontSize="large" />
        ),
        name: 'Dự án',
        path: '/researchers/projects',
    },
    {
        className: 'nav-items',
        icon: (
            <PeopleIcon fontSize="large" />
        ),
        name: 'Nhóm nghiên cứu',
        path: '/researchers/groups',
    },
   
]

const AdminHeader = (props) => {

    const renderNavItems = (items) => {
        return items.map((item, index) => {
            return (
                <Link 
                    to={`${item.path}`}
                    className="flex items-center gap-4 p-4 border-t-2 border-gray-500"
                    // onClick={() => alert(`${item.name} clicked`)}
                >
                    <section className="text-sm">{ item.icon }</section>
                    <section className="text-md">{ item.name }</section>
                </Link>
            )
        })
    }

    const { fullName } = props.user

    return (
        <div 
            className="z-20 flex-col h-screen text-black transition duration-200 transform sm:relative sm:translate-x-0 sidebar bg-blue-primary sm:flex" 
            id="navContainer"
        >
            <Link 
                to="/" 
                className="relative flex flex-col items-center justify-center mt-4"
            >
                <Avatar
                    alt={avatar}
                    src={avatar}
                    sx={{ width: 150, height: 150 }}
                />
                <div className="items-center my-2 text-xl font-medium">
                    { fullName ? fullName : '' }
                </div>  
            </Link>
            <div className="flex flex-col h-screen mx-2 mt-4">
                { renderNavItems(navItems) }
            </div>
        </div>
    )
}

export default AdminHeader;