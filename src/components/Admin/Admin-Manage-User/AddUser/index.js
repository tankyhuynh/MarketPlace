import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import Tab from '../../../Tab/Tab';
import FormUser from './Form'
// import { columns as columnsNormalUser } from './table-definition-normalUser'
import { columns as columnsResearcherUser } from './table-definition-researcherUser'
import { columns as columnsAdminUser } from './table-definition-admin'
import { TYPE_ADMIN, TYPE_NNC } from '../user.type'

const tabs = [
    // {
    //     title: 'Người dùng bình thường',
    //     content: (
    //         <>
    //             <FormUser columns={columnsNormalUser} userType={TYPE_USER} />
    //         </>
    //     )
    // },
    {
        title: 'Nhà nghiên cứu',
        content: (
            <>
                <FormUser columns={columnsResearcherUser} userType={TYPE_NNC} />
            </>
        )
    },
    {
        title: 'Quản trị viên',
        content: (
            <>
                <FormUser columns={columnsAdminUser} userType={TYPE_ADMIN} />
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
            <Link to={'/admin/users'}>
                <ArrowBackIcon />
            </Link>
            <div className="mb-4 text-2xl font-bold text-center uppercase">
                Thêm người dùng
            </div>
            <Tab tabs={tabs} color="red" openTabChange={onOpenedTabChange} />
        </>
    )
}

export default AdminManageUser;