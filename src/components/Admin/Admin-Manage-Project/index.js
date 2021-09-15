import React, { useState } from 'react';

import Tab from '../../Tab/Tab';
import AdminManageProjectAll from './Admin-Manage-Project-All'


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
        content: 'Dự án đã duyệt'
    },
    {
        title: 'Chờ duyệt',
        content: 'Dự án chờ duyệt'
    },
    {
        title: 'Từ chối',
        content: 'Dự án từ chối'
    },
    {
        title: 'Nháp',
        content: (
            <>
               {'Dự án nháp'}
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