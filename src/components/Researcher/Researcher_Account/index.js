import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Tab from '../../Tab/Tab';

import PersonalInformaton from './personal-infomation'
// import ChangePassword from './change-password'

import { fetchUserProfileById } from '../../../actions/user'

// import { columns as columnsNormalUser } from './table-definition-normalUser'
// import { columns as columnsResearcherUser } from './table-definition-researcherUser'
// import { columns as columnsAdminUser } from './table-definition-admin'


// const tabs = [
//     {
//         title: 'Thông tin cá nhân',
//         content: (
//             <>
//                 <PersonalInformaton />
//             </>
//         )
//     },
//     {
//         title: 'Đổi mật khẩu',
//         content: (
//             <>
//                 <ChangePassword />
//             </>
//         )
//     },
// ];

const AdminManageUser = (props) => {

    // const [openTab, setOpenTab] = useState(0);

    useEffect(() => {
        props.fetchUserProfileById(props.userId);
    // eslint-disable-next-line
    }, [])

    // const onOpenedTabChange = (opendTab) => {
    //     console.log(openTab);
    //     setOpenTab(opendTab);
    // };

    return (
        <>
            {/* <Link to={'/researchers'}>
                <ArrowBackIcon />
            </Link> */}
            {/* <Tab 
                tabs={tabs} 
                color="red" 
                openTabChange={onOpenedTabChange} 
            /> */}
            <PersonalInformaton user={props.user ? props.user : {}} />
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        user: state.users[state.auth.userId],
        userId: state.auth.userId,
    };
  };
  
export default connect(
    mapStateToProps,
    { 
        fetchUserProfileById
    }
)(AdminManageUser);