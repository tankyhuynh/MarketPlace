import './Stepper.css'

import React, { useState } from 'react'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QuillEditor from '../editor/QuillEditor';

import environment from '../../environments/environment';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Tab from '../Tab/Tab';



const HorizontalLinearStepper = (props) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [openTab, setOpenTab] = React.useState(0);

  const [tenDN, setTenDN] = useState("")
  const [diaChi, setDiaChi] = useState("")
  const [tacGia, setTacGia] = useState("")
  const [soDienThoai, setSoDienThoai] = useState("")
  const [fax, setFax] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
 
  // Thông tin chung của 2 dự án
  const [tenGP, setTenGP] = useState("")
  const [quyTrinh, setQuyTrinh] = useState("")
  const [linhVuc, setLinhVuc] = useState("")
  
  // Dự án thương mại
  const [uuDiem, setUuDiem] = useState("")
  const [mucDoPhatTrien, setMucDoPhatTrien] = useState("")
  const [phuongThucChuyenGiao, setPhuongThucChuyenGiao] = useState("");
  const [phamViThuongMai, setPhamViThuongMai] = useState("");
  const [chaoGiaThamKhao, setChaoGiaThamKhao] = useState("");
  const [hinhAnhTongThe, setHinhAnhTongThe] = useState("");
  
  // Dự án nghiên cứu
  const [thachThuc, setThachThuc] = useState("")
  const [giaiPhap, setGiaiPhap] = useState("")
  const [loiIch, setLoiIch] = useState("");
  const [fileDuAn, setFileDuAn] = useState("");
  


  const duAnThuongMai = {
    tenDN: tenDN,
    diaChi: diaChi,
    tacGia: tacGia,
    soDienThoai: soDienThoai,
    email: email,
    website: website,
    tenGP: tenGP,
    quyTrinh: quyTrinh,
    linhVuc: linhVuc,
    uuDiem: uuDiem,
    mucDoPhatTrien: mucDoPhatTrien,
    phuongThucChuyenGiao: phuongThucChuyenGiao,
    phamViThuongMai: phamViThuongMai,
    chaoGiaThamKhao: chaoGiaThamKhao,
    hinhAnhTongThe: hinhAnhTongThe
  }
  const duAnNghienCuu = {
    tenDN: tenDN,
    diaChi: diaChi,
    tacGia: tacGia,
    soDienThoai: soDienThoai,
    email: email,
    website: website,
    tenDA: tenGP,
    quyTrinh: quyTrinh,
    linhVuc: linhVuc,
    thachThuc: thachThuc,
    giaiPhap: giaiPhap,
    loiIch: loiIch,
    fileDuAn: fileDuAn
  }
  

  const history = useHistory();

  // Onchange in duAnThuongMai
  const onQuyTrinhChange = (value) => {
      setQuyTrinh(value)
  }
  const onUuDiemChange = (value) => {
      setUuDiem(value)
  }
  const onHinhAnhChange = (event) => {
      setHinhAnhTongThe(event.target.files);
  }

  // Onchange in duAnNghienCuu
  const onThachThucChange = (value) => {
    setThachThuc(value)
  }
  const onGiaiPhapChange = (value) => {
    setGiaiPhap(value)
  }
  const onLoiIchChange = (value) => {
    setLoiIch(value)
  }
  const onFileDuAnChange = (event) => {
      setFileDuAn(event.target.files);
  }

  const resetAllField = () => {
    setTenDN('');
    setDiaChi('');
    setTacGia('');
    setSoDienThoai('');
    setEmail('');
    setWebsite('');
    setTenGP('');
    setQuyTrinh('');
    setLinhVuc('');
    setUuDiem('');
    setMucDoPhatTrien('');
    setPhuongThucChuyenGiao('');
    setPhamViThuongMai('');
    setChaoGiaThamKhao('');
  }


  const onSubmit = (event) => {
    // event.preventDefault();

    resetAllField();

    // if (user.userData && !user.userData.isAuth) {
    //     return alert('Please Log in first');
    // }

    // props.createProject(contentStep1);
    
    axios.post(environment.url.node + '/projects/createProject', duAnThuongMai)
        .then(response => {
            if (response) {
              console.log('response:', response);
                setTimeout(() => {
                    history.push('/projects')
                }, 500);
            }
        })
  }

  // const getSteps = () => {
  //   return ['Nhập các thông tin cơ bản', 'Nhập nội dung', 'Hoàn thành'];
  // }

  const renderStep1 = () => {
    return (
        <>
        <div id="tenDV" className="stepper--field">
            <label className="stepper--label" for="name">
                Tên đơn vị/ doanh nghiệp
            </label>
            <input
                value={tenDN} 
                onChange={(e) => { setTenDN(e.target.value) }}
                className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                id="name" 
                type="text" 
            />
        </div>
        <div id="diaChi" className="stepper--field">
            <label className="stepper--label" for="address">
                Địa chỉ
            </label>
            <input
                value={diaChi}
                onChange={(e) => { setDiaChi(e.target.value) }}
                className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"  
                id="address" 
                type="text" 
            />
        </div>
        <div className="flex justify-between">
            <label className="stepper--label" for="phone">
                Số điện thoại
            </label>
            <input
                value={soDienThoai}
                onChange={(e) => { setSoDienThoai(e.target.value) }} 
                className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                id="phone" 
                type="text" 
            />
        </div>
        <div className="flex justify-between mt-4">
            <label className="stepper--label" for="fax">
                Fax
            </label>
            <input
                value={fax}
                onChange={(e) => { setFax(e.target.value) }} 
                className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                id="fax" 
                type="text" 
            />
        </div>
        
        <div id="email" className="stepper--field">
            <label className="stepper--label" for="email">
                Email
            </label>
            <input
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} 
                className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                id="email" 
                type="text" 
            />
        </div>
        <div id="website" className="stepper--field">
              <label className="stepper--label" for="website">
                  Website
              </label>
              <input
                  value={website}
                  onChange={(e) => { setWebsite(e.target.value) }} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="website" 
                  type="text" 
              />
          </div>
          
        </>
    );
  };

  const renderDuAnThuongMai = () => {
    return (
        <>
            <div id="tenGP" className="stepper--field">
              <label className="stepper--label" for="solution_name">
                  Tên giải pháp, sản phẩm, công nghệ, thiết bị
              </label>
              <input
                  value={tenGP}
                  onChange={(e) => { setTenGP(e.target.value) }} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="solution_name" 
                  type="text" 
              />
            </div>
            <div id="linhVuc" className="stepper--field">
                <label className="stepper--label" for="lvad">
                    Lĩnh vực áp dụng
                </label>
                <input
                    value={linhVuc}
                    onChange={(e) => { setLinhVuc(e.target.value) }}
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="lvad" 
                    type="text" 
                />
            </div>
            <div id="mucDoPhatTrien" className="stepper--field">
                <label className="stepper--label" for="mucDoPhatTrien">
                    Mức độ phát triển
                </label>
                <div className="w-2/3 mr-20">
                    <select 
                        value={mucDoPhatTrien} 
                        onChange={(e) => setMucDoPhatTrien(e.target.value)}
                        className="stepper-combobox"
                    >
                        <option value="mdpt_cong_nghiep">Quy mô công nghiệp</option>
                        <option value="mdpt_thuong_mai">Thương mại hóa</option>
                        <option value="mdpt_thu_nghiem">Sản xuất thử nghiệm</option>
                        <option value="mdpt_khac">Khác</option>
                       
                    </select>
                </div>
                
            </div>
            <div id="phuongThucChuyenGiao" className="stepper--field">
                <label className="stepper--label" for="phuongThucChuyenGiao">
                    Phương thức chuyển giao
                </label>
                <div className="w-2/3 mr-20">
                    <select 
                        value={phuongThucChuyenGiao} 
                        onChange={(e) => setPhuongThucChuyenGiao(e.target.value)}
                        className="stepper-combobox"
                    >
                        <option value="mdpt_cong_nghiep">Theo đơn đặt hàng</option>
                        <option value="mdpt_thuong_mai">Bán trực tiếp</option>
                        <option value="mdpt_thu_nghiem">Đào tạo</option>
                        <option value="mdpt_khac">Khác</option>
                    </select>
                </div>          
            </div>

            <div id="quyTrinh" className="stepper--field">
                <label className=" stepper--label" for="qtcn">
                    Mô tả quy trình công nghệ
                </label>
                <div className="w-2/3">
                    <QuillEditor
                        editorId="editor_qtcn"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onQuyTrinhChange}
                        // onFilesChange={onFilesChange}
                        data={quyTrinh}
                    />
                </div>
            </div>
            <div id="uuDiem" className="stepper--field">
                <label className="stepper--label" for="uu_diem">
                    Ưu điểm
                </label>
                <div className="w-2/3">
                    <QuillEditor
                        editorId="editor_uuDiem"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onUuDiemChange}
                        data={uuDiem}
                    />
                </div>
            </div>
            
            <div id="phamViThuongMai" className="stepper--field">
                <label className="stepper--label" for="pvi_thuong_mai">
                    Phạm vi thương mại hóa
                </label>
                <input
                    value={phamViThuongMai}
                    onChange={(e) => { setPhamViThuongMai(e.target.value) }} 
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="pvi_thuong_mai" 
                    type="text" 
                />
            </div>
            <div id="chaoGia" className="stepper--field">
                <label className="stepper--label" for="chao_gia">
                    Chào giá tham khảo
                </label>
                <input
                    value={chaoGiaThamKhao}
                    onChange={(e) => { setChaoGiaThamKhao(e.target.value) }} 
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="chao_gia" 
                    type="text" 
                />
            </div>
            <div id="hinhAnhTongThe" className="stepper--field">
              <label className="stepper--label" for="hinh_anh">
                  Hình ảnh tổng thể
              </label>
              <input
                  onChange={onHinhAnhChange} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="hinh_anh" 
                  type="file" 
                  multiple
              />
            </div>
        </>
    );
  };

  const renderDuAnNghienCuu = () => {
    return (
        <>
            <div className="stepper--field">
              <label className="stepper--label" for="solution_name">
                  Tên giải pháp, sản phẩm, công nghệ, thiết bị
              </label>
              <input
                  value={tenGP}
                  onChange={(e) => { setTenGP(e.target.value) }} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="solution_name" 
                  type="text" 
              />
            </div>
            
            <div className="stepper--field">
                <label className="stepper--label" for="lvad">
                    Lĩnh vực áp dụng
                </label>
                <input
                    value={linhVuc}
                    onChange={(e) => { setLinhVuc(e.target.value) }}
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="lvad" 
                    type="text" 
                />
            </div>
            <div className="stepper--field">
                <label className="stepper--label" for="uu_diem">
                    Thách thức
                </label>
                <div className="w-2/3">
                    <QuillEditor
                        editorId="thac_thuc"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onThachThucChange}
                        data={thachThuc}
                    />
                </div>
            </div>
            <div className="stepper--field">
                <label className="stepper--label" for="uu_diem">
                    Giải pháp
                </label>
                <div className="w-2/3">
                    <QuillEditor
                        editorId="giai_phap"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onGiaiPhapChange}
                        data={giaiPhap}
                    />
                </div>
            </div>
            <div className="stepper--field">
                <label className="stepper--label" for="uu_diem">
                    Lợi ích
                </label>
                <div className="w-2/3">
                    <QuillEditor
                        editorId="loi_ich"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onLoiIchChange}
                        data={loiIch}
                    />
                </div>
            </div>
            <div className="stepper--field">
              <label className="stepper--label" for="hinh_anh">
                  File dự án
              </label>
              <input
                  onChange={onFileDuAnChange} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="file_du_an" 
                  type="file" 
                  multiple
              />
            </div>
            
            </>
    );
  };

  const tabs = [
      {
          title: 'Dự án thương mại',
          content: renderDuAnThuongMai()
      },
      {
          title: 'Dự án nghiên cứu',
          content: renderDuAnNghienCuu()
      }
  ];

  const onOpenedTabChange = (openTab) => {
    setOpenTab(openTab);
  };

  const renderStep2 = () => {
    return (
      <>
        <Tab tabs={tabs} color="red" openTabChange={onOpenedTabChange} />
      </>
    );
  };
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
          console.log('Case 0');
        return renderStep1() ;
      case 1:
        if(openTab === 0){
            console.log('duAnThuongMai', duAnThuongMai); 
        }
        if(openTab === 1){
            console.log('duAnNghienCuu', duAnNghienCuu); 
        }
        return renderStep2();
      case 2:
        if(openTab === 0){
            console.log('Complete with duAnThuongMai', duAnThuongMai); 
        }
        if(openTab === 1){
            console.log('Complete with duAnNghienCuu', duAnNghienCuu); 
        }
        return 'Hoan Thanh';
      default:
        return 'Unknown step';
    }
  }

  const steps = props.steps;

  const isStepOptional = (step) => {
    // return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if(activeStep === steps.length - 1){
      // props.onStepperFinished();
      onSubmit();
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderSteps = () => {
    return (
        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
                stepProps.completed = false;
            }
            return (
                <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
            })}
        </Stepper>
    );
  };

  const renderStepContent = () => {
    return (
        <div>
            {activeStep === steps.length ? (
                    <div>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className="stepper--btn">
                            Reset
                        </Button>
                    </div>
            ) : (
                    <div>
                        <Typography>{getStepContent(activeStep)}</Typography>
                        <div className="flex gap-2 mt-4">
                            <Button 
                                disabled={activeStep === 0} 
                                onClick={handleBack} 
                                className="stepper--btn"
                            >
                                Back
                            </Button>
                            {isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                >
                                    Skip
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
           
                        </div>
                    </div>
                )}
        </div>
    
    );
  };

  return (
    <div className="">
        { renderSteps() } 
        { renderStepContent() }
    </div>
  );
}

export default HorizontalLinearStepper;