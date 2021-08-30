/* eslint-disable react-hooks/exhaustive-deps */
import './ProjectShow.css'

import React, { useEffect } from 'react';

// import ReactSlickIntegration from '../ImageHoverZoom/ReactSlickIntegration';

const ProjectPreview =  ({ project, type }) => {

    useEffect(() => {
        console.log('ProjectPreview', project);
    }, [])

    // const renderImage = (image) => {
    //     switch(image){
    //         case "img1_a": return img1_a;
    //         case "img1_b": return img1_b;
    //         case "img2_a": return img2_a;
    //         case "img2_b": return img2_b;
    //         case "img3_a": return img3_a;
    //         case "img3_b": return img3_b;
    //         case "img5_a": return img5_a;
    //         case "img5_b": return img5_b;
    //         default: return null;
    //     }
    // }

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
    //                     {/* <ReactSlickIntegration image={renderImage(renderImageSrc(image))} /> */}
    //                 </span>
    //             );
    //         });
    //     }
    // };

    // const renderChildren = (items) => {
    //     return items.map(item => {
    //         return (
    //             <a 
    //                 href={`#${item.name}`} 
    //                 className="block italic text-link"
    //                 key={item.name}
    //             >
    //                 {item.name}
    //             </a>
    //         );
    //     })
    // };

    const renderContent = (items) => {
        return items.map(item => {
            return (
                <div id={item.name} className="mt-2" key={item.name}>
                    <span className="mt-4 text-lg font-bold">{`${item.name}: `}</span>
                    { item.isUseEditor ?  <div dangerouslySetInnerHTML={{ __html: item.value }} /> :  item.value  }
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
        // shortDescription,
        // user,
        // author,
        field, // Lĩnh vực phát triển
        // status, // Lưu nháp 0-ko lưu, 1-lưu nháp, 2-chờ duyệt, 3...
        process,
        advantage,
        levelDevelopment,
        transmissionMethod,
        scope,
        price,
        // hinhAnhTongThe: hinhAnhTongThe,

        thachThuc,
        giaiPhap,
        loiIch,
        fileDuAn
    } = project

    const renderTree_ThongTinChung = {
        root: {
            nodeId: 0,
            name: 'Thông tin chung ',
            value: ''
        },
        children: [
            {
                nodeId: 1,
                name: 'Tên đơn vị',
                value: companyName
            },
            {
                nodeId: 2,
                name: 'Địa chỉ',
                value: address
            },
            {
                nodeId: 3,
                name: 'Số điện thoại',
                value: phoneNumber
            },
            {
                nodeId: 4,
                name: 'Email',
                value: email
            },
            {
                nodeId: 5,
                name: 'Website',
                value: website
            }
        ]
        

    };
    
    const renderTree_ThongTinGiaiPhap_ThuongMai = {
        root: {
            name: 'Thông tin về giải pháp, sản phẩm',
            value: '',
            isUseEditor: 0
        },
        children: [
            {
                name: 'Tên giải pháp, sản phẩm, công nghệ, thiết bị',
                value: name,
                isUseEditor: 0
            },
            {
                name: 'Mô tả quy trình công nghệ',
                value: process,
                isUseEditor: 1
            },
            {
                name: 'Lĩnh vực áp dụng',
                value: field,
                isUseEditor: 0
            },
            {
                name: 'Ưu điểm',
                value: advantage,
                isUseEditor: 1
            },
            {
                name: 'Mức độ phát triển',
                value: levelDevelopment,
                isUseEditor: 0
            },
            {
                name: 'Phương thức chuyển giao',
                value: transmissionMethod,
                isUseEditor: 0
            },
            {
                name: 'Phạm vi thương mại hóa',
                value: scope,
                isUseEditor: 0
            },
            {
                name: 'Chào giá tham khảo',
                value: price,
                isUseEditor: 0
            },
            {
                name: 'Hình ảnh tổng thể',
                value: (
                    <div className="flex items-center gap-16 mt-2">
                        {/* { renderImages(hinhAnhTongThe) } */}
                    </div>
                ),
                isUseEditor: 0
            }
    
        ]
    }
    const renderTree_ThongTinGiaiPhap_NghienCuu = {
        root: {
            name: 'Thông tin về giải pháp, sản phẩm',
            value: '',
            isUseEditor: 0
        },
        children: [
            {
                name: 'Tên giải pháp, sản phẩm, công nghệ, thiết bị',
                value: name,
                isUseEditor: 0
            },
            {
                name: 'Lĩnh vực áp dụng',
                value: field,
                isUseEditor: 0
            },
            {
                name: 'Thách thức',
                value: thachThuc,
                isUseEditor: 1
            },
            {
                name: 'Giải pháp',
                value: giaiPhap,
                isUseEditor: 1
            },
            {
                name: 'Lợi ích',
                value: loiIch,
                isUseEditor: 1
            },
            {
                name: 'File dự án',
                value: fileDuAn,
                isUseEditor: 1
            }
        ]
    }

    const renderTree_ThongTinGiaiPhap =  (type === 0) ? renderTree_ThongTinGiaiPhap_ThuongMai : renderTree_ThongTinGiaiPhap_NghienCuu;
        
    return (
        <div className="grid grid-cols-4 p-4">
            {/* <div 
                id="project_navbar" 
                className="flex-col hidden col-span-1 border-2 border-gray-500 rounded-lg lg:flex"
            >
                <div className="fixed w-1/5 px-4">
                    <section className="mt-2">
                        <span className="text-xl font-bold">
                            {renderTree_ThongTinChung.root.name}
                        </span>
                        <div className="flex flex-col gap-1 ml-8">
                            {renderChildren(renderTree_ThongTinChung.children)}
                        </div>
                    </section>
                    <section className="mt-2">
                        <span className="text-xl font-bold">
                            {renderTree_ThongTinGiaiPhap.root.name}
                        </span>
                        <div className="flex flex-col gap-1 ml-8">
                            {renderChildren(renderTree_ThongTinGiaiPhap.children)}
                        </div>
                    </section>
                </div>

            </div> */}
            <div 
                id="project_content" 
                className="col-span-3 ml-6"
            >
                <div id="thong_tin_chung">
                    <div className="text-xl font-bold">
                        { renderTree_ThongTinChung.root.name }
                    </div>
                    <div className="ml-10">
                        { renderContent(renderTree_ThongTinChung.children) }
                    </div>
                </div>
                <div 
                    id="thong_tin_giai_phap"
                    className="mt-6"
                >
                    <div className="text-xl font-bold">
                        { renderTree_ThongTinGiaiPhap.root.name }
                    </div>
                    <div className="ml-10">
                        { renderContent(renderTree_ThongTinGiaiPhap.children) }
                    </div>
                </div>
            </div>
        </div>
    );
  }

export default ProjectPreview;
