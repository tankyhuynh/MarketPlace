
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { fetchProject } from '../../../../actions/project'
import { 
    fetchProjectDetailAdmin_Commercial, 
    fetchProjectDetailAdmin_Researching

} from '../../../../actions/projectDetailAdmin'
import { fetchFields } from '../../../../actions/field'
import { fetchLevelDevelopments } from '../../../../actions/levelDevelopment'
import { fetchTransmissionMethods } from '../../../../actions/transmissionMethod'


import Stepper from './Stepper/Stepper';

const TYPE_COMMERCIAL = 'CP';
const TYPE_RESEARCHING = 'RP';

const AdminProjectEdit = (props) => {

    const [projectDetail, setProjectDetail] = useState(null)
 

    const steps = [
            'Thông tin chung', 
            'Thông tin về giải pháp, sản phẩm, công nghệ, thiết bị sẵn sàng chuyển giao', 
            'Duyệt',
            'Xem kết quả'
    ]; 


    useEffect(() => {
            // props.fetchProject(props.match.params.id);
            if(props.match.params.type === TYPE_COMMERCIAL){
                props.fetchProjectDetailAdmin_Commercial(props.match.params.id)
                .then(response => {
                    console.log('props.fetchProjectDetail_Commercial: ', response)
                    setProjectDetail(response)
                });
            }
            if(props.match.params.type === TYPE_RESEARCHING){
                props.fetchProjectDetailAdmin_Researching(props.match.params.id)
                .then(response => {
                    console.log('props.fetchProjectDetailAdmin_Researching: ', response)
                    setProjectDetail(response)
                });
            }
            props.fetchLevelDevelopments();
            props.fetchTransmissionMethods();
            props.fetchFields(); 
    // eslint-disable-next-line
    }, [])
    
        // console.log('props project create: ', this.props);
    return (
        <>
            <Link to={'/admin/projects'}>
                <ArrowBackIcon />
            </Link>
            {
                projectDetail
                ? (
                    <Stepper 
                        steps={steps} 
                        levels={props.levels}
                        fields={props.fields}
                        categories={props.categories}
                        transmissions={props.transmissions}
                        // project={props.project}
                        project={projectDetail ? projectDetail : null}
                        type='edit'
                        id={props.match.params.id}
                    />
                )
                : null
            }
        </>
    ); 
};

const mapStateToProps = (state, ownProps) => {
    return { 
        // project: state.projects[ownProps.match.params.id],
        projectDetail: state.projectsDetail[ownProps.match.params.id],
        levels: Object.values(state.levels),
        fields: Object.values(state.fields),
        transmissions: Object.values(state.transmissions), 
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchProject, 
        fetchProjectDetailAdmin_Commercial, fetchProjectDetailAdmin_Researching,
        fetchLevelDevelopments, 
        fetchTransmissionMethods, 
        fetchFields,
    }
  )(AdminProjectEdit);