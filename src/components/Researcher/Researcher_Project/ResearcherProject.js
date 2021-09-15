/* eslint-disable react-hooks/exhaustive-deps */
import dateFormat from 'dateformat';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from '../../Table/Table';
import Pagination from '../../Pagination/Pagination';
import Tab from '../../Tab/Tab'

import CreateIcon from '@material-ui/icons/Create';

import { fetchProjects } from '../../../actions/project'

const ResearcherProject  = (props) => {

    const [openTab, setOpenTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(10);


    useEffect(() => {
        props.fetchProjects()
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


    const renderProject = (projects) => {
        console.log('projects: ', projects);
        return projects
        .map((project, index) => {
            console.log('renderProjects', projects, 'id:', project.id);
            return (
                {
                    stt: {
                        name: 'STT',
                        className:'px-6 py-4 whitespace-nowrap',
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
                        name: 'Tên dự án',
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
                        name: 'Lĩnh vực ',
                        className: 'px-6 py-4 whitespace-nowrap',
                        content: (
                                <>
                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                        { project.field.name }
                                    </span>
                                </>
                        )
                    },
                    sentDate: {
                        name: 'Ngày gửi',
                        className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
                        content: (
                                <>
                                    { dateFormat(project.date, "hh:mm, dddd, mmmm dS, yyyy") }
                                </>
                        )
                    },
                    confirmDate: {
                        name: 'Ngày duyệt',
                        className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
                        content: (
                                <>
                                    { dateFormat(project.date, "hh:mm, dddd, mmmm dS, yyyy") }
                                </>
                        )
                    },
                    actions: {
                        name: 'Hành động',
                        className: 'px-6 py-4 text-sm font-medium text-right whitespace-nowrap',
                        content: (
                                <div className="flex justify-center mx-auto">
                                    <Link 
                                        to={`/projects/edit/${project.id}`} 
                                        className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:text-indigo-900"
                                        alt="test"
                                    >
                                        <CreateIcon />
                                    </Link>
                                </div>
                        )
                    }
                }
            );
    })
    }
    const renderTempProject = (tempProjects) => {
        return tempProjects
        .map((project, index) => {
            return (
                {
                    stt: {
                        name: 'STT',
                        className:'px-6 py-4 whitespace-nowrap',
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
                        name: 'Tên dự án',
                        className: 'px-6 py-4 whitespace-nowrap',
                        content: (
                                <>
                                    <div className="text-sm text-gray-500">
                                        { project.name }
                                    </div>
                                </>
                        )
                    },
                    field: {
                        name: 'Lĩnh vực ',
                        className: 'px-6 py-4 whitespace-nowrap',
                        content: (
                                <>
                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                        { project.field.name }
                                    </span>
                                </>
                        )
                    },
                    sentDate: {
                        name: 'Ngày gửi',
                        className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
                        content: (
                                <>
                                    { dateFormat(project.date, "hh:mm, dddd, mmmm dS, yyyy") }
                                </>
                        )
                    },
                    confirmDate: {
                        name: 'Ngày duyệt',
                        className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
                        content: (
                                <>
                                    { dateFormat(project.date, "hh:mm, dddd, mmmm dS, yyyy") }
                                </>
                        )
                    },
                    actions: {
                        name: 'Hành động',
                        className: 'px-6 py-4 text-sm font-medium text-right whitespace-nowrap',
                        content: (
                                <div className="flex justify-center mx-auto">
                                    <Link 
                                        to={`/projects/edit/${project.id}`} 
                                        className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:text-indigo-900"
                                        alt="test"
                                    >
                                        <CreateIcon />
                                    </Link>
                                </div>
                        )
                    }
                }
            );
    })
    }

    const indexOfLastPost = currentPage * projectsPerPage;
    const indexOfFirstPost = indexOfLastPost - projectsPerPage;
    const currentProjects = props.projects.slice(indexOfFirstPost, indexOfLastPost);
    const tempProjects = props.projects.filter(project => project.status.id === 2);

    const projectsData = {
        head: [
            {
                name: 'STT',
                fieldId: 'stt',
                className:'px-6 py-4 whitespace-nowrap',
            },
            {
                name: 'Tên dự án',
                fieldId: 'name',
                className: 'px-6 py-4 whitespace-nowrap',
            },
            {
                name: 'Lĩnh vực ',
                fieldId: 'field',
                className: 'px-6 py-4 whitespace-nowrap',
            },
            {
                name: 'Ngày gửi',
                fieldId: 'sentDate',
                className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
            },
            {
                name: 'Ngày duyệt',
                fieldId: 'confirmDate',
                className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
                content: (
                        <>
                            26-08-20201 21:12
                        </>
                )
            },
            {
                name: 'Hành động',
                fieldId: 'actions',
                className: 'px-6 py-4 text-sm font-medium text-right whitespace-nowrap',
            }
        ],
        body: renderProject(currentProjects)
    }
    const tempProjectsData = {
        head: [
            {
                name: 'STT',
                fieldId: 'stt',
                className:'px-6 py-4 whitespace-nowrap',
            },
            {
                name: 'Tên dự án',
                fieldId: 'name',
                className: 'px-6 py-4 whitespace-nowrap',
            },
            {
                name: 'Lĩnh vực ',
                fieldId: 'field',
                className: 'px-6 py-4 whitespace-nowrap',
            },
            {
                name: 'Ngày gửi',
                fieldId: 'sentDate',
                className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
            },
            {
                name: 'Ngày duyệt',
                fieldId: 'confirmDate',
                className: 'px-6 py-4 text-sm text-gray-500 whitespace-nowrap',
                content: (
                        <>
                            26-08-20201 21:12
                        </>
                )
            },
            {
                name: 'Hành động',
                fieldId: 'actions',
                className: 'px-6 py-4 text-sm font-medium text-right whitespace-nowrap',
            }
        ],
        body: renderTempProject(tempProjects)
    }

    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);

    const tabs = [
        {
            title: 'Tất cả',
            content: (
                <>
                    <Table tableData={projectsData}/>
                    <Pagination
                        projectsPerPage={projectsPerPage}
                        totalPosts={currentProjects.length}
                        paginateBack={paginateBack}
                        paginateFront={paginateFront}
                        currentPage={currentPage}
                    />
                </>
            )
        },
        {
            title: 'Đã duyệt',
            content: 'Dự án đã duyệt'
        },
        {
            title: 'Chờ duyệt',
            content: 'Dự án chờ duyệt'
        },
        {
            title: 'Từ chối',
            content: 'Dự án từ chối'
        },
        {
            title: 'Nháp',
            content: (
                <>
                    <Table tableData={tempProjectsData}/>
                    <Pagination
                        projectsPerPage={projectsPerPage}
                        totalPosts={currentProjects.length}
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
            <Tab tabs={tabs} color="red" openTabChange={onOpenedTabChange} />
        </>
    );
}

const mapStateToProps = (state) => {
    return { 
        projects: Object.values(state.projects)
    };
};
  
export default connect(
    mapStateToProps,
    { fetchProjects }
)(ResearcherProject);
