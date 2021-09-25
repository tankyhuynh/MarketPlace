
import dateFormat from 'dateformat';

import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchProjects_DaDuyet, fetchProjects_ChoDuyet } from '../../actions/project'


import img1_a from '../../assets/img1_a.png';
import img1_b from '../../assets/img1_b.png';
import img2_a from '../../assets/img2_a.png';
import img2_b from '../../assets/img2_b.png';
import img3_a from '../../assets/img3_a.jpg';
import img3_b from '../../assets/img3_b.png';
import img5_a from '../../assets/img5_a.jpg';
import img5_b from '../../assets/img5_b.png';
// import logo from '../../assets/logo.png';


class ProjectList extends React.Component {

    randomImages = [img1_a, img1_b, img2_a, img2_b, img3_a, img3_b, img5_a, img5_b];

    componentDidMount(){
        this.props.fetchProjects_DaDuyet();
    }

    renderAuthors = (authors) => {
        if(authors){
            return <div>{authors}</div>;
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
    renderLinhVuc = (projectFieldList) => {
        if(projectFieldList){
            return projectFieldList.map(field => {
                if(field.field.name.length > 30){
                    var shortUuDiem = field.field.name.substring(0, 30) + "...";
                    return shortUuDiem;
                }
                return field.field.name;
            })
        }
        
    };

    renderImage = (image) => {
        if(image){
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
        const j = Math.floor(Math.random() * ((this.randomImages.length -1)));
        return this.randomImages[j];
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
        
        return this.props.projects
            // .filter(project => project.status.id !== 2)
            .map((project, index) => {
            return (
                    <>
                        <Link 
                            to={`/projects/show/${project.id}`} 
                            className="grid grid-cols-1 mx-6 border-b-2 border-gray-500 md:grid-cols-4"
                            key={index}
                        >
                            <div className="items-center self-center col-span-1 my-4">
                                <img 
                                    // src={this.renderImage(this.renderImageSrc(project))} 
                                    src={project.productImage} 
                                    alt="random imgee" 
                                    className="object-cover object-center w-full my-2 rounded-lg" 
                                />     
                            </div>  
                            
                            <div className="grid grid-flow-row grid-cols-1 col-span-3 p-6 auto-rows-max">
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="inline-block px-2 text-xs font-semibold tracking-wide text-teal-800 uppercase bg-teal-200 rounded-full">
                                                New
                                            </span>
                                            <span className="inline-block px-2 text-xs font-semibold tracking-wide text-white uppercase bg-gray-400 rounded-full">
                                                {this.renderLinhVuc(project.projectFieldList ? project.projectFieldList : '')}
                                            </span>
                                        </div>
                                        
                                        <h4 className="mt-1 text-xl font-semibold leading-tight uppercase truncate">
                                            {project.name}
                                        </h4>
                                    </div>
                                
                                    <div className="row-span-2 mt-1">
                                        {/* <div dangerouslySetInnerHTML={{ __html: project.advantage }} /> */}
                                        { project.shortDescription }
                                    </div>
                                    <div className="mt-4 b-0">
                                        <span className="flex flex-col italic text-teal-600">
                                            <span className="font-semibold">
                                                {/* {this.renderAuthors(project.author)} */}
                                                {/* Huỳnh Tấn Kỷ */}
                                                { project.user.fullName }
                                            </span>
                                            <span className="self-end">
                                                { dateFormat(project.createdDate, "HH:MM, dddd, mmmm dS, yyyy") }
                                            </span>
                                        </span>
                                    </div> 
                            </div>
                        </Link>
                    </>
            );
        })
    }

    render() {
        return (
            <>
                <div className="grid grid-cols-1">
                    {this.renderList()}
                </div>
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

export default connect(mapStateToProps, { fetchProjects_DaDuyet, fetchProjects_ChoDuyet })(ProjectList);