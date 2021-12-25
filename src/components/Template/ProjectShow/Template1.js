/* eslint-disable eqeqeq */
import './template.css'

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert'

import { createCustomerContact } from '../../../actions/customerContact'

import LocationCityIcon from '@mui/icons-material/LocationCity';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import HttpIcon from '@mui/icons-material/Http';
import GroupIcon from '@mui/icons-material/Group';
import BiotechIcon from '@mui/icons-material/Biotech';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import TransformIcon from '@mui/icons-material/Transform';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { CustomDialog } from 'react-st-modal';

import FormSubmit from './FormSubmit'
import { columns } from './table-definition'



const TYPE_COMMERCIAL = 'CP'
// const TYPE_RESEARCHING = 'RP'
const TYPE_TEMPLATE_PREVIEW = 'preview'
// const TYPE_TEMPLATE_SHOW = 'show'
const OTHER_LEVELDEVELOP_ID = 4
// const OTHER_TRANSMISSION_ID = 4

const formConfig = {
    title: "Thông tin liên hệ",
    button_text_ok: 'Gửi',
    button_text_cancel: 'Hủy'
}


const ProjectShow = ({ project , type, projectType, fields, levels, transmissions, createCustomerContact}) => {

    console.log('ProjectShow', project)
    console.log('ProjectShow', projectType)
    console.log('ProjectShow', type)

    const alertUseAlert = useAlert()

    const onSubmit = (value) => {
        const submitData = { ...value, projectId: value.id };
        console.log('FormEdit onSubmit contact: ', submitData);
        
        createCustomerContact(submitData)
        alertUseAlert.show('Thêm hoàn tất')
    }

    const onBtnContactClick = async (project) => {
        const pickedFieldsProject = _.pick(project, 'id', 'name')
            await CustomDialog(
                <FormSubmit 
                    formConfig={formConfig}
                    initialValue={pickedFieldsProject}
                    domains={columns} 
                    onSubmit={onSubmit}
                />, {
                title: formConfig.title,
                showCloseIcon: true,
            });

    }

    // const renderImage = (image) => {
    //     if(image){
    //          switch(image){
    //              case "img1_a": return img1_a;
    //              case "img1_b": return img1_b;
    //              case "img2_a": return img2_a;
    //              case "img2_b": return img2_b;
    //              case "img3_a": return img3_a;
    //              case "img3_b": return img3_b;
    //              case "img5_a": return img5_a;
    //              case "img5_b": return img5_b;
    //              default: return image;
    //          }
    //     }
    //     return logo;
    //  }

    // const renderImageSrc = (hinhAnh) => {
    //     if( hinhAnh ){
    //         if(hinhAnh.length === 2){
    //             return hinhAnh[0];
    //         }
    //         else return hinhAnh;
    //     }
    // };

    // const renderImages = (images) => {
    //     if(images){
    //         return images.map(image => {
    //             return (
    //                 <span className="w-32" key={image}>
    //                     <img 
    //                         src={renderImage(renderImageSrc(image))}
    //                         alt={renderImage(renderImageSrc(image))} 
    //                         className="transition duration-500 transform rounded-lg hover:scale-150"
    //                     />
    //                 </span>
    //             );
    //         });
    //     }
    // };

    const renderContent = (items) => {
        
        return items.map((item, index) => {
           
            return (
                <div id={item.name} className="flex flex-col" key={index}>
                    <span className="mt-4 text-xl font-medium ">
                        {`${item.name} `}
                    </span>
                    { item.isUseEditor 
                        ? <span dangerouslySetInnerHTML={{ __html: item.value }}  /> 
                        : item.value  
                    }
                </div>
            );
        })
    };

    const renderContentMobile = (items) => {
        
        const content = items.map((item, index) => {
           
            return (
                <div id={item.name} className="flex items-center gap-4" key={index}>
                    <span className="text-2xl font-medium ">
                        { item.icon }
                    </span>
                    <span>
                        { item.isUseEditor 
                            ? <span dangerouslySetInnerHTML={{ __html: item.value }}  /> 
                            : item.value  
                        }
                    </span>
                </div>
            );
        })

        return (
            <div id="project_navbar_mobile" className="grid grid-flow-row col-span-3 ml-6 lg:hidden">
                { content }
            </div>
        )
    };

    const {
        companyName,
        address,
        phoneNumber,
        email,
        website,
        name,
        shortDescription,
        // user,
        author,
        projectFieldList,
        // status,
        process,
        advantage,
        commercialDevelopmentLevelList,
        commercialTransmissionMethodList,
        scope,
        price,
        productImage,
        challenge,
        solution,
        benefit 
    } = project;


    // commercialDevelopmentLevelList
    const renderCommercials = (commercials) => {
        const commercialsFormat = commercials.map((level, index) => {
            console.log('renderContent', level.developmentLevel.name);
            // eslint-disable-next-line eqeqeq
            if(level.developmentLevel.id != OTHER_ID ){
                return level.developmentLevel.name
            }
            return level.note 
        })

        return commercialsFormat.join(', ')
    }

    const renderTransmissions = (transmissions) => {
        const transmissionsFormat = transmissions.map((transmission, index) => {
            // eslint-disable-next-line eqeqeq
            if(transmission.transmissionMethod.id != OTHER_ID ){
                return transmission.transmissionMethod.name
            }
            return transmission.note 
        })

        return transmissionsFormat.join(', ')
    }

    const renderFieldsShow = (fields) => {
        const fieldsFormat = fields.map((field, index) => {
            // eslint-disable-next-line eqeqeq
            return <div>{ field.field.name }</div>
        })

        // return fieldsFormat.join(', ')
        return fieldsFormat
    }
    const renderFieldsPreview = (projectFields) => {

        let fieldsFormat = []
        if(projectFields){
            fieldsFormat = projectFields.map((field, index) => {
                // eslint-disable-next-line eqeqeq
                let result;
                if(fields[field]){
                    console.log('result fields[field]: ', fields[field]);
                    result =  fields[field]    
                }
                else {
                    // eslint-disable-next-line array-callback-return
                    Object.values(fields).map(item => {
                        let tmpResult = item.childOfFieldList.find(item => item.id == field)
                        result = tmpResult ? tmpResult : result
                        if(!result){
                            item.childOfFieldList.map(childItem => {
                                tmpResult = childItem.childOfFieldList.find(item => item.id == field)
                                result = tmpResult ? tmpResult : result
                                return result
                            })
                        }
                        
                    })
                    
                }

                return <div>{ result ? result.name : null }</div> 
            })
        }

        // return fieldsFormat.join(', ')
        return fieldsFormat
    }

    const OTHER_ID = 4;

    const templateViewProject = {
        commercial: {
            generalInfo: {
                children: [
                    {
                        name: 'Tên đơn vị',
                        value: companyName,
                        isUseEditor: false,
                        icon: <LocationCityIcon />
                    },
                    {
                        name: 'Địa chỉ',
                        value: address,
                        isUseEditor: false,
                        icon: <AddLocationAltIcon />
                    },
                    {
                        name: 'Số điện thoại',
                        value: phoneNumber,
                        isUseEditor: false,
                        icon: <PhoneAndroidIcon />
                    },
                    {
                        name: 'Email',
                        value: email,
                        isUseEditor: false,
                        icon: <EmailIcon />
                    },
                    {
                        name: 'Website',
                        value: (
                            <a 
                                href={website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`text-blue-500 italic`}
                            >
                                { website }
                            </a>
                        ),
                        isUseEditor: false,
                        icon: <HttpIcon />
                    },
                    {
                        name: 'Nhóm tác giả',
                        value: author,
                        isUseEditor: false,
                        icon: <GroupIcon />
                    },
                    {
                        name: 'Lĩnh vực áp dụng',
                        value: type === TYPE_TEMPLATE_PREVIEW 
                            ? (
                                project.fieldIdList 
                                ? renderFieldsPreview(project.fieldIdList)
                                : null
                            )
                            : renderFieldsShow(projectFieldList),
                            icon: <BiotechIcon />
                        
                    },
                    {
                        name: 'Mức độ phát triển',
                        // type === TYPE_TEMPLATE_PREVIEW 
                        value: projectType === TYPE_COMMERCIAL
                            ? (
                                type === TYPE_TEMPLATE_PREVIEW 
                                ? (
                                    project.comDevLevel && project.comDevLevel.length
                                    ?   project.comDevLevel.map((projectLevel, index) => {
                                        console.log('renderContent', projectLevel);
                                            if(projectLevel.developmentLevelId === OTHER_LEVELDEVELOP_ID){
                                                return <div key={index}>{ projectLevel.note }</div>
                                            }
                                            else return <div key={index}>{ levels[projectLevel.developmentLevelId] ? levels[projectLevel.developmentLevelId].name : '' }</div>
                                        })
                                    : ''
                                ) 
                                : (
                                    commercialDevelopmentLevelList ? (
                                        renderCommercials(commercialDevelopmentLevelList) 
                                    ) : 1
                                )
                            )
                            : (
                                commercialDevelopmentLevelList ? (
                                    renderCommercials(commercialDevelopmentLevelList) 
                                ) : 1
                                // commercialDevelopmentLevelList ? (
                                //     commercialDevelopmentLevelList.map((level, index) => {
                                //         console.log('renderContent', level.developmentLevel.name);
                                //         // eslint-disable-next-line eqeqeq
                                //         if(level.developmentLevel.id != OTHER_ID ){
                                //             return <span key={index}>{level.developmentLevel.name}</span> 
                                //         }
                                //         return <span key={index}>{level.note}</span> 
                                //     })
                                // ) : 1
                            ),
                            icon: <EscalatorWarningIcon />
                    },
                    {
                        name: 'Phương thức chuyển giao',
                        value: projectType === TYPE_COMMERCIAL
                                ? (
                                    type === TYPE_TEMPLATE_PREVIEW  
                                        ? (
                                            project.comTransMethod && project.comTransMethod.length
                                            ?   project.comTransMethod.map((projectTransmission, index) => {
                                                    if(projectTransmission.transmissionMethodId === OTHER_LEVELDEVELOP_ID){
                                                        return <div key={index}>{ projectTransmission.note }</div>
                                                    }
                                                    else return transmissions[projectTransmission.transmissionMethodId] ? transmissions[projectTransmission.transmissionMethodId].name : ''
                                                })
                                            : ''
                                        ) 
                                        : (
                                            commercialTransmissionMethodList
                                                ? renderTransmissions(commercialTransmissionMethodList)
                                                : 1
                                        )
                                )
                                : (
                                    commercialTransmissionMethodList
                                        ? renderTransmissions(commercialTransmissionMethodList)
                                        : 1
                                ),
                                icon: <TransformIcon />
                    },
                    {
                        name: 'Phạm vi thương mại hóa',
                        value: scope,
                        icon: < CorporateFareIcon />
                    },
                    {
                        name: 'Chào giá tham khảo',
                        value: price,
                        icon: <MonetizationOnIcon />
                    },
                    {
                        name: '',
                        value: (
                            <button 
                                className="p-4 text-white bg-green-500 rounded-lg"
                                onClick={(e) => onBtnContactClick(project)}
                            >
                                Liên hệ ngay
                            </button>
                        ),
                        icon: <MonetizationOnIcon />
                    }
                ]
            },
            solutionInfo: {
                children: [
                    {
                        name: 'Mô tả quy trình công nghệ',
                        value: process,
                        isUseEditor: true,
                        icon: ''
                        
                    },
                    {
                        name: 'Ưu điểm',
                        value: advantage,
                        isUseEditor: true,
                        icon: ''
                    },
                ]
            }
        },
        researching: {
            generalInfo: {
                children: [
                    {
                        name: 'Tên đơn vị',
                        value: companyName,
                        isUseEditor: false,
                        icon: <LocationCityIcon />
                    },
                    {
                        name: 'Địa chỉ',
                        value: address,
                        isUseEditor: false,
                        icon: <AddLocationAltIcon />
                    },
                    {
                        name: 'Số điện thoại',
                        value: phoneNumber,
                        isUseEditor: false,
                        icon: <PhoneAndroidIcon />
                    },
                    {
                        name: 'Email',
                        value: email,
                        isUseEditor: false,
                        icon: <EmailIcon />
                    },
                    {
                        name: 'Website',
                        value: website,
                        isUseEditor: false,
                        icon: <HttpIcon />
                    },
                    {
                        name: 'Lĩnh vực áp dụng',
                        value: type === TYPE_TEMPLATE_PREVIEW 
                            ? (
                                project.fieldId
                                ? renderFieldsPreview(project.fieldId) // Backend truyền là fieldId - Đừng sửa
                                : null
                            )
                            : projectFieldList.map((field, index) => {
                                return <span key={index}>{field.field.name}</span>
                            }),
                            icon: <BiotechIcon />
                    }
                ]
            },
            solutionInfo: {
                children: [
                    {
                        name: 'Mô tả thách thức',
                        value: challenge,
                        isUseEditor: true,
                        icon: ''
                        
                    },
                    {
                        name: 'Mô tả giải pháp',
                        value: solution,
                        isUseEditor: true,
                        icon: ''
                    },
                    {
                        name: 'Mô tả lợi ích',
                        value: benefit,
                        isUseEditor: true,
                        icon: ''
                    },
                    
                ]
            }
        },
        
    }

    const renderBody = (items) => {
       
        return (
            <section>
                <div className="">
                    { renderContent(items.children) }
                </div>
            </section>
        )
    }

    const renderBodyMobile = (items) => {
       
        return (
            <section className="-ml-6">
                <div className="">
                    { renderContentMobile(items.children) }
                </div>
            </section>
        )
    }

    
    return (
        <>
            <div className="">
                <div className="my-3 text-center md:text-left">
                    <div 
                        className="grid grid-cols-1 p-8 -mt-3"
                        style={{ backgroundImage: `linear-gradient(rgba(194, 179, 199, 0.9), rgba(123, 121, 123, 0.9)), url(${productImage})` }}
                    >
                        <section className="z-10 flex flex-col items-center w-2/3 gap-4 mx-auto text-center">
                            <div className="text-3xl font-bold">
                                { name } <br />
                            </div>
                            <div className="text-base">
                                { shortDescription }
                            </div>
                        </section>
                        {/* <section className="relative z-0 opacity-50 bg-opacity-10 ">
                            <img src={Test2} alt={Test2} className="object-cover w-full h-64" />
                        </section> */}
                    </div>
                </div>
                {/* <div className="grid grid-cols-4 gap-4 p-4"> */}

                
                
                {type === TYPE_TEMPLATE_PREVIEW
                    ?(
                        <div className="grid grid-flow-col grid-cols-4 gap-4 p-4 auto-cols-max">
                            <div id="project_navbar" className="flex-col hidden col-span-1 rounded-lg lg:flex">
                                { renderBody(
                                    project 
                                    ?(projectType === TYPE_COMMERCIAL 
                                        ? templateViewProject.commercial.generalInfo 
                                        : templateViewProject.researching.generalInfo) 
                                    : null) }
                            </div>
                            <div id="project_content" className="col-span-3 ml-6">
                                { renderBody(
                                    project 
                                    ? (projectType === TYPE_COMMERCIAL 
                                        ? templateViewProject.commercial.solutionInfo 
                                        : templateViewProject.researching.solutionInfo) 
                                    : null) 
                                }
                                { renderBodyMobile(
                                            project 
                                            ? (project.type === TYPE_COMMERCIAL 
                                                ? templateViewProject.commercial.generalInfo 
                                                : templateViewProject.researching.generalInfo) 
                                            : null
                                        )  
                                }
                            </div>
                    </div>
                    ): (
                        <div className="grid grid-flow-col grid-cols-4 gap-4 p-4 auto-cols-max">
                            <div id="project_navbar_web" className="flex-col hidden col-span-1 mx-4 rounded-lg lg:flex">
                                { renderBody(
                                    project 
                                    ?(project.type === TYPE_COMMERCIAL 
                                        ? templateViewProject.commercial.generalInfo 
                                        : templateViewProject.researching.generalInfo) 
                                    : null) }
                            </div>
                            <div id="project_content" className="flex flex-col col-span-4 gap-2 ml-6">
                                { renderBody(
                                    project 
                                    ? (project.type === TYPE_COMMERCIAL 
                                        ? templateViewProject.commercial.solutionInfo 
                                        : templateViewProject.researching.solutionInfo) 
                                    : null) 
                                }
                                { renderBodyMobile(
                                        project 
                                        ? (project.type === TYPE_COMMERCIAL 
                                            ? templateViewProject.commercial.generalInfo 
                                            : templateViewProject.researching.generalInfo) 
                                        : null
                                    )  
                                }
                            </div>
                            
                        </div>
                    )
                }
               
            </div>
        </>
        
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        fields: state.fields,
        levels: state.levels,
        transmissions: state.transmissions, 
    };
};
export default connect(
    mapStateToProps,
    { createCustomerContact }
  )(ProjectShow);