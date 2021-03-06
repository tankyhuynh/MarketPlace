import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Card from '../Card';
import SideBar from '../Sidebar';

import { fetchGroup } from '../../../actions/researchGroup'


// import researcherImage from '../../../assets/TMThai.jpg'

// const members = [
//     {
//         name: 'Trương Minh Thái',
//         avatar: researcherImage,
//         qualification: ' Ph.D - Head of Department ',
//         email: 'tmthai@cit.ctu.edu.vn'
        
//     },
//     {
//         name: 'Trương Minh Thái',
//         avatar: researcherImage,
//         qualification: ' Ph.D - Head of Department ',
//         email: 'tmthai@cit.ctu.edu.vn'
        
//     },
//     {
//         name: 'Trương Minh Thái',
//         avatar: researcherImage,
//         qualification: ' Ph.D - Head of Department ',
//         email: 'tmthai@cit.ctu.edu.vn'
        
//     },
//     {
//         name: 'Trương Minh Thái',
//         avatar: researcherImage,
//         qualification: ' Ph.D - Head of Department ',
//         email: 'tmthai@cit.ctu.edu.vn'
        
//     },
//     {
//         name: 'Trương Minh Thái',
//         avatar: researcherImage,
//         qualification: ' Ph.D - Head of Department ',
//         email: 'tmthai@cit.ctu.edu.vn'
        
//     },
//     {
//         name: 'Trương Minh Thái',
//         avatar: researcherImage,
//         qualification: ' Ph.D - Head of Department ',
//         email: 'tmthai@cit.ctu.edu.vn'
        
//     },

// ];


const ResearcherGroup = (props) => {

    useEffect(() => {
        props.fetchGroup(props.match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderMembers = (members) => {
        return members.map(member => {
            return (
                // <Member user={member.userProfile} role={member.roleOfGroup} />
                <Link 
                    to={`/groups/member/show/${member.userProfile.id}/${member.roleOfGroup.id}`}
                    className="flex-auto"
                >
                    <Card card={member.userProfile} />
                </Link>
            )
        })
    }

    const items = {
        introduction: {
            name: 'Giới thiệu',
            title: 'Nhóm dịch vụ xét nghiệm y tế',
            content: (
                <>
                    <div 
                        dangerouslySetInnerHTML={
                            { __html: props.group 
                                ? props.group.introduction 
                                : '' }
                        } 
                    />
                </>
            )
        },
        // mission: {
        //     name: ' Nhiệm vụ và sứ mệnh',
        //     title: '',
        //     content: (
        //         <section className="mt-4 text-xl">
        //             Những thay đổi trong mô hình chăm sóc sức khỏe, những tiến bộ đột phá về công nghệ trong lĩnh vực y tế cùng những thay đổi trong các chuẩn mực chăm sóc bệnh nhân, tất cả đều góp phần vào một kỷ nguyên mới của y học nói chung và cho mảng xét nghiệm y tế nói riêng.
        //         </section>
        //     ) 
        // },
        researchTopic: {
            name: 'Chủ đề nghiên cứu',
            title: '',
            content: (
                <div 
                    dangerouslySetInnerHTML={
                        { 
                            __html: props.group 
                                ? props.group.researchTopic 
                                : '' 
                        }
                    } 
                />
            )
         },
        members: {
            name: 'Thành viên hiện tại',
            title: '',
            content: (
                <section className="flex flex-wrap gap-2 mt-4">
                    { renderMembers(props.group ? props.group.groupDetailList : []) }
                </section>
            )
        },
        publication: {
            name: 'Công bố khoa học',
            title: '',
            content: (
                <div 
                    dangerouslySetInnerHTML={{ __html: props.group ? props.group.publication : '' }} 
                    // className="flex flex-col gap-2 mt-4 text-left"
                />
            )
        },
    }

    const [content, setContent] = useState(items['introduction'] ? items['introduction'].content : '');
    
    // const renderList = () => {
    //     return items.map(item => {
    //         return (
    //             <section className="mx-auto my-6 text-center ">
    //                 <span 
    //                     className="px-4 py-2 text-2xl font-bold bg-gray-200 text- rounded-xl"
    //                     style={{ color: '#0065C1' }}
    //                 >
    //                     {item.name  }
    //                 </span>
    //                 <section className="mt-3 text-4xl font-bold">
    //                     { item.title }
    //                 </section>
    //                 { item.content }
    //             </section>
    //         )
    //     })
    // }

    const onSidebarItemClick = (content) => {
        setContent(content)
    }

    const renderContent = () => {
        if(items){
            return Object.values(items).map((item, index) => {
                return (
                    <span className="mx-4 font-medium">
                        { item.content }
                    </span>
                )
            })
        }
    } 

    return (
        <div className="flex flex-col gap-4">
            {/* <div className="flex flex-col gap-2 md:mx-32">
                { renderList() }
            </div> */}
            <Link 
                to={'/groups'}
                className="mx-4"
            >
                <ArrowBackIcon />
            </Link>

            <div className="hidden lg:flex gap-2">
                <div>
                    <SideBar items={items} onSidebaritemClick={onSidebarItemClick} />
                </div>
                <div className="px-10 mt-10">
                    { content }
                </div>
            </div>
            <div className="flex flex-col lg:hidden gap-2">
                { renderContent() }
            </div>
        </div>
    ) 
}

const mapStateToProps = (state, ownProps) => {
    return { group: state.researchGroups[ownProps.match.params.id] };
  };
  
  export default connect(
    mapStateToProps,
    { fetchGroup }
  )(ResearcherGroup);
//   export default ResearcherGroup
