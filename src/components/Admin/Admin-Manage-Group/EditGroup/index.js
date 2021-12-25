import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'


import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { fetchGroup } from '../../../../actions/researchGroup_Admin'

import FormGroup from './Form'
import { columns as columnsNormalUser } from './table-definition'
import { connect } from 'react-redux';

const AdminEditGroup = (props) => {
    
    useEffect(() => {
        props.fetchGroup(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <Link to={'/admin/groups'}>
                <ArrowBackIcon />
            </Link>
            <div className="mb-4 text-2xl font-bold text-center uppercase">
                Chỉnh sửa nhóm nghiên cứu
            </div>
            <FormGroup columns={columnsNormalUser} group={props.group} />
            {/* <Tab tabs={tabs} color="red" openTabChange={onOpenedTabChange} /> */}
        </>
    )
}

  
const mapStateToProps = (state, ownProps) => {
    return { 
        group: state.adminResearchGroups[ownProps.match.params.id],
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fetchGroup
    }
)(AdminEditGroup);
