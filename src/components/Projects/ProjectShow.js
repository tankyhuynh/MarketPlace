import './ProjectShow.css'

import React from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../../actions';

import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png';

class ProjectShow extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchProject(this.props.match.params.id);
  }

  render() {
    if (!this.props.project) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.project;

    return (
      <div>
        <div id="title" className="mt-4 mb-6 text-xl font-bold text-center">
            Chế phẩm vi sinh chịu mặn dùng cho cây trồng trên nền đất nhiễm mặn và quy trình sản xuất chế phẩm này
        </div>
        <div id="content" class="flex gap-14">
            <div id="content-left" className="flex flex-col justify-around gap-4">
                <div className="">
                    <span className="title">
                        Lĩnh vực áp dụng: 
                    </span>
                    <span>Nông nghiệp</span>
                </div>
                <div className="">
                    <span className="title">
                        Mức độ phát triển:
                    </span>
                    <span>Sản xuất thử nghiệm</span>
                </div>
                <div className="">
                    <span className="title">
                        Phương thức chuyển giao:
                    </span>
                    <span>Chuyển giao con giống và quy trình sản xuất với hình thức không độc quyền</span>
                </div>
                <div className="">
                    <span className="title">
                        Phạm vi thương mại hóa:
                    </span>
                    <div className="flex flex-col">
                        <span>- Các Trung Tâm Khuyến Nông, Sở Nông Nghiệp và Phát Triển Nông Thôn</span>
                        <span>- Các cơ quan, tổ chức, công ty về phân bón vi sinh và chế phẩm sinh học.</span>
                    </div>
                </div>
                <div className="">
                    <span className="title">
                        Chào giá tham khảo:
                    </span>
                    <span>Liên hệ</span>
                </div>

                <div id="images-left" className="flex items-center gap-10">
                    <div className="w-32">
                        <img src={img1} alt={img1} />
                    </div>
                    <div className="w-32">
                        <img src={img2} alt={img2} />
                    </div>
                </div>

                <div>
                    <div>
                        <span className="title">
                            Tên đơn vị/doanh nghiệp:
                        </span>
                        <span>Nguyễn Khởi Nghĩa</span>
                    </div>
                    <div>
                        <span className="title">
                            Địa chỉ:
                        </span>
                        <span>Bộ môn Khoa Học Đất, khoa Nông nghiệp, trường Đại học Cần Thơ</span>
                    </div>
                    <div>
                        <span className="title">
                            Số điện thoại:
                        </span>
                        <span>0932 801 727</span>
                    </div>
                    <div>
                        <span className="title">
                            Email:
                        </span>
                        <span>nknghia@ctu.edu.vn</span>
                    </div>
                    <div>
                        <span className="title">
                            Website:
                        </span>
                        <span>ctu.edu.vn</span>
                    </div>

                </div>

            </div>
            <div id="content-right" className="">
                <div className="title">Mô tả quy trình công nghệ:</div>
                <div>
                    Chế phẩm vi sinh chịu mặn dùng cho cây trồng trên nền đất nhiễm mặn, chế phẩm này bao gồm các thành phần hỗn hợp: cám gạo có hàm lượng từ 48% đến 54%, đường có hàm lượng từ 3,5% đến 4%; và chất nền có hàm lượng từ 2,5% đến 3% và nước có hàm lượng từ 40% đến 45%.  Chất nền là xỉ than tổ ong đã cố định sẵn các dòng vi khuẩn được chọn từ 5 nhóm vi khuẩn: vi khuẩn cố định đạm Bacillus aquymaris KG6-3, vi khuẩn hòa tan lân Burkholderia cepacia BL1-10 và vi khuẩn tiết hormon thực vật IAA Bacillus megaterium ST2-9, vi khuẩn hòa tan silic Ochrobactrum ciceri TCM_39 và vi khuẩn hòa tan kali Burkholderia vietnamiensis_L1.1.
                </div>
                <div id="images-right" className="flex items-center gap-10 my-4 justify-evenly">
                    <div className="w-32">
                        <img src={img1} alt={img1} />
                    </div>
                    <div className="w-32">
                        <img src={img2} alt={img2} />
                    </div>
                    <div className="w-32">
                        <img src={img3} alt={img3} />
                    </div>
                    <div className="w-32">
                        <img src={img4} alt={img4} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="title">Ưu điểm:</div>
                    <div>
                        - Đóng góp, hỗ trợ và bảo vệ cây trồng nhằm vào công tác giải quyết vấn đề canh tác cây trồng đất nhiễm mặn trong canh tác nông nghiệp do tự nhiên và do biến đổi khí hậu đang diễn biến một cách phức tạp.
                    </div>
                    <div>
                        - Việc sử dụng chế phẩm vi sinh kết hợp với công thức bón phân theo khuyến cáo (100N-60P2O5-30K2O) cho lúa trên nền đất nhiễm mặn ở điều kiện thực tế đồng ruộng có tác dụng làm tăng 13% năng suất lúa so với nghiệm thức bón phân NPK (100N-60P2O5-30K2O) vô cơ theo khuyến cáo, ngoài ra, việc sử dụng chế phẩm vi sinh này giúp giảm 20% lượng phân bón NPK theo khuyến cáo nhưng năng suất lúa vẫn cho tương đương với nghiệm thức bón phân NPK theo khuyến cáo.
                    </div>
              
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
