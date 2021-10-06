/* eslint-disable no-restricted-globals */
import './index.css'

import React, { useState } from 'react';

import Tab from '../../Tab/Tab';
import TableField from './Admin-Field';
import TableCategory from './Admin-Category';
import TableLevel from './Admin-Level';
import TableStatus from './Admin-Status';
import TableTranmission from './Admin-Tranmission';


const AdminDashboard = () => {

    const [openTab, setOpenTab] = useState(0);

    const tabs = [
        {
            title: 'Thông tin danh mục lĩnh vực',
            content: (
               <TableCategory />
            )
        },
        {
            title: 'Thông tin lĩnh vực',
            content: (
               <TableField />
            )
        },
        {
            title: 'Thông tin mức độ phát triển',
            content: (
               <TableLevel />
            )
        },
        {
            title: 'Thông tin trạng thái',
            content: (
               <TableStatus />
            )
        },
        {
            title: 'Thông tin phương thức chuyển giao',
            content: (
               <TableTranmission />
            )
        }
    ]

    const onOpenedTabChange = (opendTab) => {
        console.log(openTab);
        setOpenTab(opendTab);
    };

    return (
            
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
                <Tab tabs={tabs} color="red" openTabChange={onOpenedTabChange} />
            </div>
    )
}

export default AdminDashboard;