/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';

import { 
    fetchProjects_DaDuyet, 

} from '../../../actions/project'

import Projects from './Projects';
import Tab from '../../Tab/Tab';
import { connect } from 'react-redux';

const TYPE_COMMERCIAL = 'CP'
const TYPE_RESEARCHING = 'RP'

const ProjectList = (props) => {

    const [openTab, setOpenTab] = useState(0);

    useEffect(() => {
        props.fetchProjects_DaDuyet();
    // eslint-disable-next-line
    }, [])

    const tabs = [
        {
            title: 'Dự án thương mại',
            content: (
               <Projects projects={props.projects ? props.projects.filter(project => project.type === TYPE_COMMERCIAL) : []}/>
            )
        },
        {
            title: 'Dự án nghiên cứu',
            content: (
                <Projects projects={props.projects ? props.projects.filter(project => project.type === TYPE_RESEARCHING) : []}/>
            )
        },
        // {
        //     title: 'Dự án sẵn sàng chuyển giao',
        //     content: (
        //        <Projects projects={props.projects ? props.projects.filter(project => project.type === TYPE_COMMERCIAL) : []}/>
        //     )
        // },
    ]

    const onOpenedTabChange = (opendTab) => {
        console.log(openTab);
        setOpenTab(opendTab);
    };

    return (
            
            <div 
                className="w-full sm:w-3/4 lg:w-5/6" 
                id="mainContainer"
            >
                {/* <Tab 
                    tabs={tabs} 
                    color="red" 
                    openTabChange={onOpenedTabChange}
                    isAdminPage={true} 
                /> */}
                <Projects projects={props.projects ? props.projects.filter(project => project.type === TYPE_COMMERCIAL) : []}/>
            </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        projects:  Object.values(state.projects),
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps, 
    { 
        fetchProjects_DaDuyet, 
    }
)(ProjectList);