
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProject } from '../../actions/project'
import { 
    fetchProjectDetail_Commercial,
    fetchProjectDetail_Researching
  
  } from '../../actions/projectDetail'

import { fetchFields } from '../../actions/field'
import { fetchLevelDevelopments } from '../../actions/levelDevelopment'
import { fetchTransmissionMethods } from '../../actions/transmissionMethod'

import Stepper from '../Stepper/Stepper';

const TYPE_COMMERCIAL = 'CP';
const TYPE_RESEARCHING = 'RP';

const ProjectEdit = (props) => {
    
    const [projectDetail, setProjectDetail] = useState(null)

    const steps = [
            'Thông tin chung', 
            'Thông tin về giải pháp, sản phẩm, công nghệ, thiết bị sẵn sàng chuyển giao', 
            'Xem kết quả'
    ]; 

    // isModalOpen = (isOpenModal) => {
    //     setOpenModal(isOpenModal);
    // }
    // isStartWithNewProject = (isStartWithNewProject) => {
    //     setStartWithNewProject(isStartWithNewProject);
    // }

    // renderActions = () => {
    //     return (
    //         <>
    //             <button 
    //                 type="button" 
    //                 className="inline-flex justify-center w-full px-4 py-4 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
    //                 onClick={() => props.isModalOpen(false)}
    //             >
    //                 Tiếp tục
    //             </button>
    //             <button 
    //                 type="button" 
    //                 className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    //                 // onClick={() => onCancel(true)}
    //             >
    //                 Hủy
    //             </button>
    //         </>
    //     );
    // }

    // renderModal = () => {
    //     if(openModal){
    //         return (
    //             <Modal 
    //                 title="Title"
    //                 content="content"
    //                 actions={renderActions()}
    //                 isModalOpen={isModalOpen}
    //                 isStartWithNewProject={isStartWithNewProject}
    //             />
    //         )
    //     }
    //     return null;
    // }

    useEffect(() => {

        if(props.match.params.type === TYPE_COMMERCIAL){
            props.fetchProjectDetail_Commercial(props.match.params.id)
            .then(response => {
                console.log('props.fetchProjectDetail_Commercial: ', response)
                setProjectDetail(response)
            });
        }
        if(props.match.params.type === TYPE_RESEARCHING){
            props.fetchProjectDetail_Researching(props.match.params.id)
            .then(response => {
                console.log('props.fetchProjectDetail_Researching: ', response)
                setProjectDetail(response)
            });
        }

        props.fetchLevelDevelopments();
        props.fetchTransmissionMethods();
        props.fetchFields();
    // eslint-disable-next-line
    }, [])  
    
        
    return (
        <>
            {   
                projectDetail
                    ? (
                        <Stepper 
                            steps={steps} 
                            levels={props.levels}
                            fields={props.fields}
                            transmissions={props.transmissions}
                            project={props.project}
                            type='edit' 
                            id={props.match.params.id}
                        />
                    )
                    : null
            }
        </>
    )
};

const mapStateToProps = (state, ownProps) => {
    return { 
        project: state.projectsDetail[ownProps.match.params.id],
        levels: Object.values(state.levels),
        fields: Object.values(state.fields),
        transmissions: Object.values(state.transmissions), 
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchProject, fetchProjectDetail_Commercial, fetchProjectDetail_Researching,
        fetchLevelDevelopments, 
        fetchTransmissionMethods, 
        fetchFields,
    }
  )(ProjectEdit);