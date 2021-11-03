
import React from 'react';
import { connect } from 'react-redux';

import { fetchProject } from '../../../../actions/project'
import { fetchFields } from '../../../../actions/field'
import { fetchLevelDevelopments } from '../../../../actions/levelDevelopment'
import { fetchTransmissionMethods } from '../../../../actions/transmissionMethod'


import Stepper from './Stepper/Stepper';


class AdminProjectEdit extends React.Component {
 

    steps = [
            'Thông tin chung', 
            'Thông tin về giải pháp, sản phẩm, công nghệ, thiết bị sẵn sàng chuyển giao', 
            'Duyệt',
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

    componentDidMount(){
        // this.props.fetchProjectDetail(this.props.match.params.id);
        this.props.fetchProject(this.props.match.params.id);
        this.props.fetchLevelDevelopments();
        this.props.fetchTransmissionMethods();
        this.props.fetchFields();
    }
    
    render() {
        console.log('props project create: ', this.props);
        return (
            <>
                <Stepper 
                    steps={this.steps} 
                    levels={this.props.levels}
                    fields={this.props.fields}
                    categories={this.props.categories}
                    transmissions={this.props.transmissions}
                    project={this.props.project}
                    type='edit'
                    id={this.props.match.params.id}
                />
            </>
        ); 
    }
};

const mapStateToProps = (state, ownProps) => {
    return { 
        project: state.projects[ownProps.match.params.id],
        levels: Object.values(state.levels),
        fields: Object.values(state.fields),
        transmissions: Object.values(state.transmissions), 
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        fetchProject, 
        fetchLevelDevelopments, 
        fetchTransmissionMethods, 
        fetchFields,
    }
  )(AdminProjectEdit);