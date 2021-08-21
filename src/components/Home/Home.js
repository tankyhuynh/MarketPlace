import './Home.css'

import React from 'react'
import { connect } from 'react-redux';
import CarouselCustom from '../Carousel/CarouselCustom'
import CardCustom from '../CardCustom/CardCustom'
import { Link } from 'react-router-dom';

import video from '../../assets/growag-introduction.mp4';

import { fetchProjects } from '../../actions';



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
        ten: 'Nhóm nghiên cứu 1',
        hinhAnhTongThe: 'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fG9yZ2FuaXphdGlvbiUyMGxvZ298ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        uuDiem: [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
        ]
    },
    {
        ten: 'Nhóm nghiên cứu 2',
        hinhAnhTongThe: 'https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fG9yZ2FuaXphdGlvbiUyMGxvZ298ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        uuDiem: [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
        ]
    },
    {
        ten: 'Nhóm nghiên cứu 3',
        hinhAnhTongThe: 'https://images.unsplash.com/photo-1562783912-21ad31ee2a83?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fG9yZ2FuaXphdGlvbiUyMGxvZ298ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        uuDiem: [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
        ]
    },
];



class Home extends React.Component {
    componentDidMount(){
        this.props.fetchProjects();
    }

    renderProjects = () =>{
        return this.props.projectsQuill
            .filter(item => item.id < 4)
            .map(card => {
                return (
                    <Link to={`/projects/show/${card.id}`}>
                        <CardCustom card={card} key={card.id} />
                    </Link>
                );
    });
    }


    render() {
        
        // const renderProjects = projects.map(card =>{
        //     return (
        //         <Link>
        //             <CardCustom card={card} key={card.title} />
        //         </Link>
        //     );
        // });
        
        
       
    
        const renderOrganizations = organizations.map(card =>{
            return (
                <Link>
                    <CardCustom card={card} key={card.title} />
                </Link>
            );
        });


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
                        <div class="md:mt-32">
                            <CarouselCustom slides={this.props.projectsQuill}/>
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
                            { renderOrganizations }
                        </div>
                    </div>
               </div>
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        projectsQuill:  Object.values(state.projects),
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchProjects }
)(Home);

