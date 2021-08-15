import './ProjectShow.css'

import React from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../../../actions';

import img1_a from '../../../assets/img1_a.png';
import img1_b from '../../../assets/img1_b.png';
import img2_a from '../../../assets/img2_a.png';
import img2_b from '../../../assets/img2_b.png';
import img3_a from '../../../assets/img3_a.jpg';
import img3_b from '../../../assets/img3_b.png';
import img5_a from '../../../assets/img5_a.jpg';
import img5_b from '../../../assets/img5_b.png';

class ProjectShow extends React.Component {
  componentDidMount() {
    console.log('this.props.match.params.id', this.props.match.params.id);
    this.props.fetchProject(this.props.match.params.id);
  }

  render() {
    if (!this.props.project) {
      return <div>Loading...</div>;
    }

    const {
         ten, 
         author, 
         address, 
         phone, 
         email, 
         website, 
         quyTrinh, 
         lvApDung, 
         uuDiem, 
         mucDoPhatTrien,
         phuongThucChuyenGiao,
         phamViThuongMai,
         chaoGiaThamKhao,
         hinhAnhTongThe 
    } = this.props.project;

    const renderPTCGiao = (ptcgs) => {
        if(ptcgs){
            return ptcgs.map(ptcg => {
                return <div>- {ptcg}</div>
            })
        }
    }
    const renderPVTMHoa = (pvtmhs) => {
        if(pvtmhs){
            return pvtmhs.map(pvtmh => {
                return <div>- {pvtmh}</div>
            })
        }
    }
    const renderUuDiem = (uuDiems) => {
        if(uuDiems){
            return uuDiems.map(uuDiem => {
                return <div>- {uuDiem}</div>
            })
        }
    }
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

    const renderImages = (images) => {
        if(images){
            return images.map(image => {
                return (
                    <div className="w-32">
                        <img src={renderImage(image)} alt={renderImage} />
                    </div>
                );
            });
        }
    };

    const renderAuthors = (authors) => {
        if(authors){
            return authors.map((author, index) => {
                console.log('author index: ', index, 'length: ', authors.length);
                if(index < authors.length -1){
                        return <span>{`${author}, `}</span>;    
                }
                return <span>{`${author}`}</span>;    
            })
        }
    };

    return (
      <div className="mx-4">
        <div id="title" className="mt-4 mb-6 text-xl font-bold text-center ">
            {ten}
        </div>
        <div id="content" class="flex flex-col-reverse xl:flex-row md:gap-6">
            <div id="content-left" className="flex flex-col justify-around gap-4">
                <div className="">
                    <span className="title">
                        {`Lĩnh vực áp dụng: `}
                    </span>
                    <span>{ lvApDung }</span>
                </div>
                <div className="">
                    <span className="title">
                        {`Mức độ phát triển: `}
                    </span>
                    <span>{ mucDoPhatTrien }</span>
                </div>
                <div className="">
                    <span className="title">
                        {`Phương thức chuyển giao: `}
                    </span>
                    <span>{ renderPTCGiao(phuongThucChuyenGiao) }</span>
                </div>
                <div className="">
                    <span className="title">
                        {`Phạm vi thương mại hóa: `}
                    </span>
                    <div className="flex flex-col">
                        { renderPVTMHoa(phamViThuongMai) }
                    </div>
                </div>
                <div className="">
                    <span className="title">
                       {` Chào giá tham khảo: `}
                    </span>
                    <span>{ chaoGiaThamKhao }</span>
                </div>

                <div id="images-left" className="flex items-center gap-10">
                   { renderImages(hinhAnhTongThe) }
                </div>

                <div>
                    <div>
                        <span className="title">
                            {`Tên đơn vị/doanh nghiệp: `}
                        </span>
                        <span>{ renderAuthors(author) }</span>
                    </div>
                    <div>
                        <span className="title">
                            {`Địa chỉ: `}
                        </span>
                        <span>{ address }</span>
                    </div>
                    <div>
                        <span className="title">
                            {`Số điện thoại: `}
                        </span>
                        <span>{ phone }</span>
                    </div>
                    <div>
                        <span className="title">
                            {`Email: `}
                        </span>
                        <span>{ email }</span>
                    </div>
                    <div>
                        <span className="title">
                            {`Website: `}
                        </span>
                        <span>{ website }</span>
                    </div>

                </div>

            </div>
            <div id="content-right" className="">
                <div className="title">{`Mô tả quy trình công nghệ: `}</div>
                <div>
                    { quyTrinh }                    
                </div>
                <div id="images-right" className="flex items-center gap-10 my-4 justify-evenly">
                    { renderImages(hinhAnhTongThe) }
                </div>
                <div className="flex flex-col">
                    <div className="title">{`Ưu điểm: `}</div>
                        { renderUuDiem(uuDiem) }
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
