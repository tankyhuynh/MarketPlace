import './template.css'

import React from 'react';


// import img1_a from '../../../assets/img1_a.png';
// import img1_b from '../../../assets/img1_b.png';
// import img2_a from '../../../assets/img2_a.png';
// import img2_b from '../../../assets/img2_a.png';
// import img3_a from '../../../assets/img3_a.jpg';
// import img3_b from '../../../assets/img3_b.png';
// import img5_a from '../../../assets/img5_a.jpg';
// import img5_b from '../../../assets/img5_b.png';
// import logo from '../../../assets/logo.png';
// import Test1 from '../../../assets/Grapes_Red.jpg';
// import Test2 from '../../../assets/sugarcane-sugar-200611.jpg';

// import MainBackgroundImage from '../../../assets/Grapes_Red.jpg'


const ProjectShow = ({ project }) => {

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
        return items.map(item => {
            return (
                <div id={item.name} className="flex flex-col font-Roboto">
                    <span className="mt-4 text-xl font-medium">{`${item.name} `}</span>
                        { item.isUseEditor 
                            ? <span dangerouslySetInnerHTML={{ __html: item.value }}  /> 
                            : item.value  
                        }
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
        shortDescription,
        // user,
        // author,
        projectFieldList,
        // status,
        process,
        advantage,
        commercialDevelopmentLevelList,
        commercialTransmissionMethodList,
        scope,
        price,
        productImage 
    } = project;

    const templateViewProject = {
        generalInfo: {
            root: {
                name: 'Thông tin chung ',
                value: ''
            },
            children: [
                {
                    name: 'Tên đơn vị',
                    value: companyName,
                    isUseEditor: false
                },
                {
                    name: 'Địa chỉ',
                    value: address,
                    isUseEditor: false
                },
                {
                    name: 'Số điện thoại',
                    value: phoneNumber,
                    isUseEditor: false
                },
                {
                    name: 'Email',
                    value: email,
                    isUseEditor: false
                },
                {
                    name: 'Website',
                    value: website,
                    isUseEditor: false
                },
                {
                    name: 'Lĩnh vực áp dụng',
                    value: (
                        projectFieldList.map(field => {
                            return <span>{field.field.name}</span>
                        })
                    )
                },
                {
                    name: 'Mức độ phát triển',
                    value: commercialDevelopmentLevelList ? (
                        commercialDevelopmentLevelList.map(level => {
                            return <span>{level.developmentLevel.name}</span> 
                        })
                    ) : 1
                },
                {
                    name: 'Phương thức chuyển giao',
                    value: commercialTransmissionMethodList ? (
                        commercialTransmissionMethodList.map(transmission => {
                            return <span>{transmission.transmissionMethod.name}</span> 
                        })
                    ) : 1
                },
                {
                    name: 'Phạm vi thương mại hóa',
                    value: scope
                },
                {
                    name: 'Chào giá tham khảo',
                    value: price
                }
            ]
        },
        solutionInfo: {
            children: [
                {
                    name: 'Mô tả quy trình công nghệ',
                    value: process,
                    isUseEditor: true
                    
                },
                {
                    name: 'Ưu điểm',
                    value: advantage,
                    isUseEditor: true
                },
                {
                    name: '',
                    value: (
                        <>
                            <img src={productImage} alt={productImage} className="object-cover w-full h-64" />
                            <section className="italic text-center">Hình ảnh sản phẩm</section>
                        </>
                    ),
                    isUseEditor: false
                },
                // {
                //     name: 'Hình ảnh tổng thể',
                //     value: (
                //         <div className="flex items-center gap-16 mt-2">
                //             <img src={productImage} alt={productImage} />
                //         </div>
                //     )
                // }
            ]
        }
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
    
    return (
        <div >
            <div className="my-3 text-center md:text-left">
                <div 
                    className="grid grid-cols-1 p-8 -mt-3 -mx-28"
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
            <div className="grid h-screen grid-cols-4 gap-4 p-4">
                <div id="project_navbar" className="flex-col hidden col-span-1 mx-4 rounded-lg lg:flex">
                    { renderBody(templateViewProject.generalInfo) }
                </div>
                <div id="project_content" className="col-span-3 ml-6">
                    { renderBody(templateViewProject.solutionInfo) }
                </div>
            </div>
        </div>
        
    )
}

export default ProjectShow;