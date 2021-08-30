/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './Stepper.css'

import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';


import { 
    fetchProject,
    fetchLevelDevelopments,
    fetchTransmissionMethods 
} from '../../actions';


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
import ProjectPreview from '../Projects/ProjectPreview';




const HorizontalLinearStepper = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [openTab, setOpenTab] = useState(0);

    const [tenDN, setTenDN] = useState('')
    const [user, setUser] = useState('')
    const [diaChi, setDiaChi] = useState('')
    const [tacGia, setTacGia] = useState('')
    const [soDienThoai, setSoDienThoai] = useState('')
    const [fax, setFax] = useState("")
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    
    // Thông tin chung của 2 dự án
    const [tenGP, setTenGP] = useState('')
    const [moTaNgan, setMoTaNgan] = useState('')
    const [quyTrinh, setQuyTrinh] = useState('')
    const [linhVuc, setLinhVuc] = useState('')
    
    // Dự án thương mại
    const [uuDiem, setUuDiem] = useState('')
    const [mucDoPhatTrien, setMucDoPhatTrien] = useState('')
    const [phuongThucChuyenGiao, setPhuongThucChuyenGiao] = useState('');
    const [phamViThuongMai, setPhamViThuongMai] = useState('');
    const [chaoGiaThamKhao, setChaoGiaThamKhao] = useState('');
    const [hinhAnhTongThe, setHinhAnhTongThe] = useState("");
    
    // Dự án nghiên cứu
    const [thachThuc, setThachThuc] = useState("")
    const [giaiPhap, setGiaiPhap] = useState("")
    const [loiIch, setLoiIch] = useState("");
    const [fileDuAn, setFileDuAn] = useState("");
  
    // Lưu nháp 0-ko lưu, 1-lưu nháp, 2-chờ duyệt, 3...
    const [status, setStatus] = useState(1);
    const [files, setFiles] = useState([]);

    const userState = useSelector(state => state.auth.userProfile);


    useEffect(() => {
        console.log('props useeffect: ', props);
        console.log('user useeffect: ', user);

        setMucDoPhatTrien(1);
        setPhuongThucChuyenGiao(1);
        setUser(userState);

        if(props.project){
            // Cách set từng cái này đang work
            setTenDN(props.project.companyName);
            setDiaChi(props.project.address);
            setSoDienThoai(props.project.phoneNumber);
            setFax(props.project.fax);
            setEmail(props.project.email);
            setWebsite(props.project.website);
            setTenGP(props.project.name);
            setMoTaNgan(props.project.shortDescription);
            setQuyTrinh(props.project.process);
            setLinhVuc(props.project.field.name);
            setUuDiem(props.project.advantage);
            setMucDoPhatTrien(props.project.levelDevelopment.id);
            setPhuongThucChuyenGiao(props.project.transmissionMethod.id);
            setPhamViThuongMai(props.project.scope);
            setChaoGiaThamKhao(props.project.price);
            // setHinhAnhTongThe(props.project.images)
        }
     },[])

    useEffect(() => {
        if(status === 2 ){
            onSubmit();   
        }
    },[status])


    const onFilesChange = (files) => {
        setFiles(files)
    }

    const duAnNghienCuu = {
        tenDN: tenDN,
        diaChi: diaChi,
        tacGia: tacGia,
        soDienThoai: soDienThoai,
        email: email,
        website: website,
        tenDA: tenGP,
        linhVuc: linhVuc,
        thachThuc: thachThuc,
        giaiPhap: giaiPhap,
        loiIch: loiIch,
        fileDuAn: fileDuAn
    }

    const duAnThuongMai = {
        companyName: tenDN,
        address: diaChi,
        phoneNumber: soDienThoai,
        email: email,
        website: website,
        name: tenGP,
        shortDescription: moTaNgan,
        user: 1,
        author: 'authors',
        field: 1, // Lĩnh vực phát triển
        status: status, // Lưu nháp 0-ko lưu, 1-lưu nháp, 2-chờ duyệt, 3...
        process: quyTrinh,
        advantage: uuDiem,
        levelDevelopment: mucDoPhatTrien,
        transmissionMethod: phuongThucChuyenGiao,
        scope: phamViThuongMai,
        price: chaoGiaThamKhao,
        hinhAnhTongThe: hinhAnhTongThe
    }


  const history = useHistory();

  // Onchange in duAnThuongMai
    const onQuyTrinhChange = (value) => {
        setQuyTrinh(value)
    }
    const onUuDiemChange = (value) => {
        setUuDiem(value)
    }
    const onHinhAnhChange = (e) => {
        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];

            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("files", file);

            axios.post(environment.url.java + '/fileupload', formData, config)
                .then(response => {
                    console.log('upload iamge: ', response);
                    console.log('reponse.data[0]: ', response.data[0]);
                    if (response.data) {
                        setHinhAnhTongThe(e.target.files);
                    } else {
                        return alert('failed to upload file')
                    }
                })
        }
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


  const onSubmit = (event, status) => {
    // event.preventDefault();

    resetAllField();


    if(props.type === 'create'){
        axios.post(environment.url.java + '/project', duAnThuongMai)
        .then(response => {
            if (response) {
              console.log('client send:', duAnThuongMai);
              console.log('response:', response);
                setTimeout(() => {
                    history.push('/projects')
                }, 500);
            }
        })
    }
    if(props.type === 'edit'){
        axios.put(environment.url.java + '/project', {...duAnThuongMai, user: user})
        .then(response => {
            if (response) {
              console.log('client send:', duAnThuongMai);
              console.log('response:', response);
                setTimeout(() => {
                    history.push('/projects')
                }, 500);
            }
        })
    }
  }

  // const getSteps = () => {
  //   return ['Nhập các thông tin cơ bản', 'Nhập nội dung', 'Hoàn thành'];
  // }

  const renderLevelDevelopments = () => {
        if(props.levels){
            return props.levels.map((level, index) => {
                console.log('index: ', index);
                if(index === 0){
                    return (
                        <option selected value={level.id}>{ level.name }</option>
                    );
                }
                else {
                    return (
                        <option value={level.id}>{ level.name }</option>
                    );
                }
            })
        }

  }
  const renderTransmissionMethods = () => {
        if(props.transmissions){
            return props.transmissions.map((transmission, index) => {
                if(index === 0){
                    return (
                        <option selected value={transmission.id}>{ transmission.name }</option>
                    );
                }
                else {
                    return (
                        <option value={transmission.id}>{ transmission.name }</option>
                    );
                }
            })
        }
  }

  const renderStep1 = () => {
    return (
        <div className="mx-4 lg:mx-auto"    >
            <div id="tenDV" className="stepper--field">
                <label className="stepper--label" htmlFor="name">
                    Tên đơn vị/ doanh nghiệp
                </label>
                <input
                    value={tenDN} 
                    onChange={(e) => { setTenDN(e.target.value) }}
                    className="justify-end w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="name" 
                    type="text" 
                />
            </div>
            <div id="diaChi" className="stepper--field">
                <label className="stepper--label" htmlFor="address">
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
            <div className="stepper--field">
                <label className="stepper--label" htmlFor="phone">
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
            <div className="stepper--field">
                <label className="stepper--label" htmlFor="fax">
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
                <label className="stepper--label" htmlFor="email">
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
                <label className="stepper--label" htmlFor="website">
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
        </div>
    );
  };

  const onLevelDevelopmentChange = (event) => {
    setMucDoPhatTrien(event.target.value)
    console.log(event.target.value);
  }
  const onTransmissionMethodChange = (event) => {
    setPhuongThucChuyenGiao(event.target.value)
    console.log(event.target.value);
  }

  const renderDuAnThuongMai = () => {
    return (
        <>
            <div id="tenGP" className="stepper--field">
              <label className="stepper--label" htmlFor="solution_name">
                  Tên giải pháp, sản phẩm
              </label>
              <input
                  value={tenGP}
                  onChange={(e) => { setTenGP(e.target.value) }} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="solution_name" 
                  type="text" 
              />
            </div>
            <div id="moTaNgan" className="stepper--field">
                <label className="stepper--label" htmlFor="lvad">
                    Mô tả ngắn
                </label>
                <textarea 
                    value={moTaNgan}
                    onChange={(e) => { setMoTaNgan(e.target.value) }}
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="mo_ta_ngan" 
                />
            </div>
            <div id="linhVuc" className="stepper--field">
                <label className="stepper--label" htmlFor="lvad">
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
            <div id="mucDoPhatTrien" className="stepper-combobox">
                <label className="self-center stepper--label" htmlFor="mucDoPhatTrien">
                    Mức độ phát triển
                </label>
                <div className="stepper-combobox--content">
                    <select 
                        value={mucDoPhatTrien}
                        defaultValue={mucDoPhatTrien} 
                        onChange={onLevelDevelopmentChange}
                        className="stepper-combobox--content-select"
                    >
                        
                        { renderLevelDevelopments() }
                       
                    </select>
                </div>
                
            </div>
            <div id="phuongThucChuyenGiao" className="stepper-combobox">
                <label className="self-center stepper--label" htmlFor="phuongThucChuyenGiao">
                    Phương thức chuyển giao
                </label>
                <div className="stepper-combobox--content">
                    <select 
                        defaultValue={props.transmissions[1]}
                        value={phuongThucChuyenGiao} 
                        onChange={onTransmissionMethodChange}
                        className="stepper-combobox--content-select"
                    >
                        { renderTransmissionMethods() }
                    </select>
                </div>          
            </div>

            <div id="quyTrinh" className="stepper--field">
                <label className="stepper--label" htmlFor="qtcn">
                    Mô tả quy trình công nghệ
                </label>
                <div className="w-2/3">
                    <QuillEditor
                        editorId="editor_qtcn"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onQuyTrinhChange}
                        onFilesChange={onFilesChange}
                        data={quyTrinh}
                    />
                </div>
            </div>
            <div id="uuDiem" className="stepper--field">
                <label className="stepper--label" htmlFor="uu_diem">
                    Ưu điểm
                </label>
                <div className="w-2/3">
                    <QuillEditor
                        editorId="editor_uuDiem"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onUuDiemChange}
                        onFilesChange={onFilesChange}
                        data={uuDiem}
                    />
                </div>
            </div>
            
            <div id="phamViThuongMai" className="stepper--field">
                <label className="stepper--label" htmlFor="pvi_thuong_mai">
                    Phạm vi thương mại hóa
                </label>
                <textarea 
                    value={phamViThuongMai}
                    onChange={(e) => { setPhamViThuongMai(e.target.value) }} 
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="pvi_thuong_mai" 
                />
            </div>
            <div id="chaoGia" className="stepper--field">
                <label className="stepper--label" htmlFor="chao_gia">
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
            {/* <div id="hinhAnhTongThe" className="stepper--field">
              <label className="stepper--label" htmlFor="hinh_anh">
                  Hình ảnh tổng thể
              </label>
              <input
                  onChange={onHinhAnhChange} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="hinh_anh" 
                  type="file" 
                  multiple
              />
            </div> */}
        </>
    );
  };

  const renderDuAnNghienCuu = () => {
    return (
        <>
            <div className="stepper--field">
              <label className="stepper--label" htmlFor="solution_name">
                  Tên giải pháp, sản phẩm
              </label>
              <input
                  value={tenGP}
                  onChange={(e) => { setTenGP(e.target.value) }} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="solution_name" 
                  type="text" 
              />
            </div>

            <div id="moTaNgan" className="stepper--field">
                <label className="stepper--label" htmlFor="lvad">
                    Mô tả ngắn
                </label>    
                <textarea 
                    value={moTaNgan}
                    onChange={(e) => { setMoTaNgan(e.target.value) }}
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="mo_ta_ngan" 
                />
            </div>
            
            <div className="stepper--field">
                <label className="stepper--label" htmlFor="lvad">
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
                <label className="stepper--label" htmlFor="uu_diem">
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
                <label className="stepper--label" htmlFor="uu_diem">
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
                <label className="stepper--label" htmlFor="uu_diem">
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
              <label className="stepper--label" htmlFor="hinh_anh">
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

  const renderPreview = () => {
    let projectPreview = {};
    if(openTab === 0){
        console.log('PreviewduAnThuongMai: ', duAnThuongMai);
        projectPreview = duAnThuongMai; 
    }
    if(openTab === 1){
        console.log('PreviewduAnNghienCuu: ', duAnNghienCuu);
        projectPreview = duAnNghienCuu; 
    }
    return (
        <ProjectPreview project={projectPreview} type={openTab}/>
    );
  };

  const tabs = [
      {
          title: 'Dự án thương mại',
          content: renderDuAnThuongMai()
      },
      {
          title: 'Dự án nghiên cứu',
          content: 'Hiện tại tính năng đang phát triển'
        //   content: renderDuAnNghienCuu()
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
        return renderPreview();
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

  // Save nháp
   const onSaveTemp = () => {
    console.log('status', status);
    // onSubmit();
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
        <div className="">
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
                    <div className="flex flex-col justify-between">
                        <div>
                            {getStepContent(activeStep)}
                        </div>
                        
                    </div>
                )}
        </div>
    
    );
  };

  return (
    <div className="flex flex-col">
        <div>
            { renderSteps() } 
        </div>
            
        <div>
            { renderStepContent() }
        </div>
        
        <div 
            className="flex items-end justify-center float-right gap-2 mt-4 lg:justify-end"
        >
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
            <button
                className="text-white bg-blue-500 stepper--btn"
                onClick={handleNext}
            >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>

            <button 
                className="text-white bg-gray-500 stepper--btn"
                onClick={() => setStatus(2)}
            >
                Save
            </button>

            
        </div>
            
           
    </div>
  );
}


export default HorizontalLinearStepper;