/* eslint-disable no-restricted-globals */
import './Admin-Dashboard.css'

import React, { useState } from 'react';

import Table from '../Table/Table-Admin';
import { columns as columnsField, rows as rowsField} from './table-data-field';
import { columns as columnsLevel, rows as rowsLevel} from './table-data-level';
import { columns as columnsStatus, rows as rowsStatus} from './table-data-status';
import { columns as columnsTranmission, rows as rowsTranmission} from './table-data-tranmission';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import logo from '../../assets/logo.png';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';

const navItems = [
    {
        className: 'nav-items--active',
        icon: <HomeIcon />,
        name: 'Quản lý thông tin',
        children: [
            {
                name: 'Thông tin lĩnh vực',
                url: '/',
                tableData: {
                   columns: columnsField,
                   rows: rowsField 
                } 
            },
            {
                name: 'Thông tin mức độ phát triển',
                url: '/',
                tableData: {
                    columns: columnsLevel,
                    rows: rowsLevel 
                } 
            },
            {
                name: 'Thông tin trạng thái',
                url: '/',
                tableData: {
                    columns: columnsStatus,
                    rows: rowsStatus 
                } 
            },
            {
                name: 'Thông tin phương thức chuyển giao',
                url: '/',
                tableData: {
                    columns: columnsTranmission,
                    rows: rowsTranmission 
                } 
            }
        ],
    },
    {
        className: 'nav-items',
        icon: <AppsIcon />,
        name: 'Quản lý dự án',
        children: [
            {
                name: '',
                url: '' 
            }
        ],
    },
    {
        className: 'nav-items',
        icon: <InfoIcon />,
        name: 'Quản lý người dùng',
        children: [
            {
                name: '',
                url: '' 
            }
        ],
    },
    {
        className: 'nav-items',
        icon: <SettingsIcon />,
        name: 'Quản lý nhóm nghiên cứu',
        children: [
            {
                name: '',
                url: '' 
            }
        ],
    },
    {
        className: 'nav-items',
        icon: <LiveHelpIcon />,
        name: 'Quản lý FAQ',
        children: [
            {
                name: '',
                url: '' 
            }
        ],
    },
    {
        className: 'nav-items',
        icon: <VpnKeyIcon />,
        name: 'Quản lý liên hệ',
        children: [
            {
                name: '',
                url: '' 
            }
        ],
    }
]

const AdminDashboard = () => {
    const [table, setTable] = useState({
        columns: columnsField,
        rows: rowsField 
    });

    const [selectedTable, setSelectedTable] = useState('Thông tin lĩnh vực')

    const setChildActions = (child) => {
        setTable(child.tableData);
        setSelectedTable(child.name)
    }

    const renderChildren = (children) => {
        if(children){
            return children.map(child => {
                return (
                    <button 
                        key={child.name}
                        className="px-4 py-2 text-xs text-left rounded-md hover:bg-green-600"
                        onClick={() => setChildActions(child)}
                    >
                       { child.name }
                    </button>
                )
            })
        }
        return null;
    }


    const renderNavItems = (items) => {
        return items.map((item, index) => {
            return (
                <Accordion elevation={0} style={{ backgroundColor: '#0065C1', color: 'white' }}>
                    <AccordionSummary
                        expandIcon={item.children.length > 1 ? <ExpandMoreIcon /> : null}
                        // aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="flex items-center gap-2">
                            <section className="text-sm">{ item.icon }</section>
                            <section className="text-sm">{ item.name }</section>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <section className="flex flex-col ml-2">
                            {renderChildren(item.children)}
                        </section>
                    </AccordionDetails>
                </Accordion>
            )
        })
    }
   
    const renderBody = () => {
        return (
            <>
                <h1 className="row-span-1 my-8 text-xl font-semibold">{ selectedTable }</h1>
                <div className="row-span-4 border-2 border-dashed rounded-md">
                    <Table columns={table.columns} rows={table.rows} />
                </div>
            </>
        )
    }

    return (
        <div className="flex" id="layout">
            <div 
                className="z-20 flex-col text-white transition duration-200 transform admin-background sm:relative sm:translate-x-0 sidebar md:w-1/4 bg-blue-primary sm:flex" 
                id="navContainer"
            >
                <div className="relative flex flex-col items-center justify-center mt-4">
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
                </div>
                <div className="flex flex-col mx-2 space-y-4 mt-14">
                    { renderNavItems(navItems) }
                </div>
            </div>
        
            <div 
                className="w-full mx-6 sm:w-3/4 lg:w-5/6" 
                id="mainContainer"
            >
                <div className="flex flex-row items-center justify-between px-4 py-4 shadow">
                    <button 
                        id="btnContainer" 
                        className="focus:outline-none sm:hidden"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" height="16" 
                            fill="currentColor" 
                            className="w-6 h-6 text-gray-500 bi bi-justify" 
                            viewBox="0 0 16 16"
                        >
                            <path 
                                fill-rule="evenodd" 
                                d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" 
                            />
                        </svg>
                    </button>
                    <div className="flex flex-row items-center">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            fill="currentColor" 
                            className="mx-2 text-black bi bi-search" 
                            viewBox="0 0 16 16"
                        >
                            <path 
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" 
                            />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search Components" 
                            className="focus:outline-none" 
                        />
                    </div>
                    <div>
                        <img 
                            alt="img"
                            src="https://i.pravatar.cc/150?img=3" 
                            className="w-10 h-10 rounded-full" 
                        />
                    </div>
                </div>
                <div className="grid grid-rows-6 gap-2 border-2">
                    { renderBody() }
                    <div className="row-span-1 border-2 rounded-md"></div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;