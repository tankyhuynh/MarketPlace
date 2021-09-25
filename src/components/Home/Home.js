import './Home.css'

import React from 'react'
import { connect } from 'react-redux';
import CarouselCustom from '../Carousel/CarouselCustom'
import Card from '../CardCustom/CardHome'
import { Link } from 'react-router-dom';

import video from '../../assets/growag-introduction.mp4';

import { loading, loaded } from '../../actions/loading';
import { fetchProjects_DaDuyet } from '../../actions/project';

import img_demo_1 from '../../assets/iTRAK-contain-500x240.jpg';
import img_demo_2 from '../../assets/KALYX-contain-500x240.jpg';
import img_demo_3 from '../../assets/Onside_LOGO_Lime_RGB_POS-contain-500x240.jpg';



const organizations = [
    {
        name: 'Nhóm nghiên cứu 1',
        hinhAnhTongThe: img_demo_1
        ,advantage: [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
        ]
    },
    {
        name: 'Nhóm nghiên cứu 2',
        hinhAnhTongThe: img_demo_2,
        advantage: [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
        ]
    },
    {
        name: 'Nhóm nghiên cứu 3',
        hinhAnhTongThe: img_demo_3,
        advantage: [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
        ]
    },
];



class Home extends React.Component {
    componentDidMount(){
        this.props.fetchProjects_DaDuyet();
    }

    renderProjects = () =>{
        return this.props.projects
            // .filter(project => project.statusId !== 2)
            .slice(0,3)
            .map(card => {
                return (
                    <Link to={`/projects/show/${card.id}`} key={card.id}>
                        <Card card={card} key={card.id} />
                    </Link>
                );
        });
    }

    renderOrganizations = organizations.map(card =>{
        return (
            <Link to="/" key={card.ten}>
                <Card card={card} key={card.ten} />
            </Link>
        );
    });

    render() {
        return (
            <>
               <div className="flex flex-col gap-12">
                    <div className="">
                        <video
                            className="absolute -mx-28 2xl:mx-16"
                            autoPlay
                            loop
                            muted
                        >
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag
                        </video>
                        <div className="md:mt-32">
                            <CarouselCustom 
                                // slides={this.props.projects.filter(project => project.statusId !== 2)} 
                                slides={this.props.projects} 
                                organizations={organizations}
                            />
                        </div>
                    </div>
                    
                    <div id="cards" className="z-10 md:mt-24">
                        <h2 className="mx-4 mb-12 text-3xl font-bold">Dự án</h2>
                        <div className="gap-4 md:grid md:grid-cols-3">
                            { this.renderProjects() }
                        </div>
                    </div>
    
                    <div id="organizations" className="mt-4">
                        <h2 className="ml-4 text-3xl font-bold">Nhóm nghiên cứu</h2>
                        <div className="projects_organizations">
                            { this.renderOrganizations }
                        </div>
                    </div>
               </div>
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        projects:  Object.values(state.projects),
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchProjects_DaDuyet, loading, loaded }
)(Home);

