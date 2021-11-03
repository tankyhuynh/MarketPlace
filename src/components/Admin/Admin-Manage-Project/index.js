import React, { useState } from 'react';

import Tab from '../../Tab/Tab';
import AdminManageProjectAll from './Admin-Manage-Project-All'
import AdminManageProjectDD from './Admin-Manage-Project-DD'
import AdminManageProjectCD from './Admin-Manage-Project-CD'
import AdminManageProjectTC from './Admin-Manage-Project-TC'
import AdminManageProjectTMP from './Admin-Manage-Project-TMP'


const tabs = [
    {
        title: 'Tất cả',
        content: (
            <>
                <AdminManageProjectAll />
            </>
        )
    },
    {
        title: 'Đã duyệt',
        content: (
            <>
                <AdminManageProjectDD />
            </>
        )
    },
    {
        title: 'Chờ duyệt',
        content: (
            <>
                <AdminManageProjectCD />
            </>
        )
    },
    {
        title: 'Từ chối',
        content: (
            <>
                <AdminManageProjectTC />
            </>
        )
    },
    {
        title: 'Nháp',
        content: (
            <>
                <AdminManageProjectTMP />
            </>
        )
    }
];

const AdminManageProject = () => {

    const [openTab, setOpenTab] = useState(0);

    const onOpenedTabChange = (opendTab) => {
        console.log(openTab);
        setOpenTab(opendTab);
    };

    return (
        <Tab tabs={tabs} color="red" openTabChange={onOpenedTabChange} />
    )
}

export default AdminManageProject;