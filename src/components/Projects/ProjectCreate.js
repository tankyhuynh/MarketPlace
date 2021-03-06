// import environment from '../../environments/environment';

import React from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom'
// import axios from 'axios';

import { fetchLevelDevelopments } from '../../actions/levelDevelopment'
import { fetchTransmissionMethods } from '../../actions/transmissionMethod'
import { fetchFields } from '../../actions/field'
import { block_navigation } from '../../actions/blockNavigation'
// import { fetchStatuses } from '../../actions/status'


import Stepper from '../Stepper/Stepper';


class ProjectCreate extends React.Component {
 

    steps = [
            'Thông tin chung', 
            'Thông tin về giải pháp, sản phẩm, công nghệ, thiết bị sẵn sàng chuyển giao', 
            'Xem kết quả'
    ]; 
    // shouldBlockNavigation = this.props.location.state ? this.props.location.state.shouldBlockNavigation : true;
    shouldBlockNavigation = this.props.isBlockNavigation;

    componentDidMount(){
        this.props.fetchLevelDevelopments();
        this.props.fetchTransmissionMethods();
        this.props.fetchFields();
        this.props.block_navigation();

        // const unloadCallback = (event) => {
        //     event.preventDefault();
        //     event.returnValue = "";
        //     this.doSomethingBeforeUnload()
            
        //     return "";
        // };  

        // window.addEventListener("beforeunload", unloadCallback);
        // return () => window.removeEventListener("beforeunload", unloadCallback);
    }

    componentDidUpdate = () => {
        if (this.shouldBlockNavigation) {
            console.log('this.shouldBlockNavigation')
            window.onbeforeunload = () => true
        } else {
            console.log('!== this.shouldBlockNavigation')
            this.onSaveTemp(this.props.location.projectTemp)
            window.onbeforeunload = undefined
        }
    }

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

    doSomethingBeforeUnload = () => {
        const projectTemp = this.props.location.state ? this.props.location.state.projectTemp : null
        console.log('doSomethingBeforeUnload ProjectCreate: ', projectTemp)
        //Chưa chạy được chỗ này
        
        // onSubmit();
        this.onSaveTemp(projectTemp)
    }
    

    onSaveTemp = (project) => {
        console.log('Save temp project ProjectCreate: ', project);
        
        

        // axios.post(environment.url.java + URL, project)
        // .then(response => {
        //     if (response) {
        //         // dispatch({ type: LOADED})
        //         console.log('client send:', project);
        //         console.log('response:', response);
        //             setTimeout(() => {
        //                 this.props.history.push('/projects')
        //             }, 500);
        //     }
        // })
    }

    
    render() {
        console.log('props project create: ', this.props, ' this.props.location', this.props.location.state);
        const projectTemp = this.props.location.state ? this.props.location.state.projectTemp : null
        
        if (this.shouldBlockNavigation) {
            console.log('this.shouldBlockNavigation')
            this.onSaveTemp(projectTemp)
            window.onbeforeunload = () => true
        } else {
            console.log('!== this.shouldBlockNavigation')
            window.onbeforeunload = undefined
        }

        return (
            <>
                <Prompt
                    when={this.shouldBlockNavigation}
                    message='You have unsaved changes, are you sure you want to leave?'
                />

                <Stepper 
                    steps={this.steps} 
                    levels={this.props.levels}
                    transmissions={this.props.transmissions}
                    fields={this.props.fields}
                    project={this.props.project ? this.props.project : null }
                    type='create'
                    onSaveTemp={this.onSaveTemp}
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
        isBlockNavigation: state.blockNavigation.isBlock,
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fetchLevelDevelopments, 
        fetchTransmissionMethods, 
        fetchFields,
        block_navigation
    }
)(ProjectCreate);