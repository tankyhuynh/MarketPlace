import './ProjectShow.css'

import React from 'react';

import { connect } from 'react-redux';
import { fetchProject } from '../../actions';

// import ReactSlickIntegration from '../ImageHoverZoom/ReactSlickIntegration';

import img1_a from '../../assets/img1_a.png';
import img1_b from '../../assets/img1_b.png';
import img2_a from '../../assets/img2_a.png';
import img2_b from '../../assets/img2_b.png';
import img3_a from '../../assets/img3_a.jpg';
import img3_b from '../../assets/img3_b.png';
import img5_a from '../../assets/img5_a.jpg';
import img5_b from '../../assets/img5_b.png';

class ProjectShow extends React.Component {

    componentDidMount() {
        console.log('this.props.match.params.id', this.props.match.params.id);
        this.props.fetchProject(this.props.match.params.id);
    }

    render() {
        if (!this.props.project) {
            return <div>Loading...</div>;
        }

        // const renderPTCGiao = (ptcgs) => {
        //     if(ptcgs){
        //         return ptcgs.map(ptcg => {
        //             return <div>- {ptcg}</div>
        //         })
        //     }
        // }
        // const renderPVTMHoa = (pvtmhs) => {
        //     if(pvtmhs){
        //         return pvtmhs.map(pvtmh => {
        //             return <div>- {pvtmh}</div>
        //         })
        //     }
        // }
        // const renderUuDiem = (uuDiems) => {
        //     if(uuDiems){
        //         return uuDiems.map(uuDiem => {
        //             return <div>- {uuDiem}</div>
        //         })
        //     }
        // }
        const renderImage = (image) => {
            switch(image){
                case "img1_a": return img1_a;
                case "img1_b": return img1_b;
                case "img2_a": return img2_a;
                case "img2_b": return img2_b;
                case "img3_a": return img3_a;
                case "img3_b": return img3_b;
                case "img5_a": return img5_a;
                case "img5_b": return img5_b;
                default: return null;
            }
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
                        <span className="w-32">
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
    
        // const renderAuthors = (authors) => {
        //     if(authors){
        //         return authors.map((author, index) => {
        //             console.log('author index: ', index, 'length: ', authors.length);
        //             if(index < authors.length -1){
        //                     return <span>{`${author}, `}</span>;    
        //             }
        //             return <span>{`${author}`}</span>;    
        //         })
        //     }
        // };
    
        // const renderTreeItem  = (items) => {
        //     return items.map(item => {
        //         return (
        //             <a href={`#${item.name}`} >
        //                 <TreeItem nodeId={item.nodeId} label={item.name} />
        //             </a>
        //         );
        //     })
        // };

        const renderChildren = (items) => {
            return items.map(item => {
                return (
                    <a 
                        href={`#${item.name}`} 
                        className="block italic text-link"
                    >
                        {item.name}
                    </a>
                );
            })
        };
    
        const renderContent = (items) => {
            return items.map(item => {
                return (
                    <div id={item.name} className="mt-2">
                        <span className="mt-4 text-lg font-bold">{`${item.name}: `}</span>
                        { item.value }
                    </div>
                );
            })
        };

        const {
            tenDV, 
            // author, 
            address, 
            phone, 
            email, 
            website, 
            ten,
            quyTrinh, 
            lvApDung, 
            uuDiem, 
            mucDoPhatTrien,
            phuongThucChuyenGiao,
            phamViThuongMai,
            chaoGiaThamKhao,
            hinhAnhTongThe 
        } = this.props.project;

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
                    value: tenDV
                },
                {
                    nodeId: 2,
                    name: 'Địa chỉ',
                    value: address
                },
                {
                    nodeId: 3,
                    name: 'Số điện thoại',
                    value: phone
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
        
        const renderTree_ThongTinGiaiPhap = {
            root: {
                nodeId: 6,
                name: 'Thông tin về giải pháp, sản phẩm',
                value: ''
            },
            children: [
                {
                    nodeId: 7,
                    name: 'Tên giải pháp, sản phẩm, công nghệ, thiết bị',
                    value: ten
                },
                {
                    nodeId: 8,
                    name: 'Mô tả quy trình công nghệ',
                    value: quyTrinh
                },
                {
                    nodeId: 9,
                    name: 'Lĩnh vực áp dụng',
                    value: lvApDung
                },
                {
                    nodeId: 10,
                    name: 'Ưu điểm',
                    value: uuDiem
                },
                {
                    nodeId: 11,
                    name: 'Mức độ phát triển',
                    value: mucDoPhatTrien
                },
                {
                    nodeId: 12,
                    name: 'Phương thức chuyển giao',
                    value: phuongThucChuyenGiao
                },
                {
                    nodeId: 13,
                    name: 'Phạm vi thương mại hóa',
                    value: phamViThuongMai
                },
                {
                    nodeId: 14,
                    name: 'Chào giá tham khảo',
                    value: chaoGiaThamKhao
                },
                {
                    nodeId: 15,
                    name: 'Hình ảnh tổng thể',
                    value: (
                        <div className="flex items-center gap-16 mt-2">
                            { renderImages(hinhAnhTongThe) }
                        </div>
                    )
                }
        
            ]
        }

   

    return (
        <div className="grid h-screen grid-cols-4 p-4">
            <div 
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

            </div>
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
}

const mapStateToProps = (state, ownProps) => {
  return { project: state.projects[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchProject }
)(ProjectShow);
