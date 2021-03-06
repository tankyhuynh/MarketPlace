/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './Stepper.css'
import { fields } from './fields'
import { PROJECTS_ADMIN_COMMERCIAL_URL, PROJECTS_ADMIN_RESEARCHING_URL } from '../../../../../environments/constraints';

import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { connect, useSelector, useDispatch } from 'react-redux';
import { DropzoneArea } from 'material-ui-dropzone';
import { TextField, TextareaAutosize } from '@mui/material';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import validator from 'validator' 

import authHeader from '../../../../../services/auth.header'

import { CKEditor } from 'ckeditor4-react';
import Tab from '../Tab'
import ProjectPreview from '../../../../Projects/ProjectPreviewWithEnableEdit';
import CheckboxView from '../../../../Projects/CheckboxTreeView'
import ComboboxStatus from './ComboboxStatus'
import ComboboxHightlight from './ComboboxHightlight'
import Checkcbox from './Checkcbox'

import logo from '../../../../../assets/logo.png'

import environment from '../../../../../environments/environment';
import { createTempProject } from '../../../../../actions/project';
import { block_navigation, unblock_navigation } from '../../../../../actions/blockNavigation';
import { LOADED, LOADING } from '../../../../../actions/types';

const OTHER_ID = 4

const filebrowserUploadUrl = environment.url.java +  '/fileUploads/ckeditor';
const removeButtons = 'PasteFromWord'

const TYPE_PROJECT_COMMERCIAL = 'CP'

const HorizontalLinearStepper = (props) => {

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [openTab, setOpenTab] = useState(0);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const alertUseAlert = useAlert()

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
        comDevLevel: 
            props.project.commercialDevelopmentLevelList 
            ?
                props.project.commercialDevelopmentLevelList.some(item => item.developmentLevel.id === OTHER_ID)
            : {},
        comTransMethod: 
            props.project.commercialTransmissionMethodList
            ? props.project.commercialTransmissionMethodList.some(item => item.transmissionMethod.id === OTHER_ID)
            : {},
    })
    const [otherInputs, setOtherInputs] = useState({
        comDevLevel: {
            name: 'M???c ????? ph??t tri???n',
            label: 'Nh???p t??n m???c ?????',
            value: ''
        },
        comTransMethod: {
            name: 'Ph????ng th???c chuy???n giao',
            label: 'Nh???p t??n ph????ng th???c',
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


    
    // const usePrevious = (value) => {
    //     const ref = React.useRef()
    //     React.useEffect(() => { ref.current = value })
        
    //     return ref.current
    // }
    
    // const useLocationChange = (action) => {
    //     const location = useLocation()
    //     const prevLocation = usePrevious(location)
    //     React.useEffect(() => { 
    //         action(location, prevLocation) 
    //     }, [location])
    // }

    // useLocationChange((location, prevLocation) => { 
    //     console.log('changed from', prevLocation, 'to', location) 
    // })
    


    let isProjectDontSaved = true;
    useEffect(() => {
        
        if(props.project){
            console.log('props.project', props.project) 
            props.project.type === TYPE_PROJECT_COMMERCIAL ? setOpenTab(0) : setOpenTab(1);  

            setProject({
                userId: userIdState,
                statusId: props.project ? props.project.status.id : 1,
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
                    ? (
                        props.project.commercialDevelopmentLevelList.length
                            ? (
                                props.project.commercialDevelopmentLevelList
                                .map(comDevLevel => {
                                    let selectedLevels = selectedTransmissionMethodAndLevel['comDevLevel']

                                    if(comDevLevel.developmentLevel.id != OTHER_ID){
                                            selectedLevels.push(
                                                {
                                                    'developmentLevelId': comDevLevel.developmentLevel.id,
                                                    note: comDevLevel.developmentLevel.name
                                                }
                                            )
                                            return setSelectedTransmissionMethodAndLevel(previousState => (
                                                { ...previousState,
                                                    'comDevLevel': selectedLevels
                                                }
                                            )
                                        )
                                    }

                                    else {
                                        selectedLevels.push(
                                            {
                                                'developmentLevelId': comDevLevel.developmentLevel.id,
                                                note: comDevLevel.note 
                                            }
                                        )
                                        setSelectedTransmissionMethodAndLevel(previousState => (
                                            { ...previousState,
                                                'comDevLevel': selectedLevels
                                            }
                                        ))
                                        setOtherInputs(previousState => ({...previousState, comDevLevel: {
                                            name: 'Ph????ng th???c chuy???n giao',
                                            label: 'Nh???p t??n ph????ng th???c',
                                            value: comDevLevel.note
                                        }}))
                                        return setOtherInputOpen(previousState => ({...previousState, comDevLevel: true}))
                                    }
                                })
                            )
                            : null
                    ): null
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
                // commercialTransmissionMethodList
                comTransMethod: props.project ?(
                    props.project.commercialTransmissionMethodList
                    ? (
                        props.project.commercialTransmissionMethodList.length
                            ? (
                                props.project.commercialTransmissionMethodList
                                .map(comTransMethod => {
                                    let selectedTransmisstions = selectedTransmissionMethodAndLevel['comTransMethod']

                                    if(comTransMethod.transmissionMethod.id != OTHER_ID){
                                        selectedTransmisstions.push({
                                            'transmissionMethodId': comTransMethod.transmissionMethod.id,
                                            note: comTransMethod.transmissionMethod.name
                                        })
                                        return setSelectedTransmissionMethodAndLevel(previousState => (
                                            { ...previousState,
                                                'comTransMethod': selectedTransmisstions
                                            }
                                        ))
                                    }

                                    selectedTransmisstions.push(
                                        {
                                            'transmissionMethodId': comTransMethod.transmissionMethod.id,
                                            note: comTransMethod.note
                                        }
                                    )
                                    setSelectedTransmissionMethodAndLevel(previousState => (
                                        { ...previousState,
                                            'comTransMethod': selectedTransmisstions
                                        }
                                    ))
                                    setOtherInputs(previousState => ({...previousState, comTransMethod: {
                                        name: 'Ph????ng th???c chuy???n giao',
                                        label: 'Nh???p t??n ph????ng th???c',
                                        value: comTransMethod.note
                                    }}))
                                    return setOtherInputOpen(previousState => ({...previousState, comTransMethod: true}))
                                })
                            )
                            : null
                    ): null
                ) : (
                    selectedTransmissionMethodAndLevel['comTransMethod']
                        .map(comTransMethod => {
                            return comTransMethod
                        })
                ),
                scope: props.project ? props.project.scope : 'scope useEffect',
                price: props.project ? props.project.price : '',
                challenge: props.project ? props.project.challenge : 'challenge',
                solution: props.project ? props.project.solution : 'solution',
                benefit: props.project ? props.project.benefit : 'benefit',
                isHighlight: props.project ? (props.project.isHighlight ? props.project.isHighlight : false) : false,
                sendEmail: props.project ? (props.project.sendEmail ? props.project.sendEmail : true) : false,
                template: props.project ? (props.project.template ? props.project.template : 1) : 1,
                inspectorId: props.project ? (props.project.inspectorId ? props.project.inspectorId : 1) : 1,
                number: props.project ? (props.project.number ? props.project.number : 0) : 0,
                
            })
        }

        console.log('render Stepper useEffect after: ', project);

        // setupBeforeUnloadListener()
        // if(isProjectDontSaved){
        //     const unloadCallback = (event) => {
        //         event.preventDefault();
        //         event.returnValue = "";
        //         doSomethingBeforeUnload()
                
        //         return "";
        //     };  
    
        //     window.addEventListener("beforeunload", unloadCallback);
        //     return () => window.removeEventListener("beforeunload", unloadCallback);
        // }
        
    },[])

    useEffect(() => {
        if(project){
            if(statusId === 4 ){
                onSubmit();   
            }
        }
    },[statusId])

    useEffect(() => {
        if(isProjectDontSaved){
            const unloadCallback = (event) => {
                event.preventDefault();
                event.returnValue = "";
                doSomethingBeforeUnload()
                
                return "";
            };  
    
            window.addEventListener("beforeunload", unloadCallback);
            return () => window.removeEventListener("beforeunload", unloadCallback);
        }
    })

   
    

    //Event n??y ??ang ko c?? t??c d???ng trong window.addEventListener("beforeunload", unloadCallback);
    const doSomethingBeforeUnload = () => {
        console.log('doSomethingBeforeUnload', duAnThuongMai)
        //Ch??a ch???y ???????c ch??? n??y
        history.push({
            pathname: '/projects/new',
            search: '?query=abc',
            state: { 
                projectTemp: duAnThuongMai,
                shouldBlockNavigation: false 
            }
        })
        // onSubmit();
        props.block_navigation();
        props.createTempProject(duAnThuongMai);
    }
    

    const duAnThuongMai = {
        companyName: project ? project.companyName : '',
        address: project ? project.address : '',
        phoneNumber: project ? project.phoneNumber : '',
        fax: project ? project.fax : 'fax duAnThuongMai',
        email: project ? project.email : '',
        website: project ? project.website : '',
        name: project ? project.name : '',
        shortDescription: project ? project.shortDescription : '',
        inspectorId: userIdState,
        statusId: project ? project.statusId : '', // L??u nh??p 0-ko l??u, 1-l??u nh??p, 2-ch??? duy???t, 3...
        isHighlight: project ? project.isHighlight : false,
        sendEmail: project ? project.sendEmail : false,
        userId: project ? userIdState : '',
        author: project ? project.author : '',
        fieldIdList: project ? project.fieldIdList : [], // L??nh v???c ph??t tri???n
        process: project ? project.process : '',
        advantage: project ? project.advantage : '',
        comDevLevel: selectedTransmissionMethodAndLevel ? selectedTransmissionMethodAndLevel['comDevLevel'] : [],
        comTransMethod: selectedTransmissionMethodAndLevel ? selectedTransmissionMethodAndLevel['comTransMethod'] : [],
        
        scope: project ? project.scope : 'scope duanTHuongMai',
        price: project ? project.price : '',
        productImage: project ? project.productImage : '',
        template: project ? project.template : 1,
        number: project ? project.number : 0
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
        author: project ? project.author : '',
        fieldId: project ? project.fieldIdList : [], // L??nh v???c ph??t tri???n
        challenge: project ? project.challenge : '',
        solution: project ? project.solution : '',
        benefit: project ? project.benefit : '',
        productImage: project ? project.productImage : '',
        template: project ? project.template : 1,
        inspectorId: userIdState,
        statusId: project ? project.statusId : '', // L??u nh??p 0-ko l??u, 1-l??u nh??p, 2-ch??? duy???t, 3...
        isHighlight: project ? project.isHighlight : false,
        sendEmail: project ? project.sendEmail : false,
    }


  const history = useHistory();

    // Mu???n copy object, thay = gtr m???i th?? x??i 
    // vd ki???u nh?? n??y HsetProject( previousState => ({...previousState, advantage: data}))
    // H??? T C??I, dm t???n bi???t bao nhi??u time ????? fix c??i l???i n??y
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
        const name = event.editor.name;

        const data = event.editor.getData();
        setProject( previousState => ({...previousState, [name]: data}))
    }

    const handleInstanceReady = ({ editor }) => {
        console.log('handleInstanceReady editor: ', editor)
    }

    const renderImagePreview = (images) => {
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


    const onProjectImageChange = (files) => {
        console.log('onProjectImageChange', files)
            let formData = new FormData();
            // const config = ckeditorAuthHeader()
            
            formData.append("upload", files[0]);

            axios.post(environment.url.java + '/fileUploads/ckeditor', formData, { headers: authHeader() } )
                .then(response => {
                    console.log('upload iamge: ', response);
                    // console.log('reponse.data.location: ', response.data.location);
                    // const imgSrc = response.data.location;
                    console.log('response.data.url: ', response.data.url);
                    const imgSrc = response.data.url;

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
            URL = PROJECTS_ADMIN_COMMERCIAL_URL
        }
        if(openTab === 1){
            submitProject = duAnNghienCuu; 
            URL = PROJECTS_ADMIN_RESEARCHING_URL
        }

        const userDataLocalStorage = localStorage.getItem("userData");
        const user = JSON.parse(userDataLocalStorage);
        setProject(previousState => ({...previousState, inspectorId: user.id}))
        console.log('onSubmit project: ', project);

        props.unblock_navigation();

        // if(props.type === 'create'){
        //     axios.post(environment.url.java + URL, submitProject)
        //     .then(response => {
        //         if (response) {
        //             dispatch({ type: LOADED})
        //             isProjectDontSaved = false
        //             console.log('client send:', submitProject);
        //             console.log('response:', response);
        //                 setTimeout(() => {
        //                     history.push('/projects')
        //                 }, 500);
        //         }
        //     })
        // }

        // L??m sao ????? x??c ?????nh ???????c n?? l?? project g?????????????
        if(props.type === 'edit'){
            axios.put(environment.url.java_admin + URL + `/${props.id}`, {...submitProject, userId: project.userId},  { headers: authHeader() })
            .then(response => {
                if (response) {
                    dispatch({ type: LOADED})
                    // dispatch({ type: FETCH_PROJECTS})
                    console.log('client send:', submitProject);
                    console.log('response:', response);
                    setTimeout(() => {
                        history.push('/admin/projects')
                    }, 500);
                }
            })
        }

    }

    const handleOtherInputStatusChange = (field) => {
        setOtherInputOpen(previousState => ({...previousState, [field]: !previousState[field]}))
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

    // Ch??a bi???t x??? l?? ch??? n??y sao?
    const handleMultipleCheckboxTransmissionChange = (field, id) => {

        console.log('ID CLICKED: ', field, id);

        const FIELD_LEVEL_ID = 'developmentLevelId'
        const FIELD_TRANSMISSION_ID = 'transmissionMethodId'

        const field_ID = field === 'comDevLevel' ? FIELD_LEVEL_ID : FIELD_TRANSMISSION_ID

        let selected = selectedTransmissionMethodAndLevel[field];
        
        let find = selected.some(item => item[field_ID] === id)
        
        if(find) { 
            selected = selected.filter(item => item[field_ID] !== id)
        } else {
            if(id === OTHER_ID){
                handleOtherInputStatusChange(field)
            }
            else {
                selected.push({
                    [field_ID]: id,
                    note: ''
                })
            }
        }

        setSelectedTransmissionMethodAndLevel(previousState => (
            { ...previousState,
                [field]: selected
            }
        ))
        
    }
  
    

    const renderOtherInputField = (field) => {
        return (
                <section className="flex items-center gap-4">
                    <input 
                        type="checkbox" 
                        id={field} 
                        name={field}
                        checked={isOtherInputOpen[field]}   
                        // onChange={() => handleOtherInputStatusChange(field)}
                        onChange={() => handleMultipleCheckboxTransmissionChange(field, OTHER_ID)}
                    />
                    Kh??c    
                    { isOtherInputOpen[field] && 
                        <section >
                            <TextField 
                                id={`standard-${field}`} 
                                label={otherInputs[field].label} // L???i ch??? n??y l?? do c??i l??nh v???c ch??a ph???i l?? checkbox b??n backend
                                variant="standard"
                                value={ selectedTransmissionMethodAndLevel[field][0] ? selectedTransmissionMethodAndLevel[field][0].note : '' }
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
                                { !isOtherInputOpen[field.fieldName] && (
                                    <input 
                                    key={`${field.fieldName}-${index}`} 
                                    type="checkbox" 
                                    // id={field.fieldName}
                                    checked={   
                                        field.fieldName !== 'fieldIdList'
                                            ? isCheckboxChecked(field, propsData.id)
                                            : isCheckboxChecked(field, OTHER_ID)
                                    } 
                                    name={field.fieldName} 
                                    value={propsData.code}
                                    onChange={ 
                                        () => 
                                            // field.fieldName !== 'fieldIdList' 
                                            // ? 
                                            handleMultipleCheckboxTransmissionChange(field.fieldName, propsData.id) 
                                            // : null
                                            // : handleMultipleCheckboxFieldListChange('fieldIdList', propsData.id)
                                    }
                                />
                                ) }
                                
                                { !isOtherInputOpen[field.fieldName] ? propsData.name : null}
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
                            <CKEditor 
                                id={field.id}
                                name={field.fieldName}
                                activeClass={field.fieldName}
                                initData={project ? project[field.fieldName] : ''}
                                editorUrl="https://cdn.ckeditor.com/4.16.2/full/ckeditor.js"
                                config={{
                                    filebrowserUploadUrl: filebrowserUploadUrl,
                                    removeButtons: removeButtons,
                                    isReadOnly: true,
                                    height: 600,
                                }}
                                onChange={handleCKEditorChange}
                            />
                        </div>
                    </div>
                )
            }
            return null;
        })
    }

    // C??n ch??? c??i l??nh v???c, n?? ??ang l???y theo c??i comDevLevel lu??n
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

    const renderCheckboxCategoryChildren = (field) => {
        let children = [];
        if(field.childOfFieldList.length){
            field.childOfFieldList
                .map(fieldChild => {
                    if(renderCheckboxCategoryChildren(fieldChild)){
                        return children.push({
                            value: `${fieldChild.id}`,
                            label: fieldChild.name,
                            children: renderCheckboxCategoryChildren(fieldChild)
                        })
                    }
                    return children.push({
                        value: `${fieldChild.id}`,
                        label: fieldChild.name,
                    })
                })
        }
        
        if(children.length){
            return children
        }
        return null
    }


    const nodes = props.fields ? props.fields.map(field => {
        if(renderCheckboxCategoryChildren(field)){
            return {
                value: `${field.id}`,
                label: `${ field.name }`,
                // label: <button onClick={(e) => onTest(e, field)} classname="mx-4 my-2 bg-green-500">{ field.name }</button>,
                children: renderCheckboxCategoryChildren(field)
            }
        }
        return {
            value: `${field.id}`,
            label: field.name,
        }
    })
    : [];
    // const nodes = props.categories ? props.categories.map(category => {
    //     if(renderCheckboxCategoryChildren(category)){
    //         return {
    //             value: `${category.code}`,
    //             label: category.name,
    //             children: renderCheckboxCategoryChildren(category)
    //         }
    //     }
    //     return {
    //         value: `${category.id}-${category.code}`,
    //         label: category.name,
    //     }
    // })
    // : [];
    
    
    const onCheckboxTreeViewChecked = (checked) => {
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
                        <TextField 
                            id={field.id} 
                            value={project ? project[field.fieldName] : ''}
                            onChange={(e) => handleContentChange(field.fieldName, e.target.value) }
                            // className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                            className="w-full border-2 border-gray-300 rounded-md"
                            error={project ? field.isRequired : ''} 
                            // minRows={2}
                            multiline
                            rows={4}
                            rowsMax={6}
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

    const onTemplateChange = (templateNumber) => {
        console.log('onTemplateChange', templateNumber);
        // setProject({...project, template: templateNumber});
        setProject(previousState => ({...previousState, template: templateNumber}))
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
            <ProjectPreview project={projectPreview} type={openTab} onSave={onSave} onTemplateChange={onTemplateChange}/>
        );
    };

    const tabs = [
        {
            title: 'D??? ??n th????ng m???i',
            content: renderDuAnThuongMai(),
            type: 'CP'
        },
        {
            title: 'D??? ??n nghi??n c???u',
            //   content: 'Hi???n t???i t??nh n??ng ??ang ph??t tri???n'
            content: renderDuAnNghienCuu(),
            type: 'RP'
        }
    ];

    const onOpenedTabChange = (projectType) => {
        projectType === TYPE_PROJECT_COMMERCIAL ? setOpenTab(0) : setOpenTab(1);
    };

    const renderStep2 = () => {
        return (
        <>
            <Tab 
                tabs={tabs} 
                color="red" 
                openTabChange={onOpenedTabChange} 
                openTabProps={openTab} 
                // props.type === 'edit'
                isEnableToChangeTab={props.type === 'edit' ? false : true}
            />
        </>
        );
    };

    const onStatusChange = (statusId) => {
        setProject(previousState => ({...previousState, statusId}))
    }

    const onCheckboxHightlightChange = (isHighlight) => {
        setProject(previousState => ({...previousState, isHighlight}))
    }

    const onCheckboxSendEmailChange = (sendEmail) => {
        setProject(previousState => ({...previousState, sendEmail}))
    }

    const renderHightlightIndexes = (maxNumber) => {
        let hightlightIndexes = [];
        for (var i = 1; i <= maxNumber; i++) {
            hightlightIndexes.push(i)
        } 
        
        return hightlightIndexes;
    }

    const renderStep3 = () => {

        
        return (
        <>
            <div className="flex gap-2">
                <ComboboxStatus selectedIndex={project ? project.statusId : 1} onStatusChange={onStatusChange} />
                <Checkcbox label="Send email" isChecked={project ? project.sendEmail : true} onCheckboxChange={onCheckboxSendEmailChange} />
                <Checkcbox label="Hightlight" isChecked={props.project ? props.project.isHighlight : true} onCheckboxChange={onCheckboxHightlightChange} />
                {/* inspectorId  - Ng?????i duy???t */}
            </div>
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
            return renderStep3();
        case 3:
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

    const handleValidationGeneralInfo = (project) => {
        // let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        //Name
        if (!project["companyName"]) {
          formIsValid = false;
          errors["companyName"] = "T??n doanh nghi???p kh??ng ???????c ????? tr???ng";
        }
        if (!project["author"]) {
          formIsValid = false;
          errors["author"] = "Nh??m t??c gi??? kh??ng ???????c ????? tr???ng";
        }
        if (!project["address"]) {
          formIsValid = false;
          errors["address"] = "?????a ch??? kh??ng ???????c ????? tr???ng";
        }
        if (!project["phoneNumber"]) {
          formIsValid = false;
          errors["phoneNumber"] = "S??? ??i???n tho???i kh??ng ???????c ????? tr???ng";
        }
        if (!project["address"]) {
          formIsValid = false;
          errors["address"] = "?????a ch??? kh??ng ???????c ????? tr???ng";
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
          errors["email"] = "Email kh??ng ???????c ????? tr???ng";
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
            errors["email"] = "Email kh??ng h???p l???";
          }
        }

        if(project.phoneNumber){
            if(!validator.isMobilePhone(project.phoneNumber)){
                formIsValid = false;
                errors["phoneNumber"] = "S??? ??i???n tho???i kh??ng h???p l???";
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
            errors["name"] = "T??n s???n ph???m kh??ng ???????c ????? tr???ng";
        }
        if (!project["shortDescription"]) {
            formIsValid = false;
            errors["shortDescription"] = "M?? t??? ng???n kh??ng ???????c ????? tr???ng";
        }

        if(openTab === 0){
            if (!project["scope"]) {
                formIsValid = false;
                errors["scope"] = "Ph???m vi kh??ng ???????c ????? tr???ng";
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
        else alertUseAlert.error('H??y ki???m tra l???i c??c th??ng tin nh???p !!!')
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

    // Save nh??p
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
                    })
                }
                
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
                    Tr??? l???i
                </Button>
                {isStepOptional(activeStep) && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                    >
                        B??? qua
                    </Button>
                )}
                <button
                    className="text-white bg-blue-500 stepper--btn"
                    onClick={handleNext}
                >
                    {activeStep === steps.length - 1 ? 'K???t th??c' : 'Ti???p theo'}
                </button>

                {/* <button 
                    className="text-white bg-gray-500 stepper--btn"
                    // onClick={() => setStatusId(2)}
                    onClick={() =>  props.onSaveTemp(duAnThuongMai)}
                >
                    L??u nh??p
                </button> */}

                
            </div>
                
            
        </div>
    );
}


export default connect(
    null,
    { 
        createTempProject,
        block_navigation,
        unblock_navigation 
    }
  )(HorizontalLinearStepper);