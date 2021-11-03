import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { fetchGroup } from '../../../../actions/researchGroup'

import Tab from '../../../Tab/Tab';
import FormUser from './Form'
import { columns as columnsNormalUser } from './table-definition'
import { connect } from 'react-redux';


const tabs = [
    {
        title: 'Người dùng bình thường',
        content: (
            <>
                <FormUser columns={columnsNormalUser} />
            </>
        )
    },
];

const AdminEditGroup = (props) => {
    
    const [openTab, setOpenTab] = useState(0);

    useEffect(() => {
        props.fetchGroup(props.match.params.id);
    }, [])

    const onOpenedTabChange = (opendTab) => {
        console.log(openTab);
        setOpenTab(opendTab);
    };

    return (
        <>
            <Link to={'/admin/groups'}>
                <ArrowBackIcon />
            </Link>
            <div className="mb-4 text-2xl font-bold text-center uppercase">
                Chỉnh sửa nhóm nghiên cứu
            </div>
            <FormUser columns={columnsNormalUser} group={props.group} />
            {/* <Tab tabs={tabs} color="red" openTabChange={onOpenedTabChange} /> */}
        </>
    )
}

  
const mapStateToProps = (state, ownProps) => {
    return { 
        group: state.researchGroups[ownProps.match.params.id],
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fetchGroup
    }
)(AdminEditGroup);
