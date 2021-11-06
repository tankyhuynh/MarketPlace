import React from 'react';
import { Link } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// import Tab from '../../../Tab/Tab';
import FormUser from './Form'
import { columns as columnsNormalUser } from './table-definition'


// const tabs = [
//     {
//         title: 'Người dùng bình thường',
//         content: (
//             <>
//                 <FormUser columns={columnsNormalUser} />
//             </>
//         )
//     },
// ];

const AdminManageUser = () => {
    
    // const [openTab, setOpenTab] = useState(0);

    // const onOpenedTabChange = (opendTab) => {
    //     console.log(openTab);
    //     setOpenTab(opendTab);
    // };

    return (
        <>
            <Link to={'/admin/groups'}>
                <ArrowBackIcon />
            </Link>
            <div className="mb-4 text-2xl font-bold text-center uppercase">
                Thêm nhóm nghiên cứu
            </div>
            <FormUser columns={columnsNormalUser} />
            {/* <Tab tabs={tabs} color="red" openTabChange={onOpenedTabChange} /> */}
        </>
    )
}

export default AdminManageUser;