
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";

import { fetchProjectsWithQuill, fetchProjects } from "../../../actions";

import img1_a from '../../../assets/img1_a.png';
import img1_b from '../../../assets/img1_b.png';
import img2_a from '../../../assets/img2_a.png';
import img2_b from '../../../assets/img2_b.png';
import img3_a from '../../../assets/img3_a.jpg';
import img3_b from '../../../assets/img3_b.png';
import img5_a from '../../../assets/img5_a.jpg';
import img5_b from '../../../assets/img5_b.png';



class ProjectListQuill extends React.Component {
    componentDidMount(){
        this.props.fetchProjects();
    }

    renderAuthors = (authors) => {
        if(authors){
            // return authors.map(author => {
            //     return <div>{author}</div>;
            // })

            return <div>{authors[0]}</div>;

        }
    };

    renderHightlight = (hightlights) => {
        if(hightlights){
            return hightlights.map(hightlight => {
                return <div>{hightlight}</div>
            })
        }
    }

    renderImages = (image) => {
        switch(image){
            case "img1_a": return img1_a;
            case "img1_b": return img1_b;
            case "img2_a": return img2_a;
            case "img2_b": return img2_b;
            case "img3_a": return img3_a;
            case "img3_b": return img3_b;
            case "img5_a": return img5_a;
            case "img5_b": return img5_b;
            default: return null;
        }
    }
    renderImageSrc = (card) => {
        const { hinhAnhTongThe } = card;
        if( hinhAnhTongThe ){
            if(hinhAnhTongThe.length === 2){
                return hinhAnhTongThe[0];
            }
            else return hinhAnhTongThe;
        }
    };

    renderList(){
        
        return this.props.projectsQuill.map((project, index) => {
            return (
                <Link key={index} to={`/projects/show/${project.id}`}>
                    <div className="p-0 my-10 shadow-lg rounded-xl">

                        {/* Card */}
                        <div>
                            <div className="grid grid-rows-1 md:grid-cols-9">
                                
                                {/* <Icon name={project.author} size="md" color="white" /> */}
                                <div className="flex items-center justify-center w-16 h-16 row-span-1 p-10 text-xs text-center text-white bg-blue-400 rounded-lg md:text-sm -mt-7">
                                    { this.renderAuthors(project.author) }
                                </div>

                                {/* Card Body */}
                                <div className="md:col-span-8">

                                    <div className="grid grid-flow-col gap-8 sm:grid-cols-8">
                                        <div className="flex flex-col col-span-3">
                                            <div className="self-center col-span-3 text-xl font-bold text-center">
                                                {project.ten}
                                            </div>
                                            <div className="self-center w-32 col-span-1 mt-2">
                                                <img 
                                                    src={this.renderImages(this.renderImageSrc(project))} 
                                                    alt={this.renderImageSrc(project)} 
                                                    className="rounded-lg" 
                                                />
                                            </div>
                                        </div>
                                        <div className="self-center col-span-5 pr-8 italic">
                                            { this.renderHightlight(project.hightlight) }
                                        </div>
                                        
                                        {/* <div className="space-y-10 leading-6">
                                            <div dangerouslySetInnerHTML={{ __html: project.content }} />
                                        </div> */}
                                    </div>
                                    {/* <div className="flex flex-col gap-4 lg:hidden">
                                        <div className="flex ">
                                            <div className="self-center float-right font-bold text-center">
                                                {project.ten}
                                            </div>
                                            <div className="self-center float-right w-2/3 font-bold text-center">
                                                {project.hightlight}
                                            </div>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
    
                        <div className="p-2">
                            <CardStatusFooter color="green" amount="" date="Since one week">
                                <Icon color="green" name={project.developLevel} />
                            </CardStatusFooter>
                        </div>
                    </div>
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
        projectsQuill:  Object.values(state.projects),
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchProjectsWithQuill, fetchProjects })(ProjectListQuill);