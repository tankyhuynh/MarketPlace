import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import Tab from '../../Tab/Tab';

import PersonalInformaton from './personal-infomation'
import ChangePassword from './change-password'

// import { columns as columnsNormalUser } from './table-definition-normalUser'
// import { columns as columnsResearcherUser } from './table-definition-researcherUser'
// import { columns as columnsAdminUser } from './table-definition-admin'


const tabs = [
    {
        title: 'Thông tin cá nhân',
        content: (
            <>
                <PersonalInformaton />
            </>
        )
    },
    {
        title: 'Đổi mật khẩu',
        content: (
            <>
                <ChangePassword />
            </>
        )
    },
];

const AdminManageUser = () => {

    const [openTab, setOpenTab] = useState(0);

    const onOpenedTabChange = (opendTab) => {
        console.log(openTab);
        setOpenTab(opendTab);
    };

    return (
        <>
            {/* <Link to={'/researchers'}>
                <ArrowBackIcon />
            </Link> */}
            <Tab 
                tabs={tabs} 
                color="red" 
                openTabChange={onOpenedTabChange} 
            />
        </>
    )
}

export default AdminManageUser;