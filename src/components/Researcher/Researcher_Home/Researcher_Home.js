/* eslint-disable no-unused-vars */
import './Researcher_Home.css'

import React from 'react';
import { Link } from 'react-router-dom';

// import AccountCircle from '@material-ui/icons/AccountCircle';
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
// import GroupIcon from '@material-ui/icons/Group';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';


import UserIcon from '../../../assets/user.png';
import GroupDemoIcon from '../../../assets/unnamed/group.png';
import AddIcon from '../../../assets/unnamed/add.jpg';
import ProjectIcon from '../../../assets/unnamed/project.jpg';

const Researcher_Home = () => {

    const userProfile = useSelector(state => state.auth.userProfile);
    const userDataLocalStorage = localStorage.getItem("userData");
    const user = JSON.parse(userDataLocalStorage);

    return (
        <>
            <div className="grid h-screen grid-rows-2 gap-2 mt-4 border-4 rounded-md"> 
                <div className="grid grid-cols-4 gap-4">
                    <Link id="name" className="flex flex-col col-span-1 menu rounded-2xl content_center">
                        <section>
                            {/* <AccountCircle style={{ fontSize:"80px", color: "black"  }} /> */}
                            <img 
                                src={UserIcon} 
                                alt={UserIcon} 
                                className="w-20"
                            />
                        </section>
                        <section>
                            { userProfile ? userProfile.fullName : user.fullName }
                        </section>
                        <section>
                            
                            { userProfile ? userProfile.email : user.email }
                        </section>
                    </Link>
                    <div id="options" className="grid grid-cols-3 col-span-3 gap-2 p-2 rounded-2xl"
                    >
                        <Link 
                            to="/researchers/projects"
                            className="flex flex-col gap-2 rounded-2xl content_center menu"
                        >
                            {/* <LibraryBooksIcon style={{ fontSize:"80px", color: "black"  }} /> */}
                            <img 
                                src={ProjectIcon} 
                                alt={ProjectIcon} 
                                className="w-20"
                            />
                            D??? ??n
                        </Link>
                        <Link 
                            to={'/researchers/groups'}
                            className="flex flex-col gap-2 rounded-2xl content_center menu"
                        >
                            {/* <GroupIcon style={{ fontSize:"80px", color: "black"  }} /> */}
                            <img 
                                src={GroupDemoIcon} 
                                alt={GroupDemoIcon} 
                                className="w-20"
                            />
                            Nh??m nghi??n c???u
                        </Link >
                        <Link to="/projects/new" className="flex flex-col gap-2 rounded-2xl content_center menu">
                            {/* <AddCircleIcon style={{ fontSize:"80px", color: "black"  }} /> */}
                            <img 
                                src={AddIcon} 
                                alt={AddIcon} 
                                className="w-20"
                            />
                            T???o d??? ??n
                        </Link>
                    </div>
                </div>
                <div id="profile_groupResearch" className="grid grid-cols-2 gap-4">
                    <div id="profile" className="flex flex-col rounded-2xl">
                        <section className="my-3 text-xl font-bold text-center">Th??ng tin c?? nh??n</section>
                        <div className="flex flex-col gap-4 px-12">
                            <section className="flex justify-between fullName">
                                H??? t??n: 
                                <span>{ userProfile ? userProfile.fullName : user.fullName }</span>
                                
                            </section> 
                            <section className="flex justify-between gender">
                                Gi???i t??nh: 
                                <span>{ userProfile ? (userProfile.gender ? 'N???' : 'Nam') : (user.gender ? 'N???' : 'Nam') }</span>
                            </section>
                            <section className="flex justify-between birthDate">
                                Ng??y sinh: 
                                <span>20/10/1999</span>
                            </section>
                            <section className="flex justify-between address">
                                ?????a ch???: 
                                <span>{ userProfile ? userProfile.address : user.address }</span>
                             </section>
                            <section className="flex justify-between email">
                                Email: 
                                <span>{ userProfile ? userProfile.email : user.email }</span>
                            </section>
                            <section className="flex justify-between mobilePhone">
                                S??? ??i???n tho???i: 
                                <span>{ userProfile ? userProfile.phoneNumber : user.phoneNumber }</span>
                            </section>
                        </div>
                    </div>
                    <div id="groupResearch" className="flex flex-col rounded-2xl">
                        <section className="my-3 text-xl font-bold text-center">Nh??m nghi??n c???u</section>
                        <div className="grid grid-cols-3 gap-4 px-4">
                            <Link className="menu_organizations menu">
                                Nh??m 1
                            </Link>
                            <Link className="menu_organizations menu">
                                Nh??m 2
                            </Link>
                            <Link className="menu menu_organizations">
                                Nh??m 3
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Researcher_Home;