import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardBody from "@material-tailwind/react/CardBody";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";
import Paragraph from "@material-tailwind/react/Paragraph";
import { Image } from "@material-ui/icons";

import { fetchStreams, fetchProjects } from "../../actions";

import img1 from '../../assets/img1.png';

const images = [
    {
        title: 'Image 1',
        url: 'https://images.unsplash.com/photo-1627840935425-3d333bb627f8?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    }
];

class ProjectList extends React.Component {
    componentDidMount(){
        this.props.fetchProjects();
    }

    renderList(){
        return this.props.projects.map(project => {
            return (
                <Link to={`/projects/${project.id}`}>
                    <Card className="my-10">
                        <CardRow>
                            <div className="flex">
                                <CardHeader 
                                    color="lightBlue" 
                                    size="sm" 
                                    iconOnly
                                >
                                    <Icon name={project.author} size="md" color="white" />
                                </CardHeader>
                                <CardBody className="">
                                    <div className="flex gap-6">
                                        <img 
                                            src={img1}
                                            alt={img1}
                                            className="w-32 rounded-md"
                                        />
                                        
                                        <div className="flex flex-col">
                                            <div className="my-2 text-2xl text-center">
                                                {project.name}
                                            </div>
                                            <div className="space-y-10 leading-6">
                                                {project.hightlightContent}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </div>
                        </CardRow>
    
                        <CardStatusFooter color="green" amount="" date="Since one week">
                            <Icon color="green" name={project.developLevel} />
                        </CardStatusFooter>
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