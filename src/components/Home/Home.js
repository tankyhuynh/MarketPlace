import './Home.css'

import React from 'react'
import { connect } from 'react-redux';
import CarouselCustom from '../Carousel/CarouselCustom'
import CardCustom from '../CardCustom/CardCustom'
import { Link, withRouter } from 'react-router-dom';

const projects = [
    {
        title: 'Dự án 1',
        url: 'https://images.unsplash.com/photo-1581285025904-e7f1a94c330b?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
        title: 'Dự án 2',
        url: 'https://images.unsplash.com/photo-1557995744-18c7f67f4307?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
        title: 'Dự án 3',
        url: 'https://images.unsplash.com/photo-1627735410064-b8ffd0adb155?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
];

const organizations = [
    {
        title: 'Nhóm nghiên cứu 1',
        url: 'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fG9yZ2FuaXphdGlvbiUyMGxvZ298ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
        title: 'Nhóm nghiên cứu 2',
        url: 'https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fG9yZ2FuaXphdGlvbiUyMGxvZ298ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
        title: 'Nhóm nghiên cứu 3',
        url: 'https://images.unsplash.com/photo-1562783912-21ad31ee2a83?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fG9yZ2FuaXphdGlvbiUyMGxvZ298ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
];

class Home extends React.Component {
    render() {
        const renderProjects = projects.map(card =>{
            return (
                <Link>
                    <CardCustom card={card} key={card.title} />
                </Link>
            );
        });
    
        const renderOrganizations = organizations.map(card =>{
            return (
                <Link>
                    <CardCustom card={card} key={card.title} />
                </Link>
            );
        });
    
        return (
            <>
               <div className="md:h-4/5">
                    <CarouselCustom slides={projects}/>
                    
                    <div id="cards">
                        <h2 className="mx-4 text-3xl font-bold">Dự án</h2>
                        <div className="projects_organizations">
                            {renderProjects}
                        </div>
                    </div>
    
                    <div id="organizations">
                        <h2 className="ml-4 text-3xl font-bold">Nhóm nghiên cứu</h2>
                        <div className="projects_organizations">
                            {renderOrganizations}
                        </div>
                    </div>
               </div>
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
      streams: Object.values(state.streams),
      currentUserId: state.auth.userId,
      isSignedIn: state.auth.isSignedIn
    };
  };
  
export default connect(
    mapStateToProps,
    {  }
)(Home);

