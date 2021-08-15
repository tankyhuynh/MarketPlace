
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardBody from "@material-tailwind/react/CardBody";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";

import { fetchStreams, fetchProjects } from "../../../actions";

import img1_a from '../../../assets/img1.png';


class ProjectList extends React.Component {
    componentDidMount(){
        this.props.fetchProjects();
    }

    renderList(){
        return this.props.projects.map(project => {
            return (
                <Link to={`/projects/show/${project.id}`} key={project.id}>
                    <Card className="p-0 my-10">
                        <CardRow>
                            <div className="grid grid-rows-1 md:grid-cols-9">
                                
                                {/* <Icon name={project.author} size="md" color="white" /> */}
                                <div className="w-20 h-20 row-span-1 p-4 mx-2 text-xs text-center text-white bg-blue-400 rounded-lg md:text-sm -mt-7">
                                    {project.author}
                                </div>

                                <CardBody className="md:col-span-8">
                                    <div className="">  
                                        <div className="hidden gap-4 lg:flex">
                                            <img    
                                                src={img1_a}
                                                alt={img1_a}
                                                className="rounded-lg w-36"
                                            />
                                            <div className="flex flex-col justify-evenly">
                                                <div className="self-center float-right w-2/3 font-bold text-center">
                                                    {project.name}
                                                </div>
                                                <div className="space-y-10 leading-6">
                                                    {project.hightlightContent}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 lg:hidden">
                                            <div className="flex ">
                                                <img 
                                                    src={img1_a}
                                                    alt={img1_a}
                                                    className="h-32"
                                                />
                                                <div className="self-center float-right font-bold text-center">
                                                    {project.name}
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-evenly">
                                                <div className="space-y-10 leading-6">
                                                    {project.hightlightContent}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </CardBody>
                            </div>
                        </CardRow>
    
                        <div className="p-2">
                            <CardStatusFooter color="green" amount="" date="Since one week">
                                <Icon color="green" name={project.developLevel} />
                            </CardStatusFooter>
                        </div>
                    </Card>
                </Link>
            );
        })
    }

    render() {
        return (
            <>
                {this.renderList()}
            </>
        );
    };
   
};

const mapStateToProps = (state) => {
    return { 
        projects:  Object.values(state.projects),
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams, fetchProjects})(ProjectList);