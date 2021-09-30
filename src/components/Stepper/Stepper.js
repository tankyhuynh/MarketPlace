/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './Stepper.css'
import { fields } from './fields'
import { PROJECTS_COMMERCIAL_URL, PROJECTS_RESEARCHING_URL } from '../../environments/constraints';

import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { connect, useSelector, useDispatch } from 'react-redux';
import { DropzoneArea } from 'material-ui-dropzone';
import { TextField, TextareaAutosize } from '@mui/material';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import TinyMCEEditor from '../editor/TinyMCE-Editor'
import Tab from '../Tab/Tab';
import ProjectPreview from '../Projects/ProjectPreviewWithEnableEdit';
import CheckboxView from '../Projects/CheckboxTreeView'

import logo from '../../assets/logo.png'

import environment from '../../environments/environment';
import { createLevel } from '../../actions/levelDevelopment';
import { loading, loaded } from '../../actions/loading';
import { LOADED, LOADING } from '../../actions/types';

const OTHER_ID = 4

// const filebrowserUploadUrl = 'https://marketplace-demo-v1.herokuapp.com/api/v1/fileupload';
// const removeButtons = 'PasteFromWord'


const HorizontalLinearStepper = (props) => {
    // const initData = {
    //     userId: 1,
    //     statusId: 1,
    //     companyName: '',
    //     author: '',
    //     address: '',
    //     phoneNumber: '',
    //     fax: '',
    //     email: '',
    //     website: '',
    //     name: '',
    //     shortDescription: '',
    //     process: '',
    //     fieldIdList: [],
    //     advantage: '',
    //     comDevLevel: [],
    //     comTransMethod: [],
    //     scope: '',
    //     price: '',
    //     productImage: '',
    //     challenge: '',
    //     solution: '',
    //     benefit: '',
    // }
    

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [openTab, setOpenTab] = useState(0);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const alertUseAlert = useAlert()

    console.log('HorizontalLinearStepper props.project: ', props.project);

    const [stateFieldsChecked, setFieldsChecked] = useState({
        checked: props.project ? (
            props.project.projectFieldList.map(field => {
                return field.field.id
            } )
        ) : [],
        expanded: []
    })

    const [project, setProject] = useState({});
    const [statusId, setStatusId] = useState(2);

    const [isOtherInputOpen, setOtherInputOpen] = useState({
        comDevLevel: false,
        comTransMethod: false,
    })
    const [otherInputs, setOtherInputs] = useState({
        comDevLevel: {
            name: 'Mức độ phát triển',
            label: 'Nhập tên mức độ',
            value: ''
        },
        comTransMethod: {
            name: 'Phương thức chuyển giao',
            label: 'Nhập tên phương thức',
            value: ''
        }
    })

    const [selectedTransmissionMethodAndLevel, setSelectedTransmissionMethodAndLevel]= useState({
        comDevLevel: [],
        comTransMethod: []
    })

    const userIdState = useSelector(state => state.auth.userProfile.id);

    useEffect(() => {
        console.log('onCheckboxTreeViewChecked stateFieldIdList after set', stateFieldsChecked.checked)
        setProject(previousState => ({...previousState, fieldIdList: stateFieldsChecked.checked}))
    }, [stateFieldsChecked.checked])

    useEffect(() => {
        if(props.project){
            console.log('HorizontalLinearStepper props.project useEffect: ', props.project);
            console.log('HorizontalLinearStepper props.project useEffect: ', props.project.commercialDevelopmentLevelList);
            
            setProject({
                userId: userIdState,
                statusId: statusId,
                companyName: props.project ? props.project.companyName : '',
                author: props.project ? props.project.author : '',
                address: props.project ? props.project.address : '',
                phoneNumber: props.project ? props.project.phoneNumber : '',
                fax: props.project ? props.project.fax : '',
                email: props.project ? props.project.email : '',
                website: props.project ? props.project.website : '',
                name: props.project ? props.project.name : '',
                shortDescription: props.project ? props.project.shortDescription : '',
                process: props.project ? props.project.process : 'process',
                fieldIdList: stateFieldsChecked ? stateFieldsChecked.checked : [],
                advantage: props.project ? props.project.advantage : '',
                comDevLevel: props.project ? (
                    props.project.commercialDevelopmentLevelList
                        .map(comDevLevel => {
                            if(comDevLevel.developmentLevel.id != OTHER_ID){
                                return setSelectedTransmissionMethodAndLevel(previousState => (
                                    { ...previousState,
                                        'comDevLevel': [
                                            {
                                                'developmentLevelId': comDevLevel.developmentLevel.id,
                                                note: comDevLevel.developmentLevel.name
                                            }
                                        ]
                                    }
                                ))
                            }
                            setOtherInputs(previousState => ({...previousState, comDevLevel: {
                                name: 'Phương thức chuyển giao',
                                label: 'Nhập tên phương thức',
                                value: comDevLevel.developmentLevel.name
                            }}))
                            return setOtherInputOpen(previousState => ({...previousState, comDevLevel: true}))
                        })
                ) : (
                    selectedTransmissionMethodAndLevel['comDevLevel']
                        .map(comDevLevel => {
                            return comDevLevel
                        })
                ),
                // comDevLevel:  selectedTransmissionMethodAndLevel ? (
                //     selectedTransmissionMethodAndLevel['comDevLevel']
                //         .map(comDevLevel => {
                //             return comDevLevel
                //         })
                // ) : 1,
                comTransMethod: props.project ?(
                    props.project.commercialTransmissionMethodList
                        .map(comTransMethod => {
                            if(comTransMethod.transmissionMethod.id != OTHER_ID){
                                return setSelectedTransmissionMethodAndLevel(previousState => (
                                    { ...previousState,
                                        'comTransMethod': [
                                            {
                                                'transmissionMethodId': comTransMethod.transmissionMethod.id,
                                                note: comTransMethod.transmissionMethod.name
                                            }
                                        ]
                                    }
                                ))
                            }
                            setOtherInputs(previousState => ({...previousState, comTransMethod: {
                                name: 'Mức độ phát triển',
                                label: 'Nhập tên mức độ',
                                value: comTransMethod.transmissionMethod.name
                            }}))
                            return setOtherInputOpen(previousState => ({...previousState, comTransMethod: true}))
                        })
                ) : (
                    selectedTransmissionMethodAndLevel['comTransMethod']
                        .map(comTransMethod => {
                            return comTransMethod
                        })
                ),
                scope: props.project ? props.project.scope : 'scope useEffect',
                price: props.project ? props.project.price : '',
            })
        }

        console.log('render Stepper useEffect after: ', project);

        // setupBeforeUnloadListener()
        const unloadCallback = (event) => {
            event.preventDefault();
            doSomethingBeforeUnload()
            event.returnValue = "";
            return "";
        };  

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
        
    },[])

    useEffect(() => {
        if(project){
            if(statusId === 4 ){
                onSubmit();   
            }
        }
    },[statusId])

   
    

    //Event này đang ko có tác dụng trong window.addEventListener("beforeunload", unloadCallback);
    const doSomethingBeforeUnload = () => {
        alert('Are you want to close this tab doSomethingBeforeUnload?');
    }
    

    const duAnThuongMai = {
        companyName: project ? project.companyName : '',
        address: project ? project.address : '',
        phoneNumber: project ? project.phoneNumber : '',
        fax: project ? project.fax : '',
        email: project ? project.email : '',
        website: project ? project.website : '',
        name: project ? project.name : '',
        shortDescription: project ? project.shortDescription : '',
        userId: project ? userIdState : '',
        author: project ? project.author : '',
        fieldIdList: project ? project.fieldIdList : [], // Lĩnh vực phát triển
        statusId: project ? project.statusId : '', // Lưu nháp 0-ko lưu, 1-lưu nháp, 2-chờ duyệt, 3...
        process: project ? project.process : '',
        advantage: project ? project.advantage : '',
        comDevLevel: selectedTransmissionMethodAndLevel ? selectedTransmissionMethodAndLevel['comDevLevel'] : [],
        comTransMethod: selectedTransmissionMethodAndLevel ? selectedTransmissionMethodAndLevel['comTransMethod'] : [],
        
        scope: project ? project.scope : 'scope duanTHuongMai',
        price: project ? project.price : '',
        productImage: project ? project.productImage : ''
    }

    const duAnNghienCuu = {
        companyName: project ? project.companyName : '',
        address: project ? project.address : '',
        phoneNumber: project ? project.phoneNumber : '',
        email: project ? project.email : '',
        website: project ? project.website : '',
        name: project ? project.name : '',
        shortDescription: project ? project.shortDescription : '',
        userId: project ? userIdState : '',
        author: 'authors duAnNghienCuu',
        fieldId: project ? project.fieldIdList : [], // Lĩnh vực phát triển
        statusId: project ? project.statusId : '', // Lưu nháp 0-ko lưu, 1-lưu nháp, 2-chờ duyệt, 3...
        challenge: project ? project.challenge : '',
        solution: project ? project.solution : '',
        benefit: project ? project.benefit : ''
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

    const onFilesChange = (files) => {
        // setFiles(files)
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

    const onLevelDevelopmentChange = (event) => {
        // setMucDoPhatTrien(event.target.value)
        setProject({...project, comDevLevel: event.target.value});
        console.log(event.target.value);
    }

    const onTransmissionMethodChange = (event) => {
        // setPhuongThucChuyenGiao(event.target.value)
        setProject({...project, comTransMethod: event.target.value});
        console.log(event.target.value);
    }

    const renderTransmissionMethodsCheckbox = () => {
        if(props.transmissions){
            return (
                props.transmissions.map((transmission, index) => {
                    return (
                        <>
                            <input 
                                type="checkbox" 
                                id="comTransMethod" 
                                name="comTransMethod" 
                                value={transmission.code}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleMultipleCheckboxTransmissionChange('comTransMethod', transmission.id)}
                                key={index} 
                            />
                            {transmission.name}
                        </>
                    )
                })
                
            )
        }
    }

    const handleCheckboxChange = (event) => {
        console.log('handleCheckboxChange')
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(name);
        console.log(value);

        setProject( 
            previousState => ({
                ...previousState, 
                [name]: value
            })
        )
    }


    const handleTinyMCEEditorChange = (editor) => {
        const name = editor.target.name;
        const content = editor.target.value.target.getContent();

        setProject( previousState => ({...previousState, [name]: content}))
    }

    const onProjectImageChange = (files) => {
        console.log('onProjectImageChange', files)
            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", files[0]);

            axios.post(environment.url.java + '/fileUploads/tinymce', formData, config)
                .then(response => {
                    console.log('upload iamge: ', response);
                    console.log('reponse.data.location: ', response.data.location);
                    const imgSrc = response.data.location;

                    if (response.data) {
                        setProject(previousState => ({...previousState, productImage: imgSrc}) )
                    } else {
                        return alert('failed to upload file')
                    }
                })
    }

    const resetAllField = () => {
        setProject(null)
    }

    const onSubmit = (event, statusId) => {
        // event.preventDefault();

        resetAllField();

        console.log('client send:', duAnThuongMai);

        let submitProject = {};
        let URL = '';
        if(openTab === 0){
            submitProject = duAnThuongMai; 
            URL = PROJECTS_COMMERCIAL_URL
        }
        if(openTab === 1){
            submitProject = duAnNghienCuu; 
            URL = PROJECTS_RESEARCHING_URL
        }


        if(props.type === 'create'){
            axios.post(environment.url.java + URL, submitProject)
            .then(response => {
                if (response) {
                    dispatch({ type: LOADED})
                    console.log('client send:', submitProject);
                    console.log('response:', response);
                        setTimeout(() => {
                            history.push('/projects')
                        }, 500);
                }
            })
        }

        // Làm sao để xác định được nó là project gì???????????
        if(props.type === 'edit'){
            axios.put(environment.url.java + PROJECTS_COMMERCIAL_URL + `/${props.id}`, {...submitProject, userId: project.userId})
            .then(response => {
                if (response) {
                console.log('client send:', submitProject);
                console.log('response:', response);
                    setTimeout(() => {
                        history.push('/projects')
                    }, 500);
                }
            })
        }

    }

    const handleOtherInputStatusChange = (field) => {
        console.log('handleOtherInputStatusChange', isOtherInputOpen[field], field)
        setOtherInputOpen(previousState => ({...previousState, [field]: !previousState[field]}))
        console.log('handleOtherInputStatusChange after', isOtherInputOpen[field] , field)
    }
    const handleOtherInputChange = (field, content) => {
        
        const FIELD_LEVEL_ID = 'developmentLevelId'
        const FIELD_TRANSMISSION_ID = 'transmissionMethodId'

        const field_ID = field === 'comDevLevel' ? FIELD_LEVEL_ID : FIELD_TRANSMISSION_ID

        setSelectedTransmissionMethodAndLevel(previousState => (
            { ...previousState,
                [field]: [
                    {
                        [field_ID]: OTHER_ID,
                        note: content
                    }
                ]
            }
        ))

        console.log('selectedTransmissionMethodAndLevel', selectedTransmissionMethodAndLevel)

    }

    // const handleMultipleCheckboxFieldListChange = (field, id) => {
    //     let selected = selectedCheckbox[field];
    //     let find = selected.indexOf(id)
        
    //     if(find > -1) { 
    //         selected.splice(find, 1)
    //     } else {
    //         selected.push(id)
    //     }
        
    //     setSelectedCheckbox(previousState => ({ ...previousState, [field]: selected}) )
    //     console.log('selectedCheckbox', selectedCheckbox)

    // }

    // Chưa biết xử lý chỗ này sao?
    const handleMultipleCheckboxTransmissionChange = (field, id) => {

        console.log('ID CLICKED: ', field, id);

        const FIELD_LEVEL_ID = 'developmentLevelId'
        const FIELD_TRANSMISSION_ID = 'transmissionMethodId'

        const field_ID = field === 'comDevLevel' ? FIELD_LEVEL_ID : FIELD_TRANSMISSION_ID

        let selected = selectedTransmissionMethodAndLevel[field];
        
        let find = selected.some(item => item[field_ID] === id)
        
        if(find) { 
            selected = selected.filter(item => item[field_ID] !== id)
            console.log('Check with some: find', find)
        } else {
            console.log('Check with some: Not Equal')
            if(id === OTHER_ID){
                console.log('ID CLICKED EQUAL: ', field, id);
                handleOtherInputStatusChange(field)
            }
            console.log('ID CLICKED DONTTTTTT EQUAL: ', field, id);

            selected.push({
                [field_ID]: id,
                note: ''
            })
        }

        setSelectedTransmissionMethodAndLevel(previousState => (
            { ...previousState,
                [field]: selected
            }
        ))
        
        console.log('selectedTransmissionMethod value: ', id )
        console.log('selectedTransmissionMethod value[id]: ', selectedTransmissionMethodAndLevel[field][id] )
        console.log('selectedTransmissionMethod', selectedTransmissionMethodAndLevel)

    }
  
    

    const renderOtherInputField = (field) => {
        return (
                <section className="flex gap-4">
                    <input 
                        type="checkbox" 
                        id={field} 
                        name={field}
                        checked={isOtherInputOpen[field]}   
                        onChange={() => handleOtherInputStatusChange(field)}
                    />
                    Khác    
                    { isOtherInputOpen[field] && 
                        <section >
                            <TextField 
                                id={`standard-${field}`} 
                                label={otherInputs[field].label} // Lỗi chỗ này là do cái lĩnh vực chưa phải là checkbox bên backend
                                variant="standard"
                                value={props.project ? otherInputs[field].value : duAnThuongMai[field] }
                                onChange={(e) => handleOtherInputChange(field, e.target.value)} 
                            />
                        
                        </section>
                    }
                </section>
        )
    }

  

//   const renderTransmissionMethodsComboBox = () => {
//         if(props.transmissions){
//             return props.levels.map((transmission, index) => {
//                 if(index === 0){
//                     return (
//                         <option selected value={transmission.id}>{ transmission.name }</option>
//                     );
//                 }
//                 else {
//                     return (
//                         <option value={transmission.id}>{ transmission.name }</option>
//                     );
//                 }
//             })
//         }
//   }



    const renderInputImage = (fields) => {
        return Object.values(fields).map((field) => {
            if(field.type === 'image'){
                return (
                    <div id="hinhAnhTongThe" className="">
                        <label className="stepper--label" htmlFor="hinh_anh">
                            { field.label }
                        </label>
                        <div className="">
                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                dropzoneText={"Drag and drop an image here or click"}
                                onChange={onProjectImageChange}
                                initialFiles={
                                   [ props.project 
                                    ? props.project.productImage 
                                    : logo
                                ]}
                            />
                        </div>
                            
                    </div>
                )
            }
            return null;
        })
    }


    
    

    const isCheckboxChecked = (field, id) => {
        if(selectedTransmissionMethodAndLevel[field.fieldName]){
            return selectedTransmissionMethodAndLevel[field.fieldName].filter(item => {
                if(field.fieldName === 'comDevLevel'){
                    return item.developmentLevelId === id
                }
                else return item.transmissionMethodId === id
            }).length > 0
        }
        return false
    }

    
  
    const renderCheckboxContent = (propsList, field) => {
        if(props[propsList]){
            return (
                props[propsList].map((propsData, index) => {
                    if(propsData.id == OTHER_ID && field.fieldName !== 'fieldIdList'){
                        return renderOtherInputField(field.fieldName)
                    }
                    else {
                        return (
                            <>
                                <input 
                                    key={`${field.fieldName}-${index}`} 
                                    type="checkbox" 
                                    // id={field.fieldName}
                                    checked={   
                                        field.fieldName !== 'fieldIdList'
                                            ?  
                                            //      (
                                            //         selectedTransmissionMethodAndLevel[field.fieldName].filter(item => {
                                            //             if(field.fieldName === 'comDevLevel'){
                                            //                 return item.developmentLevelId === propsData.id
                                            //             }
                                            //             else return item.transmissionMethodId === propsData.id
                                            //         }).length > 0
                                            //     )
                                                isCheckboxChecked(field, propsData.id)
                                                : null
                                            // :   selectedCheckbox[field.fieldName].includes(propsData.id)
                                    } 
                                    name={field.fieldName} 
                                    value={propsData.code}
                                    onChange={ 
                                        () => 
                                            field.fieldName !== 'fieldIdList' 
                                            ? handleMultipleCheckboxTransmissionChange(field.fieldName, propsData.id) 
                                            : null
                                            // : handleMultipleCheckboxFieldListChange('fieldIdList', propsData.id)
                                    }
                                />
                                {propsData.name}
                            </>
                        )
                    }
                })
                
            )
        }  
    } 
    

    const renderEditor = (fields) => {
        return Object.values(fields).map(field => {
            if(field.type === 'editor'){
                return (
                    <div id={field.id} key={field.id} className="">
                        <label className="stepper--label" htmlFor={field.fieldName}>
                            { field.label }
                        </label>
                        <div className="">
                            {/* <CKEditor 
                                id={field.id}
                                name={field.fieldName}
                                activeClass={field.fieldName}
                                initData={project ? project[field.fieldName] : ''}
                                config={{
                                    filebrowserUploadUrl: filebrowserUploadUrl,
                                    removeButtons: removeButtons,
                                    isReadOnly: true,
                                }}
                                onChange={handleCKEditorChange}
                            /> */}

                            {/* 
                                Chỗ này chưa biết có chạy đc ko
                                Mới bỏ vô thử thôi
                            */}
                            <TinyMCEEditor 
                                // key={ (Math.random() + 1).toString(36).substring(7) }
                                // projectId={project ? project.id : ''}
                                name={field.fieldName}
                                value={project ? project[field.fieldName] : '????'}
                                onChange={handleTinyMCEEditorChange} 
                            />
                        </div>
                    </div>
                )
            }
            return null;
        })
    }

    // Còn chỗ cái lĩnh vực, nó đang lấy theo cái comDevLevel luôn
    // props_list_data, field
    const renderCheckbox = (fields) => {
        return Object.values(fields).map(field => {
            
            let propsList = '';
            if(field.fieldName === 'comDevLevel'){
                propsList = 'levels'
            }
            else {
                if(field.fieldName === 'comTransMethod'){
                    propsList = 'transmissions'
                }
                else propsList = 'fields'
            }

            if(field.type === 'checkbox') {
                return (
                    <div id={field.id} key={field.id} className="">
                         <label className="self-center stepper--label" htmlFor="mucDoPhatTrien">
                             { field.label }
                         </label>
                         <div class="flex flex-col gap-2">
                             <section className="flex items-center gap-4">
                                {
                                    // !isOtherInputOpen[field.fieldName] 
                                    // && 
                                    renderCheckboxContent(propsList, field) 
                                }
                             </section>
                             {/* <section>
                                { 
                                    field.fieldName !== 'fieldIdList'
                                        ? renderOtherInputField(field.fieldName)
                                        : null
                                }
                             </section> */}
                         </div>
                     </div>  
                )
            }
            return null;
        })
    }

    const renderCheckboxCategoryChildren = (category) => {
        const children = []
        props.fields.filter(field => field.category.id === category.id)
            .map(item => {
                return children.push({
                    value: `${item.id}`,
                    label: item.name,
                })
            })
        if(children.length){
            return children
        }
        return null
    }
    
    const nodes = props.categories ? props.categories.map(category => {
        if(renderCheckboxCategoryChildren(category)){
            return {
                value: `${category.code}`,
                label: category.name,
                children: renderCheckboxCategoryChildren(category)
            }
        }
        return {
            value: `${category.id}-${category.code}`,
            label: category.name,
        }
    })
    : [];
    
    
    const onCheckboxTreeViewChecked = (checked) => {
        console.log('onCheckboxTreeViewChecked', checked)
        // setStateFieldsChecked({ checked }) prevMovies => ([...prevMovies, ...result])
        setFieldsChecked(previousState => ({...previousState, checked}))
        
    }

    const renderCheckboxTreeView = (fields) => {
       return Object.values(fields).map(field => {
            if(field.type === 'checkboxTreeView') {
                return (
                    <div id={field.id} key={field.id} className="">
                        <label className="self-center stepper--label" htmlFor="mucDoPhatTrien">
                            { field.label }
                        </label>
                        <div class="flex flex-col gap-2">
                            <CheckboxView 
                                id={field.fieldName} 
                                nodes={nodes} 
                                stateFieldIdList={stateFieldsChecked} 
                                setStateFieldIdListChecked={onCheckboxTreeViewChecked} 
                                setStateFieldIdListExpanded={expanded => setFieldsChecked(previousState => ({ ...previousState, expanded: expanded }))} 
                            />
                        </div>
                    </div>  
                )
            }
            return null;
       })
    }

    const renderTextArea = (fields) => {
        return Object.values(fields).map(field => {
            if(field.type === 'textarea'){
                return (
                    <div id={field.id} className="">
                        <label className="stepper--label" htmlFor={field.id}>
                            { field.label }
                        </label>
                        <TextareaAutosize 
                            id={field.id} 
                            value={project ? project[field.fieldName] : ''}
                            onChange={(e) => handleContentChange(field.fieldName, e.target.value) }
                            // className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                            className="w-full border-2 border-gray-300 rounded-md"
                            error={project ? field.isRequired : ''} 
                            minRows={2}
                        />
                     </div>
                )
            }
            return null;
        })
    }

    const renderInput = (fields) => {
        return Object.values(fields).map(field => {
            if(field.type === 'text' || field.type === 'email'){
                return (
                    <>
                        <div id={field.id} className="stepper--field" key={field.id}>
                            <label className="col-span-2 stepper--label" htmlFor={field.id}>
                                {field.label}
                            </label>
                            <TextField
                                value={project ? project[field.fieldName] : ''} 
                                onChange={(e) => handleContentChange(field.fieldName, e.target.value) }
                                // className="justify-end w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                                className="stepper--input" 
                                id={field.id} 
                                type={field.type}
                                error={project ? field.isRequired : ''} 
                            />
                            <span className="col-span-2 text-sm font-bold text-red-500">
                            {errors[field.fieldName]}
                        </span>
                        </div>
                        
                    </>
                )
            }
            return null
        })
    }

    const renderStep1 = () => {
        return (
            <div className="mx-4 lg:mx-auto">
                { renderInput(fields.generalInfo) }
            </div>
        );
    };

    const handleContentChange = (field, content) => {
        setProject({
            ...project,
            [field]: content
        })
    }

   

    const renderDuAnThuongMai = () => {
        console.log('renderDuAnThuongMai renderDuAnThuongMai ?', project);
        return (
            <>
                <section>
                    { renderInput(fields.productInfo.commercial) }
                </section>
                <section>
                    { renderTextArea(fields.productInfo.commercial)}
                </section>
                <section>
                    { renderCheckboxTreeView(fields.productInfo.commercial)}
                </section>
                <section>
                    { renderCheckbox(fields.productInfo.commercial)}
                </section>
                <section>
                    { renderEditor(fields.productInfo.commercial)}
                </section>
                
                <section>
                    { renderInputImage(fields.productInfo.commercial)}
                </section>
            </>
        );
    };

    const renderDuAnNghienCuu = () => {
        return (
            <>
                <section>
                    { renderInput(fields.productInfo.researching) }
                </section>
                <section>
                    { renderTextArea(fields.productInfo.researching)}
                </section>
                <section>
                    { renderCheckboxTreeView(fields.productInfo.researching)}
                </section>
                <section>
                    { renderCheckbox(fields.productInfo.researching)}
                </section>
                <section>
                    { renderEditor(fields.productInfo.researching)}
                </section>
                
                <section>
                    { renderInputImage(fields.productInfo.researching)}
                </section>
            </>
        );
    };
  
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
        if(openTab === 1){
            console.log('PreviewduAnNghienCuu: ', duAnNghienCuu);
            projectPreview = duAnNghienCuu; 
        }
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
            //   content: 'Hiện tại tính năng đang phát triển'
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

    const handleValidationGeneralInfo = (project) => {
        // let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        //Name
        if (!project["companyName"]) {
          formIsValid = false;
          errors["companyName"] = "Tên doanh nghiệp không được để trống";
        }
        if (!project["author"]) {
          formIsValid = false;
          errors["author"] = "Nhóm tác giả không được để trống";
        }
        if (!project["address"]) {
          formIsValid = false;
          errors["address"] = "Địa chỉ không được để trống";
        }
        if (!project["phoneNumber"]) {
          formIsValid = false;
          errors["phoneNumber"] = "Số điện thoại không được để trống";
        }
        if (!project["address"]) {
          formIsValid = false;
          errors["address"] = "Địa chỉ không được để trống";
        }

        // if (typeof project["author"] !== "undefined") {
        //   if (!project["author"].match(/^[a-zA-Z]+$/)) {
        //     formIsValid = false;
        //     errors["author"] = "author Only letters";
        //   }
        // }
    
        //Email
        if (!project["email"]) {
          formIsValid = false;
          errors["email"] = "Email không được để trống";
        }
    
        if (typeof project["email"] !== "undefined") {
          let lastAtPos = project["email"].lastIndexOf("@");
          let lastDotPos = project["email"].lastIndexOf(".");
    
          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              project["email"].indexOf("@@") == -1 &&
              lastDotPos > 2 &&
              project["email"].length - lastDotPos > 2
            )
          ) {
            formIsValid = false;
            errors["email"] = "Email không hợp lệ";
          }
        }
    
        setErrors(errors)
        return formIsValid;
    }

     const handleValidationSolution = (project) => {
        // let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        if (!project["name"]) {
            formIsValid = false;
            errors["name"] = "Tên sản phẩm không được để trống";
        }
        if (!project["shortDescription"]) {
            formIsValid = false;
            errors["shortDescription"] = "Mô tả ngắn không được để trống";
        }

        if(openTab === 0){
            if (!project["scope"]) {
                formIsValid = false;
                errors["scope"] = "Phạm vi không được để trống";
            }
        }

        if(openTab === 1){
            
        }

        // if (typeof project["author"] !== "undefined") {
        //   if (!project["author"].match(/^[a-zA-Z]+$/)) {
        //     formIsValid = false;
        //     errors["author"] = "author Only letters";
        //   }
        // }
    
        setErrors(errors)
        return formIsValid;
    }

    const handleNext = () => {
        if(activeStep === 0 ? handleValidationGeneralInfo(project) : handleValidationSolution(project)){
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
        }
        else alertUseAlert.error('Hãy kiểm tra lại các thông tin nhập !!!')
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
        console.log('statusId', project.statusId);
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
        if(activeStep === steps.length){
            dispatch({ type: LOADING})
        }
        return (
            <div className="">
                {activeStep === steps.length ? 
                (
                        <div>
                            <Typography>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} className="stepper--btn">
                                Reset
                            </Button>
                        </div>
                       
                ) 
                : (
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
                className="flex items-end justify-center float-right gap-2 p-4 mt-4 lg:justify-end"
            >
                <Button 
                    disabled={activeStep === 0} 
                    onClick={handleBack} 
                    className="stepper--btn"
                >
                    Trở lại
                </Button>
                {isStepOptional(activeStep) && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                    >
                        Bỏ qua
                    </Button>
                )}
                <button
                    className="text-white bg-blue-500 stepper--btn"
                    onClick={handleNext}
                >
                    {activeStep === steps.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
                </button>

                <button 
                    className="text-white bg-gray-500 stepper--btn"
                    onClick={() => setStatusId(2)}
                >
                    Lưu nháp
                </button>

                
            </div>
                
            
        </div>
    );
}


export default connect(
    null,
    { createLevel }
  )(HorizontalLinearStepper);