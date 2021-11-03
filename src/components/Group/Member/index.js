import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfileById } from '../../../actions/user'
import { fetchRolesOfGroup } from '../../../actions/roleOfGroup'

import Image from "@material-tailwind/react/Image";
import Paragraph from "@material-tailwind/react/Paragraph";

import logo from '../../../assets/logo.png';

const ResearcherGroup = (props) => {

    useEffect(() => {
        props.fetchUserProfileById(props.match.params.id)
        props.fetchRolesOfGroup()
    }, []);

    // return (
    //     <>
    //         <div className="grid grid-cols-5 gap-8 mt-12">
    //             <div className="col-span-1">
    //                 <Image
    //                     src={logo}
    //                     rounded={false}
    //                     raised={false}
    //                     alt="Image"
    //                 />
    //             </div>
    //             <div className="flex flex-col col-span-4 gap-4">
    //                 <section>
    //                     Head of Department - Ph.D
    //                 </section>
    //                 <section>
    //                     ID: { props.user ? props.user.id : 1 }
    //                 </section>
    //                 <section>
    //                     Email: { props.user ? props.user.email : '' }
    //                 </section>
    //                 <section>
    //                     <Paragraph>
    //                         { props.user ? props.user.fullName : '' } is a former student of Bachelor 
    //                         of Engineering in Computer Science at Cantho University. 
    //                         He obtained his Doctorate in Computer Science from
    //                         Toulouse 1 Capitole University (2015), France, and had 
    //                         obtained Master in Information System Development 
    //                         from HAN University (2010), Netherlands. 
    //                         He has a background in computer science and software engineering. 
    //                         He took the role of director of Cantho University Software Center 
    //                         from 2003 to 2008, lecturer of ICT college., Cantho University 
    //                         from 2002 until now. Currently, he is head of 
    //                         Software Engineering Dept., ICT College, Cantho University; 
    //                         a member of Can Tho University Board of Trustees Term 2020-2025. 
    //                         In his research, he focuses on data warehouse, Multi agent-based Systems, 
    //                         IoT, and applying these technologies in aquaculture and agriculture.
    //                     </Paragraph>
    //                 </section>
    //             </div>
    //         </div>
    //     </>
    // ) 

    return (
        <div className="flex flex-row flex-wrap p-3 mt-12 bg-white">
            <div className="w-2/3 mx-auto">
                <div className="flex flex-row flex-wrap w-full p-3 antialiased rounded-lg shadow-md" 
                    style={{ 
                        // backgroundImage: "url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
                        backgroundImage: logo,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundBlendMode: 'multiply',
                     }}
                >
                    <div className="md:w-1/3">
                        <img 
                            className="antialiased rounded-lg shadow-lg" 
                            // src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            src={logo}
                            alt="img" 
                        />  
                        
                    </div>
                    <div className="flex flex-col w-2/3 col-span-4 gap-4 px-8">
                        <section>
                            Head of Department - Ph.D
                        </section>
                        <section>
                            ID: { props.user ? props.user.id : 1 }
                        </section>
                        <section>
                            Email: { props.user ? props.user.email : '' }
                        </section>
                        <section>
                            <Paragraph>
                                { props.user ? props.user.fullName : '' } is a former student of Bachelor 
                                of Engineering in Computer Science at Cantho University. 
                                He obtained his Doctorate in Computer Science from
                                Toulouse 1 Capitole University (2015), France, and had 
                                obtained Master in Information System Development 
                                from HAN University (2010), Netherlands. 
                                He has a background in computer science and software engineering. 
                                He took the role of director of Cantho University Software Center 
                                from 2003 to 2008, lecturer of ICT college., Cantho University 
                                from 2002 until now. Currently, he is head of 
                                Software Engineering Dept., ICT College, Cantho University; 
                                a member of Can Tho University Board of Trustees Term 2020-2025. 
                                In his research, he focuses on data warehouse, Multi agent-based Systems, 
                                IoT, and applying these technologies in aquaculture and agriculture.
                            </Paragraph>
                        </section>
                    </div>
                    <div className="flex flex-row flex-wrap w-full px-3 md:w-2/3">
                        <div className="relative w-full pt-3 font-semibold text-right text-gray-700 md:pt-0">
                            <div className="text-2xl leading-tight">
                                { props.user ? props.user.fullName : '' }
                            </div>
                                <div className="text-gray-300 cursor-pointer text-normal hover:text-gray-400">
                                    <span className="pb-1 border-b border-gray-500 border-dashed">
                                        { props.roleOfGroup ? props.roleOfGroup.name : '' }
                                    </span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        user: state.users[ownProps.match.params.id],
        roleOfGroup: state.rolesOfGroup[ownProps.match.params.roleId] 
    };
};
  
export default connect(
    mapStateToProps,
    { 
        fetchUserProfileById,
        fetchRolesOfGroup 
    }
)(ResearcherGroup);
