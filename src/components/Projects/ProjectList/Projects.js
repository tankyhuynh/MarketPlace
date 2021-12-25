
import dateFormat from 'dateformat';
import _ from 'lodash';
import Highlighter from "react-highlight-words";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const TYPE_COMMERCIAL = 'CP'
const TYPE_RESEARCHING = 'RP'

const Projects = (props) => {

    useEffect(() => {
    }, [])


    const renderShortDescripton = (shortDescription) => {
        if(shortDescription){
            if(shortDescription.length > 100){
                var shortShortDescription = shortDescription.substring(0, 100) + "...";
                return shortShortDescription;
            }
            return shortDescription;
        }
        
    };

    const renderLinhVuc = (projectFieldList) => {
        if(projectFieldList){
            return projectFieldList.map(field => {
                if(field.field.name.length > 30){
                    var shortField = field.field.name.substring(0, 30) + "...";
                    return (
                        <span className={`hidden lg::inline-block px-2 text-xs font-semibold tracking-wide text-white bg-blue-500 uppercase rounded-full`}>
                            { renderHighlightOnSearch(shortField) }
                        </span>
                    )
                }
                
                return (
                    <span className={`hidden px-2 lg:flex justify-center text-center self-center text-xs font-semibold tracking-wide text-white uppercase bg-blue-500 rounded-full`}>
                        {  renderHighlightOnSearch(field.field.name) }
                    </span>
                ) 
            })
        }
        
    };

    const renderTypeOfProject = (projectType) => {
        if(projectType === TYPE_COMMERCIAL){
            return 'Dự án thương mại'
        }
        if(projectType === TYPE_RESEARCHING){
            return 'Dự án nghiên cứu'
        }
    }

    const isGreaterThanOneDayBetweenNowAnd = (createdDate, conditionDate) => {
        const newStartDate= new Date(createdDate);
        const now=new Date();
        const conditionTime = 1000*60*60*24 * conditionDate;
        let result
        result = (now.getTime()-newStartDate.getTime()) < conditionTime;
        if (result) {return 1}
        return 0
    }

    const filterProjects = (projects, query) => {
        if (!query) {
            return projects;
        }
    
        return projects.filter((project) => {
            const projectName = project.name.toLowerCase();
            const projectAuthor = project.author.toLowerCase();
            const projectFieldList = project.projectFieldList;
            let checkFieldEqualSearch = false;
            if(projectFieldList){
                projectFieldList.map(field => {
                    if(field.field.name.toLowerCase().includes(query)){
                        checkFieldEqualSearch = true;
                    }
                    return null;
                })
            }


            return projectName.includes(query) || projectAuthor.includes(query) || checkFieldEqualSearch;
        });
    };

    const renderHighlightOnSearch = (text) => {
        const query = new URLSearchParams(window.location.search).get('s');
        return (
            <Highlighter
                // highlightClassName="bg-red-500 text-white"
                searchWords={query ? [query] : []}
                autoEscape={true}
                textToHighlight={text}
            />
        )
    }

    const renderList = () =>{

        const projects = props.projects.filter(project => project.status.id === 1 && project.type === TYPE_COMMERCIAL); 
        const query = new URLSearchParams(window.location.search).get('s');
        
       if(props.projects.length){
            return _.orderBy(filterProjects(projects, query), ['number'], ['asc'])
            .map((project, index) => {
            return (
                    <>
                        <Link 
                            to={`/projects/show/${project.type}/${project.id}/${project.code}`} 
                            className="grid grid-cols-1 mx-6 border-gray-500 md:grid-cols-4"
                            key={index}
                        >
                            <div className="items-center self-center col-span-1 my-4">
                                <img 
                                    src={project.productImage} 
                                    alt="random imgee" 
                                    className="object-cover object-center w-full my-2 rounded-lg max-h-64" 
                                />     
                            </div>  
                            
                            <div className="grid grid-flow-row grid-cols-1 col-span-3 p-6 auto-rows-max">
                                    <div>
                                        <div className="grid grid-cols-5 xl:grid-flow-col">
                                            <div className="flex flex-col md:flex-row self-start items-center col-span-4 gap-2">
                                                { isGreaterThanOneDayBetweenNowAnd(project.createdDate, 7) 
                                                    ? (
                                                        <span 
                                                            className={`inline-block px-2 text-xs font-semibold 
                                                                tracking-wide text-teal-800 uppercase bg-teal-200 
                                                                rounded-full`}
                                                        >
                                                            New
                                                        </span>
                                                    )
                                                    : null
                                                }
                                                
                                                { renderLinhVuc(project.projectFieldList ? project.projectFieldList : '') } 
                                            </div>
                                            <div className="hidden lg:block mx-2 italic font-medium"> 
                                                { renderTypeOfProject(project.type) }
                                            </div>
                                        </div>
                                        
                                        
                                        <h4 className="mt-1 text-xl font-semibold leading-tight uppercase truncate">
                                            {/* <Highlighter
                                                // highlightClassName="bg-red-500 text-white"
                                                searchWords={query ? [query] : []}
                                                autoEscape={true}
                                                textToHighlight={project.name}
                                            /> */}
                                            { renderHighlightOnSearch(project.name) }
                                        </h4>
                                            
                                    </div>
                                
                                    <div className="row-span-2 mt-1">
                                        {/* <div dangerouslySetInnerHTML={{ __html: project.advantage }} /> */}
                                        { renderHighlightOnSearch(renderShortDescripton(project.shortDescription)) }
                                    </div>
                                    <div className="mt-4 b-0">
                                        <span className="flex flex-col italic text-teal-600">
                                            <span className="font-semibold">
                                                { renderHighlightOnSearch(project.author) }
                                            </span>
                                            <span className="self-end">
                                                { dateFormat(project.createdDate, "HH:MM, dddd, mmmm dS, yyyy") } <br />
                                            </span>
                                        </span>
                                    </div> 
                            </div>
                        </Link>
                        <hr/>
                    </>
                );
            })
       }
       return <div> Không có dự án </div>
    }

    return (
        <>
            <div className="grid grid-cols-1">
                {renderList()}
            </div>
        </>
    );
   
};

export default Projects;