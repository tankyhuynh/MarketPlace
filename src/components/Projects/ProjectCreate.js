
import React from 'react';
import { connect } from 'react-redux';

import { fetchLevelDevelopments } from '../../actions/levelDevelopment'
import { fetchTransmissionMethods } from '../../actions/transmissionMethod'
import { fetchFields } from '../../actions/field'
// import { fetchStatuses } from '../../actions/status'


import Stepper from '../Stepper/Stepper';


class ProjectCreate extends React.Component {
 

    steps = [
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

    componentDidMount(){
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
                    transmissions={this.props.transmissions}
                    fields={this.props.fields}
                    project={this.props.project ? this.props.project : null }
                    type='create'
                />
            </>
        ); 
    }
};

const mapStateToProps = (state) => {
    return { 
        levels: Object.values(state.levels),
        transmissions: Object.values(state.transmissions),
        fields: Object.values(state.fields),
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fetchLevelDevelopments, 
        fetchTransmissionMethods, 
        fetchFields,
    }
)(ProjectCreate);