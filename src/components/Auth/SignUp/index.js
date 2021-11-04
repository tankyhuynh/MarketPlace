/* eslint-disable no-restricted-globals */

import React, { useState } from 'react';

import Tab from '../../Tab/Tab';
import NormalUser from './Normal_User';
import ResearcherUser from './Researcher_User';


const AdminDashboard = () => {

    const [openTab, setOpenTab] = useState(0);

    const tabs = [
        {
            title: 'Đăng ký người dùng',
            content: (
               <NormalUser />
            )
        },
        {
            title: 'Đăng ký nhà nghiên cứu',
            content: (
               <ResearcherUser />
            )
        },
    ]

    const onOpenedTabChange = (opendTab) => {
        console.log(openTab);
        setOpenTab(opendTab);
    };

    return (
            
            <div 
                className="w-full sm:w-3/4 lg:w-5/6" 
                id="mainContainer"
            >
                <Tab 
                    tabs={tabs} 
                    color="red" 
                    openTabChange={onOpenedTabChange}
                    isAdminPage={true} 
                />
            </div>
    )
}

export default AdminDashboard;