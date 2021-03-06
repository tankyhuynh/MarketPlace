/* eslint-disable react-hooks/exhaustive-deps */
import dateFormat from 'dateformat';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from '../../Table/Table';
import Pagination from '../../Pagination/Pagination';
import Tab from '../../Tab/Tab'

import CreateIcon from '@material-ui/icons/Create';

import { 
    fetchProjectByUserIdAndStatusId 
} 
from '../../../actions/researcherProject'

const STATUS_DD_PROJECT_ID = 1;
const STATUS_CD_PROJECT_ID = 2;
const STATUS_TC_PROJECT_ID = 3;
const STATUS_TEMP_PROJECT_ID = 4;

const ResearcherProject  = (props) => {

    const [openTab, setOpenTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(10);

    // let DDProjects = props.projects.filter(project => project.status.id === STATUS_DD_PROJECT_ID);
    // let CDProjects = props.projects.filter(project => project.status.id === STATUS_CD_PROJECT_ID);
    // let TCProjects = props.projects.filter(project => project.status.id === STATUS_TC_PROJECT_ID);
    // let tempProjects = props.projects.filter(project => project.status.id === STATUS_TEMP_PROJECT_ID);
    const [DDProjects, setDDProjects] = useState([]);
    const [CDProjects, setCDProjects] = useState([]);
    const [TCProjects, setTCProjects] = useState([]);
    const [tempProjects, setTempProjects] = useState([]);

    let userDataLocalStorage = localStorage.getItem("userData");
    let user = JSON.parse(userDataLocalStorage);


    useEffect(() => {
        props.fetchProjectByUserIdAndStatusId(user.id, STATUS_DD_PROJECT_ID)
            .then(response => {
                setDDProjects(response);
            });
        props.fetchProjectByUserIdAndStatusId(user.id, STATUS_CD_PROJECT_ID)
            .then(response => {
                setCDProjects(response);
            });
        props.fetchProjectByUserIdAndStatusId(user.id, STATUS_TC_PROJECT_ID)
            .then(response => {
                setTCProjects(response);
            });
        props.fetchProjectByUserIdAndStatusId(user.id, STATUS_TEMP_PROJECT_ID)
            .then(response => {
                setTempProjects(response);
            });

    }, []);

    const renderTen = (ten) => {
        if(ten){
            if (ten.length > 60) {
                var shortname = ten.substring(0, 60) + " ...";
                return shortname;
            }
        }
        return ten;
    }

    // const renderProjectFields = (projectFieldList) => {
    //     return (
    //         projectFieldList.map(field => {
    //             return <span>{field.field.name}</span>
    //         })
    //     )
    // }

    const renderProjectFields = (projectFieldList) => {
        if(projectFieldList){
            return projectFieldList.map(field => {
                if(field.field.name.length > 30){
                    var shortUuDiem = field.field.name.substring(0, 30) + "...";
                    return (
                        <span className="content-center px-2 mx-auto text-xs font-semibold tracking-wide text-white uppercase bg-gray-400 rounded-full">
                            { shortUuDiem }
                        </span>
                    )
                }
                return (
                    <span className="content-center px-2 mx-auto text-xs font-semibold tracking-wide text-white uppercase bg-gray-400 rounded-full">
                        {  field.field.name }
                    </span>
                ) 
            })
        }
        
    };

    const renderProject = (projects) => {
        console.log('projects: ', projects);
        return projects
            // .filter(project => user.id === project.user.id)
            .map((project, index) => {
                console.log('renderProjects', projects, 'id:', project.id);
                // user.id === project.user.id
                return (
                    {
                        stt: {
                            name: 'STT',
                            className:'px-6 py-4 whitespace-nowrap',
                            projectId: project.id,
                            content: (
                                    <div className="flex items-center">
                                        {/* <div className="flex-shrink-0 w-10 h-10">
                                            <img 
                                                className="w-10 h-10 rounded-full" 
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                                alt="" 
                                            />
                                        </div> */}
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                { project.id }
                                            </div>
                                        </div>
                                    </div>
                            )
                        },
                        name: {
                            name: 'T??n d??? ??n',
                            className: 'px-6 py-4 whitespace-nowrap',
                            content: (
                                    <>
                                        <div className="text-sm text-gray-500">
                                            { renderTen(project.name) }
                                        </div>
                                    </>
                            )
                        },
                        field: {
                            name: 'L??nh v???c ',
                            className: 'px-6 py-4 whitespace-nowrap',
                            content: (
                                    <div className="flex flex-col gap-1">
                                        { renderProjectFields(project.projectFieldList) }
                                    </div>
                            )
                        },
                        sentDate: {
                            name: 'Ng??y g???i',
                            className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
                            content: (
                                    <>
                                        { dateFormat(project.date, "hh:mm, dddd, mmmm dS, yyyy") }
                                    </>
                            )
                        },
                        confirmDate: {
                            name: 'Ng??y duy???t',
                            className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
                            content: (
                                    <>
                                        { dateFormat(project.date, "hh:mm, dddd, mmmm dS, yyyy") }
                                    </>
                            )
                        },
                        actions: {
                            name: 'H??nh ?????ng',
                            className: 'px-6 py-4 text-sm font-medium text-right whitespace-nowrap',
                            content: 
                                    // user.id === project.user.id
                                    //     ? (
                                            <div className="flex justify-center mx-auto">
                                                <Link 
                                                    to={`/projects/edit/${project.type}/${project.id}`} 
                                                    className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:text-indigo-900"
                                                    alt="test"
                                                >
                                                    <CreateIcon />
                                                </Link>
                                            </div>
                                        // )
                                        // : null
                        }
                    }
                );
    })
    }
    // const renderTempProject = (tempProjects) => {
    //     return tempProjects
    //     .map((project, index) => {
    //         return (
    //             {
    //                 stt: {
    //                     name: 'STT',
    //                     className:'px-6 py-4 whitespace-nowrap',
    //                     content: (
    //                             <div className="flex items-center">
    //                                 {/* <div className="flex-shrink-0 w-10 h-10">
    //                                     <img 
    //                                         className="w-10 h-10 rounded-full" 
    //                                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
    //                                         alt="" 
    //                                     />
    //                                 </div> */}
    //                                 <div className="ml-4">
    //                                     <div className="text-sm font-medium text-gray-900">
    //                                         { project.id }
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                     )
    //                 },
    //                 name: {
    //                     name: 'T??n d??? ??n',
    //                     className: 'px-6 py-4 whitespace-nowrap',
    //                     content: (
    //                             <>
    //                                 <div className="text-sm text-gray-500">
    //                                     { project.name }
    //                                 </div>
    //                             </>
    //                     )
    //                 },
    //                 field: {
    //                     name: 'L??nh v???c ',
    //                     className: 'px-6 py-4 whitespace-nowrap',
    //                     content: (
    //                             <>
    //                                 <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
    //                                     { renderProjectFields(project.projectFieldList) }
    //                                 </span>
    //                             </>
    //                     )
    //                 },
    //                 sentDate: {
    //                     name: 'Ng??y g???i',
    //                     className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
    //                     content: (
    //                             <>
    //                                 { dateFormat(project.date, "hh:mm, dddd, mmmm dS, yyyy") }
    //                             </>
    //                     )
    //                 },
    //                 confirmDate: {
    //                     name: 'Ng??y duy???t',
    //                     className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
    //                     content: (
    //                             <>
    //                                 { dateFormat(project.date, "hh:mm, dddd, mmmm dS, yyyy") }
    //                             </>
    //                     )
    //                 },
    //                 actions: {
    //                     name: 'H??nh ?????ng',
    //                     className: 'px-6 py-4 text-sm font-medium text-right whitespace-nowrap',
    //                     content: (
    //                             <div className="flex justify-center mx-auto">
    //                                 <Link 
    //                                     to={`/projects/edit/${project.id}`} 
    //                                     className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:text-indigo-900"
    //                                     alt="test"
    //                                 >
    //                                     <CreateIcon />
    //                                 </Link>
    //                             </div>
    //                     )
    //                 }
    //             }
    //         );
    // })
    // }

    

    const indexOfLastPost = currentPage * projectsPerPage;
    const indexOfFirstPost = indexOfLastPost - projectsPerPage;
    const currentProjects = props.projects.slice(indexOfFirstPost, indexOfLastPost);

    

    console.log('DDProjects', DDProjects.length);
    console.log('CDProjects', CDProjects.length);
    console.log('CDProjects', TCProjects.length);
    console.log('tempProjects', tempProjects.length);

    const tableHead = [
        {
            name: 'STT',
            fieldId: 'stt',
            className:'px-6 py-4 whitespace-nowrap',
        },
        {
            name: 'T??n d??? ??n',
            fieldId: 'name',
            className: 'px-6 py-4 whitespace-nowrap',
        },
        {
            name: 'L??nh v???c ',
            fieldId: 'field',
            className: 'px-6 py-4 whitespace-nowrap',
        },
        {
            name: 'Ng??y g???i',
            fieldId: 'sentDate',
            className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
        },
        {
            name: 'Ng??y duy???t',
            fieldId: 'confirmDate',
            className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
            content: (
                    <>
                        26-08-20201 21:12
                    </>
            )
        },
        {
            name: 'H??nh ?????ng',
            fieldId: 'actions',
            className: 'px-6 py-4 text-sm font-medium text-right whitespace-nowrap',
        }
    ]

    // const projects = {
        
    //     body: renderProject(currentProjects)
    // }
    // const tempProjectsData = {
    //     head: [
    //         {
    //             name: 'STT',
    //             fieldId: 'stt',
    //             className:'px-6 py-4 whitespace-nowrap',
    //         },
    //         {
    //             name: 'T??n d??? ??n',
    //             fieldId: 'name',
    //             className: 'px-6 py-4 whitespace-nowrap',
    //         },
    //         {
    //             name: 'L??nh v???c ',
    //             fieldId: 'field',
    //             className: 'px-6 py-4 whitespace-nowrap',
    //         },
    //         {
    //             name: 'Ng??y g???i',
    //             fieldId: 'sentDate',
    //             className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
    //         },
    //         {
    //             name: 'Ng??y duy???t',
    //             fieldId: 'confirmDate',
    //             className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
    //             content: (
    //                     <>
    //                         26-08-20201 21:12
    //                     </>
    //             )
    //         },
    //         {
    //             name: 'H??nh ?????ng',
    //             fieldId: 'actions',
    //             className: 'px-6 py-4 text-sm font-medium text-right whitespace-nowrap',
    //         }
    //     ],
    //     body: renderTempProject(tempProjects)
    // }

    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);

    const tabs = [
        {
            title: 'T???t c???',
            content: (
                <>
                    <Table head={tableHead} body={renderProject(currentProjects)}/>
                    <Pagination
                        projectsPerPage={projectsPerPage}
                        totalProjects={currentProjects.length}
                        paginateBack={paginateBack}
                        paginateFront={paginateFront}
                        currentPage={currentPage}
                    />
                </>
            )
        },
        {
            title: '???? duy???t',
            content: (
                <>
                    <Table head={tableHead} body={renderProject(DDProjects)}/>
                    <Pagination
                        projectsPerPage={projectsPerPage}
                        totalPosts={DDProjects ? DDProjects.length : 0}
                        paginateBack={paginateBack}
                        paginateFront={paginateFront}
                        currentPage={currentPage}
                    />
                </>
            )
        },
        {
            title: 'Ch??? duy???t',
            content: (
                <>
                    <Table head={tableHead} body={renderProject(CDProjects)}/>
                    <Pagination
                        projectsPerPage={projectsPerPage}
                        totalPosts={CDProjects.length}
                        paginateBack={paginateBack}
                        paginateFront={paginateFront}
                        currentPage={currentPage}
                    />
                </>
            )
        },
        {
            title: 'T??? ch???i',
            content: (
                <>
                    <Table head={tableHead} body={renderProject(TCProjects)}/>
                    <Pagination
                        projectsPerPage={projectsPerPage}
                        totalPosts={TCProjects.length}
                        paginateBack={paginateBack}
                        paginateFront={paginateFront}
                        currentPage={currentPage}
                    />
                </>
            )
        },
        {
            title: 'Nh??p',
            content: (
                <>
                    <Table head={tableHead} body={renderProject(tempProjects)}/>
                    <Pagination
                        projectsPerPage={projectsPerPage}
                        totalPosts={tempProjects.length}
                        paginateBack={paginateBack}
                        paginateFront={paginateFront}
                        currentPage={currentPage}
                    />
                </>
            )
        }
    ];


    const onOpenedTabChange = (opendTab) => {
        console.log(openTab);
        setOpenTab(opendTab);
    };

    return (
        <>
            <Tab 
                tabs={tabs} 
                color="red" 
                openTabChange={onOpenedTabChange} 
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return { 
        projects: Object.values(state.researcherProjects)
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fetchProjectByUserIdAndStatusId  
    }
)(ResearcherProject);
