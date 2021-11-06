
// import dateFormat from 'dateformat';

import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { 
    fetchGroups
} from '../../../actions/researchGroup'


import img1_a from '../../../assets/img1_a.png';
import img1_b from '../../../assets/img1_b.png';
import img2_a from '../../../assets/img2_a.png';
import img2_b from '../../../assets/img2_b.png';
import img3_a from '../../../assets/img3_a.jpg';
import img3_b from '../../../assets/img3_b.png';
import img5_a from '../../../assets/img5_a.jpg';
import img5_b from '../../../assets/img5_b.png';
// import logo from '../../assets/logo.png';


class ProjectList extends React.Component {

    randomImages = [img1_a, img1_b, img2_a, img2_b, img3_a, img3_b, img5_a, img5_b];
    
    state = {
        randomNumber: 0
    }

    TYPE_COMMERCIAL = 'CP'
    TYPE_RESEARCHING = 'RP'

    componentDidMount(){
        // this.props.fetchProjects_DaDuyet();
        this.props.fetchGroups();

        const interval = setInterval(
            // set number every 5s
            () => this.setState({ randomNumber: Math.floor(Math.random() * 100 + 1) }),
            1000
          );

        return () => {
            clearInterval(interval);
        }; 
      
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

    randomColors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'black']
    renderLinhVuc = (projectFieldList) => {
        if(projectFieldList){
            return projectFieldList.map(field => {
                const randomIndex = Math.floor(Math.random() * this.randomColors.length);
                if(field.field.name.length > 30){
                    var shortField = field.field.name.substring(0, 30) + "...";
                    return (
                        <span className={`inline-block px-2 text-xs font-semibold tracking-wide text-white uppercase rounded-full bg-${this.randomColors[randomIndex]}-500`}>
                            { shortField }
                        </span>
                    )
                }
                
                return (
                    <span className={`px-2 flex justify-center text-center self-center text-xs font-semibold tracking-wide text-white uppercase bg-gray-400 rounded-full bg-${this.randomColors[randomIndex]}-500`}>
                        {  field.field.name }
                    </span>
                ) 
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

    renderTypeOfProject = (projectType) => {
        if(projectType === this.TYPE_COMMERCIAL){
            return 'Dự án thương mại'
        }
        if(projectType === this.TYPE_RESEARCHING){
            return 'Dự án nghiên cứu'
        }
    }

    isGreaterThanOneDayBetweenNowAnd = (createdDate, conditionDate) => {
        const newStartDate= new Date(createdDate);
        const now=new Date();
        const conditionTime = 1000*60*60*24 * conditionDate;
        let result
        result = (now.getTime()-newStartDate.getTime()) < conditionTime;
        // console.log('date Converter result', result)
        if (result) {return 1}
        return 0
    }

    renderList(){
        
        return this.props.researchGroups
            .map((group, index) => {
            return (
                    <>
                        <Link 
                            to={`/groups/show/${group.id}`} 
                            className="grid items-center grid-cols-1 mx-6 border-gray-500 md:grid-cols-4"
                            key={index}
                        >
                            <div className="items-center self-center col-span-1 my-4">
                                <img 
                                    // src={this.renderImage(this.renderImageSrc(group))} 
                                    src={group.groupImage} 
                                    alt="random imgee" 
                                    className="object-cover object-center w-32 h-32 my-2 rounded-lg max-h-64" 
                                />     
                            </div>  
                            
                            <div className="grid grid-flow-row grid-cols-1 col-span-3 p-6 auto-rows-max">
                                    <div>
                                        <h4 className="mt-1 text-xl font-semibold leading-tight uppercase truncate">
                                            {group.name}
                                        </h4>
                                    </div>
                                
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: group.introduction }} 
                                        className="row-span-2 mt-1"

                                    />
                                    
                                    <div className="mt-4 b-0">
                                        <span className="flex flex-col italic text-teal-600">
                                            <span className="font-semibold">
                                                {/* {this.renderAuthors(project.author)} */}
                                                {/* Huỳnh Tấn Kỷ */}
                                                {/* { project.user.fullName } */}
                                                { group.author }
                                            </span>
                                            {/* <span className="self-end">
                                                { dateFormat(group.createdDate, "HH:MM, dddd, mmmm dS, yyyy") } <br />
                                            </span> */}
                                        </span>
                                    </div> 
                            </div>
                        </Link>
                        <hr/>
                    </>
            );
        })
    }

    render() {
        return (
            <>
                <div className="grid grid-cols-1 mx-64">
                    {this.renderList()}
                </div>
            </>
        );
    };
   
};

const mapStateToProps = (state) => {
    return { 
        researchGroups:  Object.values(state.researchGroups),
    };
}

export default connect(
    mapStateToProps, 
    { 
        fetchGroups

    }
)(ProjectList);