
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchProjectsWithQuill, fetchProjects } from "../../actions";

import img1_a from '../../assets/img1_a.png';
import img1_b from '../../assets/img1_b.png';
import img2_a from '../../assets/img2_a.png';
import img2_b from '../../assets/img2_b.png';
import img3_a from '../../assets/img3_a.jpg';
import img3_b from '../../assets/img3_b.png';
import img5_a from '../../assets/img5_a.jpg';
import img5_b from '../../assets/img5_b.png';



class ProjectList extends React.Component {
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

    renderUuDiem = (uuDiems) => {
        if(uuDiems){
            let uuDiemStr = '';
            uuDiems.map(uuDiem => {
                return uuDiemStr += uuDiem;
            })

            if(uuDiemStr.length > 100){
                var shortUuDiem = uuDiemStr.substring(0, 100) + "...";
                return shortUuDiem;
            }
        }
        
    };
    renderLinhVuc = (linhVuc) => {
        if(linhVuc){
            if(linhVuc.length > 30){
                var shortUuDiem = linhVuc.substring(0, 30) + "...";
                return shortUuDiem;
            }
            return linhVuc;
        }
        
    };

    renderImage = (image) => {
        switch(image){
            case "img1_a": return img1_a;
            case "img1_b": return img1_b;
            case "img2_a": return img2_a;
            case "img2_b": return img2_b;
            case "img3_a": return img3_a;
            case "img3_b": return img3_b;
            case "img5_a": return img5_a;
            case "img5_b": return img5_b;
            default: return image;
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
                    <Link 
                        to={`/projects/show/${project.id}`} 
                        className="grid grid-cols-1 rounded-lg shadow-lg md:grid-cols-4"
                    >
                        <img 
                            src={this.renderImage(this.renderImageSrc(project))} 
                            alt=" random imgee" 
                            className="object-cover object-center w-full h-64 col-span-1 rounded-lg shadow-md lg:h-full lg:w-full" 
                        />    
                        
                        <div className="grid grid-cols-1 col-span-3 grid-rows-5 p-6 ">
                                <div className="">
                                    <div className="flex items-baseline gap-2">
                                        <span className="inline-block px-2 text-xs font-semibold tracking-wide text-teal-800 uppercase bg-teal-200 rounded-full">
                                            New
                                        </span>
                                        <span className="inline-block px-2 text-xs font-semibold tracking-wide text-white uppercase bg-gray-400 rounded-full">
                                            {this.renderLinhVuc(project.lvApDung)}
                                        </span>
                                    </div>
                                    
                                    <h4 className="mt-1 text-xl font-semibold leading-tight uppercase truncate">
                                        {project.ten}
                                    </h4>
                                </div>
                            
                                <div className="row-span-3 mt-1">
                                    {project.uuDiem}
                                </div>
                                <div className="mt-4 b-0 place-content-end">
                                    <span className="flex flex-col italic text-teal-600">
                                        <span className="font-semibold">
                                            {this.renderAuthors(project.author)}
                                        </span>
                                        <span className="self-end">
                                            1 tuần trước
                                        </span>
                                    </span>
                                </div> 
                        </div>
                    </Link>
            );
        })
    }

    render() {
        return (
            <>
                <div className="grid grid-cols-1 gap-8 mt-20">
                    {this.renderList()}
                </div>
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

export default connect(mapStateToProps, { fetchProjectsWithQuill, fetchProjects })(ProjectList);