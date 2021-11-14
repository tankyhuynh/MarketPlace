import './Home.css'

import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import CarouselCustom from '../Carousel/CarouselCustom'
import Card from '../CardCustom/CardHome'
import CardOrganization from '../CardCustom/CardHome_Organization'
import { Link } from 'react-router-dom';

import video from '../../assets/growag-introduction.mp4';

import { loading, loaded } from '../../actions/loading';
import { fetchProjects_DaDuyet } from '../../actions/project';
import { fetchGroups } from '../../actions/researchGroup';


// const organizations = [
//     {
//         name: 'Nhóm nghiên cứu hóa học',
//         hinhAnhTongThe: img_demo_1,
//         advantage: [
//             'Chuyên nghiên cứu thành phần hóa học nghiên cứu thành phần hóa học'    
//         ]
//     },
//     {
//         name: 'Nhóm dịch vụ xét nghiệm y tế',
//         hinhAnhTongThe: img_demo_2,
//         advantage: [
//             'Những thay đổi trong mô hình chăm sóc sức khỏe, những tiến bộ đột phá về công nghệ trong lĩnh vực y tế cùng những thay đổi trong các chuẩn mực chăm sóc bệnh nhân, tất cả đều góp phần vào một kỷ nguyên mới của y học nói chung và cho mảng xét nghiệm y tế nói riêng.'
//         ]
//     },
//     {
//         name: 'Nhóm nghiên cứu PAN',
//         hinhAnhTongThe: img_demo_3,
//         advantage: [
//             'Các công ty trong lĩnh vực nông nghiệp, thực phẩm vẫn là mục tiêu PAN muốn tìm để M&A'    
//         ]
//     },
// ];

const filterProjects = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
};

const Home = (props) => {

    useEffect(() => {
        props.fetchProjects_DaDuyet();
        props.fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const query = new URLSearchParams(window.location.search).get('s');
    
    const renderProjects = (sliceProjects) =>{
        const filteredProjects = filterProjects(sliceProjects, query);

        return filteredProjects
            .filter(project => project.statusId !== 2)
            // .slice(0,3)
            .map(card => {
                return (
                    <Link to={`/projects/show/${card.type}/${card.id}`} key={card.id}>
                        <Card card={card} key={card.id} />
                    </Link>
                );
        });
    }

    const renderOrganizations = (organizations) => {
        return organizations
                .slice(0,3)
                .map((group) =>{
                    return (
                        <Link to={`/groups/show/${group.id}`} key={group.name}>
                            <CardOrganization card={group} key={group.name} />
                        </Link>
                    );
                });
    }

    return (
        <>
            
            <div className="flex flex-col">
                {/* <div className="grid justify-self-center"> */}
                <div className={`${props.projects.length ? 'hero' : 'border-2'} h-screen flex flex-col justify-center self-center md:-mx-28`}>
                    <video
                        // className="absolute w-full mx-0 2xl:relative md:-mx-28 xl:-mx-28"
                        className={`w-full mx-0 heroVideoBg ${props.projects.length ? 'absolute' : 'relative'}`}
                        autoPlay
                        loop
                        muted
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag
                    </video>
                    {/* <div className="relative md:my-16 xl:my-32 2xl:my-48"> */}

                    <div className="mt-4 heroContent">
                        {
                            props.projects.length        
                            ? (<CarouselCustom 
                                // slides={this.props.projects.filter(project => project.statusId !== 2)} 
                                slides={props.projects} 
                                organizations={props.researchGroups}
                            />)
                            : null
                        }
                    </div>
                    {/* {
                        this.props.projects.length
                        ? (<div id="cards" className="z-10 hidden border-2 xl:block 2xl:mt-0 heroContent ">
                            <h2 className="mx-4 text-3xl font-bold text-white">Dự án</h2>
                            <div className="gap-4 md:grid md:grid-cols-3">
                                { this.renderProjects() }
                            </div>
                        </div>)
                        : null
                    } */}
                </div>

                {
                    props.projects.length
                    ? (<div id="cards" className="z-10 2xl:mt-0">
                        <h2 className="mx-4 mb-12 text-3xl font-bold">Dự án</h2>
                        <div className="gap-4 md:grid md:grid-cols-3">
                            { renderProjects(props.projects.slice(0,3)) }
                        </div>
                    </div>)
                    : null
                }

                <div id="organizations" className={`${props.projects.length ? 'mt-4' : 'z-10 md:mt-24 xl:my-0 2xl:mt-0' }`}>
                    <h2 className="ml-4 text-3xl font-bold">Nhóm nghiên cứu</h2>
                    <div className="projects_organizations">
                        { renderOrganizations(props.researchGroups) }
                    </div>
                </div>
            </div>

         
        </>
    );
};

const mapStateToProps = state => {
    return {
        projects:  Object.values(state.projects),
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        researchGroups:  Object.values(state.researchGroups),
    };
  };
  
export default connect(
    mapStateToProps,
    { 
        fetchProjects_DaDuyet, 
        loading, loaded,
        fetchGroups 
    }
)(Home);

