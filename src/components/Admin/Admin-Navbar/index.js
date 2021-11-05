import { Accordion, AccordionSummary } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.png';

// import { columns as columnsField, rows as rowsField} from '../Admin-Manage-Infomation/table-data-field';


import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import DnsIcon from '@mui/icons-material/Dns';
import FunctionsIcon from '@mui/icons-material/Functions';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import PreviewIcon from '@mui/icons-material/Preview';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const navItems = {
    1: {
        className: 'nav-items--active',
        icon: <HomeIcon />,
        name: 'Quản lý thông tin',
        path: '/informations',
       
    },
    2: {
        className: 'nav-items',
        icon: <AppsIcon />,
        name: 'Quản lý dự án',
        path: '/projects',
    },
    3: {
        className: 'nav-items',
        icon: <InfoIcon />,
        name: 'Quản lý người dùng',
        path: '/users',
    },
    4: {
        className: 'nav-items',
        icon: <ImagesearchRollerIcon />,
        name: 'Quản lý vai trò',
        path: '/roles',
    },
    5: {
        className: 'nav-items',
        icon: <DnsIcon />,
        name: 'Quản lý domain',
        path: '/domains',
    },
    6: {
        className: 'nav-items',
        icon: <FunctionsIcon />,
        name: 'Quản lý chức năng',
        path: '/functions',
    },
    7: {
        className: 'nav-items',
        icon: <SettingsIcon />,
        name: 'Quản lý nhóm nghiên cứu',
        path: '/groups',
    },
    8: {
        className: 'nav-items',
        icon: <LiveHelpIcon />,
        name: 'Quản lý FAQ',
        path: '/faqs',
    },
    9: {
        className: 'nav-items',
        icon: <VpnKeyIcon />,
        name: 'Quản lý liên hệ',
        path: '/contacts',
    },
    10: {
        className: 'nav-items',
        icon: <AppsIcon />,
        name: 'Quản lý dự án',
        path: '/projects',
    },
    12: {
        className: 'nav-items',
        icon: <PreviewIcon />,
        name: 'Quản lý giới thiệu',
        path: '/abouts',
    }
}




const AdminHeader = () => {

    const [userFunctions, setUserFunctions] = useState([])

    useEffect(() => {
        renderUserFunctions()
    }, [])

    const renderUserFunctions = () => {
        let userDataLocalStorage = localStorage.getItem("userData");
        let user = JSON.parse(userDataLocalStorage);

        if(user){
            
            let functions = user.userFunctionList.map(userFunction => {
                if(userFunction.isEnable){
                    return navItems[userFunction.function.id]
                }
                return null
            })

            setUserFunctions(functions)
        }
    }

    // const [table, setTable] = useState({
    //     columns: columnsField,
    //     rows: rowsField 
    // });
    // const [selectedTable, setSelectedTable] = useState('Thông tin lĩnh vực')


    // const setChildActions = (child) => {
    //     setTable(child.tableData);
    //     setSelectedTable(child.name)
    // }

    // const renderChildren = (children) => {
    //     if(children){
    //         return children.map(child => {
    //             return (
    //                 <Link 
    //                     to={`/admin${child.path}`}
    //                     key={child.name}
    //                     className="px-4 py-2 text-xs text-left rounded-md hover:bg-green-600"
    //                     // onClick={() => setChildActions(child)}
    //                 >
    //                    { child.name }
    //                 </Link>
    //             )
    //         })
    //     }
    //     return null;
    // }


    
    const renderNavItems = (items) => {
        console.log('renderNavItems userFunctions: ', items)
        if(items.length){
            return items.map((item, index) => {
                if(item){
                    return (
                        <Accordion elevation={0} style={{ backgroundColor: '#0065C1', color: 'white' }} key={index}>
                            <AccordionSummary
                                // expandIcon={item.children.length > 1 ? <ExpandMoreIcon /> : null}
                                // aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Link 
                                    to={`/admin${item.path}`}
                                    className="flex items-center gap-2"
                                    // onClick={() => alert(`${item.name} clicked`)}
                                >
                                    <section className="text-sm">{ item.icon }</section>
                                    <section className="text-sm">{ item.name }</section>
                                </Link>
                            </AccordionSummary>
                            {/* <AccordionDetails>
                                <section className="flex flex-col ml-2">
                                    {renderChildren(item.children)}
                                </section>
                            </AccordionDetails> */}
                        </Accordion>
                    )
                }
                return null
            })
        }
        return null
    }

    return (
        <div 
                // className="z-20 flex-col h-screen text-white transition duration-200 transform admin-background sm:relative sm:translate-x-0 sidebar md:w-1/4 bg-blue-primary sm:flex" 
                className="z-20 flex-col text-white transition duration-200 transform admin-background sm:relative sm:translate-x-0 sidebar md:w-1/4 bg-blue-primary sm:flex" 
                id="navContainer"
            >
                <Link 
                    to="/" 
                    className="relative flex flex-col items-center justify-center mt-4"
                >
                    <img 
                        alt="logo"
                        src={logo}
                        className="w-20"
                    />
                    <div className="flex justify-center mt-2">
                        <p className="text-xl font-semibold tracking-tighter uppercase">
                            ctu market place
                        </p>
                        <div 
                            className="absolute h-4 bg-blue-500 opacity-75 w-1/2 md:w-1/2 mx-auto -bottom-0.5 rounded-sm" 
                            style={{ zIndex: "-10" }}>

                        </div> 
                    </div>
                </Link>
                <div className="flex flex-col h-screen mx-2 -space-y-2 mt-14">
                    {/* { renderNavItems(navItems) } */}
                    { renderNavItems(userFunctions) }
                </div>
            </div>
        
    )
}

export default AdminHeader;