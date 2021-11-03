/* eslint-disable no-restricted-globals */

import React, { useState } from 'react';

import Tab from '../../Tab/Tab';
import Contact from './Contact';
import CustomerContact from './Customer-Contact';



const AdminManageContact = () => {

    const [openTab, setOpenTab] = useState(0);

    const tabs = [
        {
            title: 'Liên hệ chung',
            content: (
               <Contact />
            )
        },
        {
            title: 'Liên hệ khách hàng',
            content: (
               <CustomerContact />
            )
        }
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

export default AdminManageContact;