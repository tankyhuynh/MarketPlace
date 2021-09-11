import './Researcher_Home.css'

import React from 'react';
import { Link } from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import GroupIcon from '@material-ui/icons/Group';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';

const Researcher_Home = () => {

    const userProfile = useSelector(state => state.auth.userProfile)

    return (
        <>
            <div className="grid h-screen grid-rows-2 gap-2 mt-4"> 
                <div className="grid grid-cols-4 gap-4">
                    <Link id="name" className="flex flex-col col-span-1 shadow-lg menu rounded-2xl content_center">
                        <section>
                            <AccountCircle style={{ fontSize:"80px", color: "black"  }} />
                        </section>
                        <section>
                            { userProfile.fullName }
                        </section>
                        <section>
                            { userProfile.email }
                        </section>
                    </Link>
                    <div id="options" className="grid grid-cols-3 col-span-3 gap-2 p-2 border-2 shadow-lg rounded-2xl"
                    >
                        <Link 
                            to="/researchers/projects"
                            className="flex flex-col gap-2 shadow-lg rounded-2xl content_center menu"
                        >
                            <LibraryBooksIcon style={{ fontSize:"80px", color: "black"  }} />
                            Dự án
                        </Link>
                        <Link className="flex flex-col gap-2 shadow-lg rounded-2xl content_center menu">
                            <GroupIcon style={{ fontSize:"80px", color: "black"  }} />
                            Nhóm nghiên cứu
                        </Link >
                        <Link to="/projects/new" className="flex flex-col gap-2 shadow-lg rounded-2xl content_center menu">
                            <AddCircleIcon style={{ fontSize:"80px", color: "black"  }} />
                            Tạo dự án
                        </Link>
                    </div>
                </div>
                <div id="profile_groupResearch" className="grid grid-cols-2 gap-4">
                    <div id="profile" className="flex flex-col shadow-lg rounded-2xl">
                        <section className="my-3 text-xl font-bold text-center">Thông tin cá nhân</section>
                        <div className="flex flex-col gap-4 px-12">
                            <section className="flex justify-between fullName">
                                Họ tên: 
                                <span>{ userProfile.fullName }</span>
                            </section> 
                            <section className="flex justify-between gender">
                                Giới tính: 
                                <span>{ userProfile.gender ? 'Nữ' : 'Nam' }</span>
                            </section>
                            <section className="flex justify-between birthDate">
                                Ngày sinh: 
                                <span>20/10/1999</span>
                            </section>
                            <section className="flex justify-between address">
                                Địa chỉ: 
                                <span>{ userProfile.address }</span>
                             </section>
                            <section className="flex justify-between email">
                                Email: 
                                <span>{ userProfile.email }</span>
                            </section>
                            <section className="flex justify-between mobilePhone">
                                Số điện thoại: 
                                <span>{ userProfile.phoneNumber }</span>
                            </section>
                        </div>
                    </div>
                    <div id="groupResearch" className="flex flex-col shadow-lg rounded-2xl">
                        <section className="my-3 text-xl font-bold text-center">Nhóm nghiên cứu</section>
                        <div className="grid grid-cols-3 gap-4 px-4">
                            <Link className="menu_organizations menu">
                                Nhóm 1
                            </Link>
                            <Link className="menu_organizations menu">
                                Nhóm 2
                            </Link>
                            <Link className="menu menu_organizations">
                                Nhóm 3
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Researcher_Home;