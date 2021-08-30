import './Home.css'

import React from 'react'
import { connect } from 'react-redux';
import CarouselCustom from '../Carousel/CarouselCustom'
import CardCustom from '../CardCustom/CardCustom'
import { Link } from 'react-router-dom';

import video from '../../assets/growag-introduction.mp4';

import { fetchProjects } from '../../actions';

import img_demo_1 from '../../assets/iTRAK-contain-500x240.jpg';
import img_demo_2 from '../../assets/KALYX-contain-500x240.jpg';
import img_demo_3 from '../../assets/Onside_LOGO_Lime_RGB_POS-contain-500x240.jpg';



// const projects = [
//     {
//         title: 'Dự án 1',
//         url: 'https://images.unsplash.com/photo-1581285025904-e7f1a94c330b?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
//     },
//     {
//         title: 'Dự án 2',
//         url: 'https://images.unsplash.com/photo-1557995744-18c7f67f4307?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
//     },
//     {
//         title: 'Dự án 3',
//         url: 'https://images.unsplash.com/photo-1627735410064-b8ffd0adb155?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
//     },
// ];

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
        this.props.fetchProjects();
    }

    renderProjects = () =>{
        return this.props.projects
            .filter(project => project.status.id !== 2)
            .slice(0,3)
            .map(card => {
                return (
                    <Link to={`/projects/show/${card.id}`} key={card.id}>
                        <CardCustom card={card} key={card.id} />
                    </Link>
                );
        });
    }

    renderOrganizations = organizations.map(card =>{
        return (
            <Link to="/" key={card.ten}>
                <CardCustom card={card} key={card.ten} />
            </Link>
        );
    });

    render() {
        return (
            <>
               <div className="flex flex-col gap-12">
                    <div className="">
                        <video
                            className="absolute md:-mx-28"
                            autoPlay
                            loop
                            muted
                        >
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag
                        </video>
                        <div className="md:mt-32">
                            <CarouselCustom slides={this.props.projects.filter(project => project.status.id !== 2)} organizations={organizations}/>
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
    { fetchProjects }
)(Home);

