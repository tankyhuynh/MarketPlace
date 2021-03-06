import React from 'react';


import img1_a from '../../../assets/img1_a.png';
import img1_b from '../../../assets/img1_b.png';
import img2_a from '../../../assets/img2_a.png';
import img2_b from '../../../assets/img2_b.png';
import img3_a from '../../../assets/img3_a.jpg';
import img3_b from '../../../assets/img3_b.png';
import img5_a from '../../../assets/img5_a.jpg';
import img5_b from '../../../assets/img5_b.png';
import logo from '../../../assets/logo.png';

const ProjectShow = ({ project }) => {

    const renderImage = (image) => {
        if(image){
             switch(image){
                 case "img1_a": return img1_a;
                 case "img1_b": return img1_b;
                 case "img2_a": return img2_a;
                 case "img2_b": return img2_b;
                 case "img3_a": return img3_a;
                 case "img3_b": return img3_b;
                 case "img5_a": return img5_a;
                 case "img5_b": return img5_b;
                 default: return image;
             }
        }
        return logo;
     }

    const renderImageSrc = (hinhAnh) => {
        if( hinhAnh ){
            if(hinhAnh.length === 2){
                return hinhAnh[0];
            }
            else return hinhAnh;
        }
    };

    const renderImages = (images) => {
        if(images){
            return images.map(image => {
                return (
                    <span className="w-32" key={image}>
                        <img 
                            src={renderImage(renderImageSrc(image))}
                            alt={renderImage(renderImageSrc(image))} 
                            className="transition duration-500 transform rounded-lg hover:scale-150"
                        />
                        {/* <ReactSlickIntegration image={renderImage(renderImageSrc(image))} /> */}
                    </span>
                );
            });
        }
    };

    const renderInternalLinks = (links) => {
        return links.map(link => {
            return (
                <a 
                    href={`#${link.name}`} 
                    className="block italic text-link"
                >
                    {link.name}
                </a>
            );
        })
    };

    const renderContent = (items) => {
        return items.map(item => {
            return (
                <div id={item.name} className="flex flex-col">
                    <span className="mt-4 text-lg font-medium">{`${item.name}: `}</span>
                    <span className="">
                        { item.isUseEditor 
                            ? <span dangerouslySetInnerHTML={{ __html: item.value }}  /> 
                            : item.value  
                        }
                    </span>
                </div>
            );
        })
    };

    const {
        companyName,
        address,
        phoneNumber,
        email,
        website,
        name,
        // user,
        // author,
        field,
        // status,
        process,
        advantage,
        levelDevelopment,
        transmissionMethod,
        scope,
        price,
        image 
    } = project;

    const templateViewProject = {
        generalInfo: {
            root: {
                nodeId: 0,
                name: 'Th??ng tin chung ',
                value: ''
            },
            children: [
                {
                    nodeId: 1,
                    name: 'T??n ????n v???',
                    value: companyName,
                    isUseEditor: false
                },
                {
                    nodeId: 2,
                    name: '?????a ch???',
                    value: address,
                    isUseEditor: false
                },
                {
                    nodeId: 3,
                    name: 'S??? ??i???n tho???i',
                    value: phoneNumber,
                    isUseEditor: false
                },
                {
                    nodeId: 4,
                    name: 'Email',
                    value: email,
                    isUseEditor: false
                },
                {
                    nodeId: 5,
                    name: 'Website',
                    value: website,
                    isUseEditor: false
                }
            ]
        },
        solutionInfo: {
            root: {
                nodeId: 6,
                name: 'Th??ng tin v??? gi???i ph??p, s???n ph???m',
                value: ''
            },
            children: [
                {
                    nodeId: 7,
                    name: 'T??n gi???i ph??p, s???n ph???m, c??ng ngh???, thi???t b???',
                    value: name
                },
                {
                    nodeId: 8,
                    name: 'M?? t??? quy tr??nh c??ng ngh???',
                    value: process,
                    isUseEditor: true
                    
                },
                {
                    nodeId: 9,
                    name: 'L??nh v???c ??p d???ng',
                    value: field.name
                },
                {
                    nodeId: 10,
                    name: '??u ??i???m',
                    value: advantage,
                    isUseEditor: true
                },
                {
                    nodeId: 11,
                    name: 'M???c ????? ph??t tri???n',
                    value: levelDevelopment ? levelDevelopment.name : 1
                },
                {
                    nodeId: 12,
                    name: 'Ph????ng th???c chuy???n giao',
                    value: transmissionMethod ? transmissionMethod.name : 1
                },
                {
                    nodeId: 13,
                    name: 'Ph???m vi th????ng m???i h??a',
                    value: scope
                },
                {
                    nodeId: 14,
                    name: 'Ch??o gi?? tham kh???o',
                    value: price
                },
                {
                    nodeId: 15,
                    name: 'H??nh ???nh t???ng th???',
                    value: (
                        <div className="flex items-center gap-16 mt-2">
                            { renderImages(image) }
                        </div>
                    )
                }
            ]
        }
    }

    const renderNavbar = () => {
        return Object.values(templateViewProject).map((component, index) => {
            return (
                <section key={index} className="mt-2">
                    <span className="text-xl font-bold">
                        {component.root.name}
                    </span>
                    <div className="flex flex-col gap-1 ml-8">
                        {renderInternalLinks(component.children)}
                    </div>
                </section>
            )
        })
    }

    const renderBody = () => {
        return Object.values(templateViewProject).map((component, index) => {
            return (
                <section key={index}>
                    <div className="text-2xl font-bold">
                        { component.root.name }
                    </div>
                    <div className="">
                        { renderContent(component.children) }
                    </div>
                </section>
            )
        })
    }
    
    return (
        <>
            <div className="my-3 text-3xl font-bold text-center md:text-left">
                { name }
            </div>
            <div className="grid h-screen grid-cols-4 p-4">
                <div id="project_navbar" className="flex-col hidden col-span-1 mx-4 rounded-lg lg:flex">
                    { renderNavbar() }
                </div>
                <div id="project_content" className="col-span-3 ml-6">
                    { renderBody() }
                </div>
            </div>
        </>
    )
}

export default ProjectShow;