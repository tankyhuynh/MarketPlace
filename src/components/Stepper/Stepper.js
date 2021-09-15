/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './Stepper.css'

import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';


import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { CKEditor } from 'ckeditor4-react';

import environment from '../../environments/environment';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Tab from '../Tab/Tab';
import ProjectPreview from '../Projects/ProjectPreviewWithEnableEdit';
import DrapAndDrop from '../DragAndDropFile';

const initData = {
    user: 1,
    status: 1,
    companyName: '',
    authors: '',
    address: '',
    phoneNumber: '',
    fax: '',
    email: '',
    website: '',
    name: '',
    shortDescription: '',
    process: '',
    field: '',
    advantage: '',
    levelDevelopment: 1,
    transmissionMethod: 1,
    scope: '',
    price: '',
}

const filebrowserUploadUrl = 'https://marketplace-demo-v1.herokuapp.com/api/v1/fileupload';
const removeButtons = 'PasteFromWord'


const HorizontalLinearStepper = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [openTab, setOpenTab] = useState(0);

    
    const [project, setProject] = useState(initData);
    const [process, setProcess] = useState('');
    const [advantage, setAdvantage] = useState('');
    const [status, setStatus] = useState(1);


    const userState = useSelector(state => state.auth.userProfile);

    console.log('props stepper: ', props);
    

    useEffect(() => {
        console.log('render Stepper useEffect: ', project);
        setProject({
            user: userState,
            status: status,
            companyName: props.project ? props.project.companyName : '',
            address: props.project ? props.project.address : '',
            phoneNumber: props.project ? props.project.phoneNumber : '',
            fax: props.project ? props.project.fax : '',
            email: props.project ? props.project.email : '',
            website: props.project ? props.project.website : '',
            name: props.project ? props.project.name : '',
            shortDescription: props.project ? props.project.shortDescription : '',
            process: props.project ? props.project.process : '',
            field: props.project ? props.project.field.name : '',
            advantage: props.project ? props.project.advantage : '',
            levelDevelopment: props.project ? props.project.levelDevelopment.id : 1,
            transmissionMethod: props.project ? props.project.transmissionMethod.id : 1,
            scope: props.project ? props.project.scope : '',
            price: props.project ? props.project.price : '',
            images: props.project ? props.project.images : []
        })

        
     },[])

    useEffect(() => {
        if(project){
            if(status === 2 ){
                onSubmit();   
            }
        }
    },[status])


    const onFilesChange = (files) => {
        // setFiles(files)
    }

    // const duAnNghienCuu = {
    //     tenDN: tenDN,
    //     diaChi: diaChi,
    //     tacGia: tacGia,
    //     soDienThoai: soDienThoai,
    //     email: email,
    //     website: website,
    //     tenDA: tenGP,
    //     linhVuc: linhVuc,
    //     thachThuc: thachThuc,
    //     giaiPhap: giaiPhap,
    //     loiIch: loiIch,
    //     fileDuAn: fileDuAn
    // }

    const duAnThuongMai = {
        companyName: project ? project.companyName : '',
        address: project ? project.address : '',
        phoneNumber: project ? project.phoneNumber : '',
        email: project ? project.email : '',
        website: project ? project.website : '',
        name: project ? project.name : '',
        shortDescription: project ? project.shortDescription : '',
        user: project ? userState.id : '',
        author: 'authors',
        field: 1, // Lĩnh vực phát triển
        status: project ? project.status : '', // Lưu nháp 0-ko lưu, 1-lưu nháp, 2-chờ duyệt, 3...
        process: project ? project.process : '',
        advantage: project ? project.advantage : '',
        levelDevelopment: project ? project.levelDevelopment : '',
        transmissionMethod: project ? project.transmissionMethod : '',
        scope: project ? project.scope : '',
        price: project ? project.price : '',
        // hinhAnhTongThe: hinhAnhTongThe
    }


  const history = useHistory();



    // Muốn copy object, thay = gtr mới thì xài 
    // vd kiểu như này HsetProject( previousState => ({...previousState, advantage: data}))
    // HỘ T CÁI, dm tốn biết bao nhiêu time để fix cái lỗi này
    const onProcessChange = (evt) => {
        const data = evt.editor.getData();
        console.log(evt)
        // setProcess(data)
        setProject( previousState => ({...previousState, process: data}))
    }
    const onAdvantageChange = (evt) => {
        const data = evt.editor.getData();
        console.log(evt)
        // setAdvantage(data)
        setProject( previousState => ({...previousState, advantage: data}))
    }

    const handleCKEditorChange = (event, editor) => {
        console.log('handleCKEditorChange event', event)
        console.log('handleCKEditorChange editor', editor)
        const name = event.editor.name;
        console.log('handleCKEditorChange name', name)

        const data = event.editor.getData();
        setProject( previousState => ({...previousState, [name]: data}))
    }

    const handleInstanceReady = ({ editor }) => {
        console.log('handleInstanceReady editor: ', editor)
    }

    const renderImagePreview = (images) => {
        console.log('images: ', images);
        if(images){
            if(Array.isArray(images)){
                return images.map((image, index) => {
                    return (
                        <>
                            <img src={image} alt={index} key={index}/>
                        </>
                    )
                })
            }
            return (
                <>
                    <img src={images} alt={images} key={images}/>
                </>
            )
        }
    }

    const onProjectImageChange = (e) => {
        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];

            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("upload", file);

            axios.post(environment.url.java + '/fileupload', formData, config)
                .then(response => {
                    console.log('upload iamge: ', response);
                    console.log('reponse.data[0]: ', response.data[0]);
                    const imgSrc = response.data['url'];
                    const imgTitle = response.data['title'];

                    if (response.data) {
                        setProject(previousState => ({...previousState, images: imgSrc}) )
                    } else {
                        return alert('failed to upload file')
                    }
                })
        }
    }

    // Onchange in duAnNghienCuu
    const onThachThucChange = (value) => {
        // setThachThuc(value)
        setProject({...project, process: value})
    }
    const onGiaiPhapChange = (value) => {
        // setGiaiPhap(value)
        setProject({...project, process: value})
    }
    const onLoiIchChange = (value) => {
        // setLoiIch(value)
        setProject({...project, process: value})
    }
    const onFileDuAnChange = (event) => {
        // setFileDuAn(event.target.files);
    }

    const resetAllField = () => {
        setProject(null)
    }


  const onSubmit = (event, status) => {
    // event.preventDefault();

    resetAllField();

    console.log('client send:', duAnThuongMai);


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
        axios.put(environment.url.java + '/project', {...duAnThuongMai, user: project.user})
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
  const renderFields = () => {
    if(props.levels){
        return props.fields.map((field, index) => {
            if(index === 0){
                return (
                    <option selected value={field.id}>{ field.name }</option>
                );
            }
            else {
                return (
                    <option value={field.id}>{ field.name }</option>
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
                    value={project ? project.companyName : ''} 
                    onChange={(e) => handleContentChange('companyName', e.target.value) }
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
                    value={project.address}
                    onChange={(e) => handleContentChange('address', e.target.value) }
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
                    value={project.phoneNumber}
                    onChange={(e) => handleContentChange('phoneNumber', e.target.value) }
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="phone" 
                    type="text" 
                />
            </div>
            <div className="stepper--field">
                <label className="stepper--label" htmlFor="authors">
                    Nhóm tác giả
                </label>
                <input
                    value={project.authors}
                    onChange={(e) => handleContentChange('authors', e.target.value) }
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="authors" 
                    type="text" 
                />
            </div>
            <div className="stepper--field">
                <label className="stepper--label" htmlFor="fax">
                    Fax
                </label>
                <input
                    value={project.fax}
                    onChange={(e) => handleContentChange('fax', e.target.value) }
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
                    value={project.email}
                    onChange={(e) => handleContentChange('email', e.target.value) }
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
                    value={project.website}
                    onChange={(e) => handleContentChange('website', e.target.value) }
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="website" 
                    type="text" 
                />
            </div>
        </div>
    );
  };

  const handleContentChange = (field, content) => {
    console.log('content : ', content);
    setProject({
        ...project,
        [field]: content
    })
}

  const onLevelDevelopmentChange = (event) => {
    // setMucDoPhatTrien(event.target.value)
    setProject({...project, levelDevelopment: event.target.value});
    console.log(event.target.value);
  }
  const onTransmissionMethodChange = (event) => {
    // setPhuongThucChuyenGiao(event.target.value)
    setProject({...project, transmissionMethod: event.target.value});
    console.log(event.target.value);
  }

  const renderDuAnThuongMai = () => {
      console.log('renderDuAnThuongMai renderDuAnThuongMai ?', project);
    return (
        <>
            <div id="tenGP" className="stepper--field">
              <label className="stepper--label" htmlFor="solution_name">
                  Tên giải pháp, sản phẩm
              </label>
              <input
                  value={project ? project.name : ''}
                  onChange={(e) => handleContentChange('name', e.target.value) }
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
                    value={project ? project.shortDescription : ''}
                    onChange={(e) => handleContentChange('shortDescription', e.target.value) }
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="mo_ta_ngan" 
                />
            </div>
            <div id="linhVuc" className="stepper-combobox">
                <label className="self-center stepper--label" htmlFor="lvad">
                    Lĩnh vực áp dụng
                </label>
                <div className="stepper-combobox--content">
                    <select 
                        value={project ? project.field : ''}
                        onChange={(e) => handleContentChange('field', e.target.value) }
                        className="stepper-combobox--content-select"
                    >
                        
                        { renderFields() }
                       
                    </select>
                </div>
            </div>
            <div id="mucDoPhatTrien" className="stepper-combobox">
                <label className="self-center stepper--label" htmlFor="mucDoPhatTrien">
                    Mức độ phát triển
                </label>
                <div className="stepper-combobox--content">
                    <select 
                        value={project ? project.levelDevelopment : ''}
                        onChange={(e) => handleContentChange('levelDevelopment', e.target.value) }
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
                        // value={phuongThucChuyenGiao} 
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
                    {/* <QuillEditor
                        editorId="editor_qtcn"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onQuyTrinhChange}
                        onFilesChange={onFilesChange}
                        data={project ? project.process : ''}
                    /> */}
                    <CKEditor 
                        id="process"
                        name="process"
                        activeClass="process"
                        initData={project ? project.process : ''}
                        config={{
                            filebrowserUploadUrl: filebrowserUploadUrl,
                            removeButtons: removeButtons,
                            isReadOnly: true,
                        }}
                        onChange={handleCKEditorChange}
                    />

                </div>
            </div>
            <div id="uuDiem" className="stepper--field">
                <label className="stepper--label" htmlFor="uu_diem">
                    Ưu điểm
                </label>
                <div className="w-2/3">
                    {/* <QuillEditor
                        editorId="editor_uuDiem"
                        placeholder={"Start Posting Something"}
                        onEditorChange={onUuDiemChange}
                        onFilesChange={onFilesChange}
                        data={project ? project.advantage : ''}
                    /> */}
                    <CKEditor 
                        id="advantage"
                        name="advantage"
                        initData={project ? project.advantage : ''}
                        config={{
                            filebrowserUploadUrl: filebrowserUploadUrl,
                            removeButtons: removeButtons,
                            isReadOnly: true,
                        }}
                        onChange={handleCKEditorChange}
                    />
                </div>
            </div>
            
            <div id="phamViThuongMai" className="stepper--field">
                <label className="stepper--label" htmlFor="pvi_thuong_mai">
                    Phạm vi thương mại hóa
                </label>
                <textarea 
                    value={project ? project.scope : ''}
                    onChange={(e) => handleContentChange('scope', e.target.value) }
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="pvi_thuong_mai" 
                />

            </div>
            <div id="chaoGia" className="stepper--field">
                <label className="stepper--label" htmlFor="chao_gia">
                    Chào giá tham khảo
                </label>
                <input
                    value={project ? project.price : ''}
                    onChange={(e) => handleContentChange('price', e.target.value) }
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                    id="chao_gia" 
                    type="text" 
                />
            </div>
            <div id="hinhAnhTongThe" className="stepper--field">
              <label className="stepper--label" htmlFor="hinh_anh">
                  Hình ảnh tổng thể
              </label>
              <input
                  onChange={onProjectImageChange} 
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  id="hinh_anh" 
                  type="file" 
                  multiple
              />
            </div>
            <div className="w-32">
                { renderImagePreview(project ? project.images : null) }
            </div>
        </>
    );
  };

//   const renderDuAnNghienCuu = () => {
//     return (
//         <>
//             <div className="stepper--field">
//               <label className="stepper--label" htmlFor="solution_name">
//                   Tên giải pháp, sản phẩm
//               </label>
//               <input
//                   value={tenGP}
//                   onChange={(e) => { setTenGP(e.target.value) }} 
//                   className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
//                   id="solution_name" 
//                   type="text" 
//               />
//             </div>

//             <div id="moTaNgan" className="stepper--field">
//                 <label className="stepper--label" htmlFor="lvad">
//                     Mô tả ngắn
//                 </label>    
//                 <textarea 
//                     value={moTaNgan}
//                     onChange={(e) => { setMoTaNgan(e.target.value) }}
//                     className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
//                     id="mo_ta_ngan" 
//                 />
//             </div>
            
//             <div className="stepper--field">
//                 <label className="stepper--label" htmlFor="lvad">
//                     Lĩnh vực áp dụng
//                 </label>
//                 <input
//                     value={linhVuc}
//                     onChange={(e) => { setLinhVuc(e.target.value) }}
//                     className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
//                     id="lvad" 
//                     type="text" 
//                 />
//             </div>
//             <div className="stepper--field">
//                 <label className="stepper--label" htmlFor="uu_diem">
//                     Thách thức
//                 </label>
//                 <div className="w-2/3">
//                     <QuillEditor
//                         editorId="thac_thuc"
//                         placeholder={"Start Posting Something"}
//                         onEditorChange={onThachThucChange}
//                         data={thachThuc}
//                     />
//                 </div>
//             </div>
//             <div className="stepper--field">
//                 <label className="stepper--label" htmlFor="uu_diem">
//                     Giải pháp
//                 </label>
//                 <div className="w-2/3">
//                     <QuillEditor
//                         editorId="giai_phap"
//                         placeholder={"Start Posting Something"}
//                         onEditorChange={onGiaiPhapChange}
//                         data={giaiPhap}
//                     />
//                 </div>
//             </div>
//             <div className="stepper--field">
//                 <label className="stepper--label" htmlFor="uu_diem">
//                     Lợi ích
//                 </label>
//                 <div className="w-2/3">
//                     <QuillEditor
//                         editorId="loi_ich"
//                         placeholder={"Start Posting Something"}
//                         onEditorChange={onLoiIchChange}
//                         data={loiIch}
//                     />
//                 </div>
//             </div>
//             <div className="stepper--field">
//               <label className="stepper--label" htmlFor="hinh_anh">
//                   File dự án
//               </label>
//               <input
//                   onChange={onFileDuAnChange} 
//                   className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
//                   id="file_du_an" 
//                   type="file" 
//                   multiple
//               />
//             </div>
            
//             </>
//     );
//   };
  
  const onSave = (field, newContent) => {
      console.log('onSave newContent', newContent);
      //   setQuyTrinh(newContent.process.text);
      setProject({...project, [field]: newContent.text});
      console.log('onSave project', project);
  }

  const renderPreview = () => {
    let projectPreview = {};
    if(openTab === 0){
        console.log('PreviewduAnThuongMai: ', duAnThuongMai);
        projectPreview = duAnThuongMai; 
    }
    // if(openTab === 1){
    //     console.log('PreviewduAnNghienCuu: ', duAnNghienCuu);
    //     projectPreview = duAnNghienCuu; 
    // }
    return (
        // <ProjectPreview project={projectPreview} type={openTab}/>
        <ProjectPreview project={projectPreview} type={openTab} onSave={onSave}/>
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
        // if(openTab === 1){
        //     console.log('duAnNghienCuu', duAnNghienCuu); 
        // }
        return renderStep2();
      case 2:
        if(openTab === 0){
            console.log('Complete with duAnThuongMai', duAnThuongMai); 
        }
        // if(openTab === 1){
        //     console.log('Complete with duAnNghienCuu', duAnNghienCuu); 
        // }
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
    console.log('status', project.status);
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