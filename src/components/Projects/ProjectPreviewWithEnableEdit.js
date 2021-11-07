/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import '../editor/editables.css'

import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
// import { render } from 'react-dom';
import { EditablesContext, theme } from '../editor/editables/EditablesContext';

import Template1 from '../Template/ProjectShow/Template1'
import Template2 from '../Template/ProjectShow/Template2'

import EditableParagraph from '../editor/editables/EditableParagraph';
import EditableText from '../editor/editables/EditableText';
import EditableImageUpload from '../editor/editables/EditableImageUpload'
// import EditableTextArea from '../editor/editables/EditableTextArea';
// import EditableNumber from '../editor/editables/EditableNumber';
// import EditableLink from "../editor/editables/EditableLink";
// import EditableImageUpload from "../editor/editables/EditableImageUpload";
// import EditableFileUpload from "../editor/editables/EditableFileUpload";
// import EditableBackgroundImage from "../editor/editables/EditableBackgroundImage";
// import EditableTimeline from "../editor/editables/EditableTimeline";
// import EditableEmbeddedIframe from "../editor/editables/EditableEmbeddedIframe";
// import EditableLightboxImageUpload from "../editor/editables/EditableLightboxImageUpload";
// import EditableCollection from "../editor/editables/EditableCollection";
// import { useSelector } from 'react-redux';

    
const initData = {
    address: {
        text: '' 
    },
    advantage: {
        text: '' 
    },
    author: {
        text: '' 
    },
    companyName: {
        text: '' 
    },
    email: {
        text: '' 
    },
    fieldIdList: [],
    comDevLevel: [],
    name: {
        text: '' 
    },
    phoneNumber: {
        text: '' 
    },
    price: {
        text: '' 
    },
    process: {
        text: '' 
    },
    scope: {
        text: '' 
    },
    shortDescription: {
        text: '' 
    },
    status: {
        text: 1 
    },
    comTransMethod: [],
    user: {
        text: 1 
    },
    website: {
        text: '' 
    },
    productImage: {
        imageSrc: '' ,
        caption: '',
        title: ''
    }
}

const NUMBER_OF_TEMPLATES = 2;

//   const collectionItemDefaultContent = {
//     content: {
//       text: "I'm a new item!"
//     }
//   }
  
//   const RepeatedComponent = ({ content, onSave, ...rest }) => {
//     return(
//       <div className="demo-items">
//         <EditableText content={content} onSave={onSave} {...rest} />
//       </div>
//     )
//   }
  
//   const uploadImage = image => {
//     return new Promise(resolve => {
  
//       const FR = new FileReader();
  
//       FR.addEventListener("load", function(e) {
//         resolve(e.target.result)
//       });
  
//       FR.readAsDataURL(image);
//     })
//   }

    const OTHER_LEVELDEVELOP_ID = 4
    const OTHER_TRANSMISSION_ID = 4
    const TYPE_TEMPLATE_PREVIEW = 'preview'
    const TYPE_TEMPLATE_SHOW = 'show'

  
  const ProjectPreview = (props) => {

    const levels = useSelector(state => state.levels);
    const transmissions = useSelector(state => state.transmissions);
    const fields = useSelector(state => state.fields);

    // console.log('levels Selector: ', levels)
    // console.log('fields Selector: ', levels)
    // console.log('ProjectPreview Selector projectType: ', props.type)
    // console.log(props.project)
    //   const fields = useSelector(state => state.fields);
    //   const levels = useSelector(state => state.levels);
    //   const transmissions = useSelector(state => state.transmissions);

    const renderInitDataCommercialProject = {
        address: {
            text: props.project ? props.project.address : '' 
        },
        advantage: {
            text: props.project ? props.project.advantage: '' 
        },
        author: {
            text: props.project ? props.project.author: '' 
        },
        companyName: {
            text: props.project ? props.project.companyName: '' 
        },
        email: {
            text: props.project ? props.project.email: '' 
        },
        fieldIdList: {
            text: props.project.fieldIdList ? (
                (
                    props.project.fieldIdList.length
                    ?   props.project.fieldIdList.map(fieldId => {
                            return Object.values(fields).map(field => {
                                if(field.id == fieldId){
                                    return <div>{ field.name }</div>
                                }
                                return null
                            })
                        })
                    : ''
                ) 
            ) : '' 
        },
        comDevLevel: {
            text: props.project.comDevLevel
                ?   (
                        props.project.comDevLevel.length
                        ?   props.project.comDevLevel.map(projectLevel => {
                                if(projectLevel.developmentLevelId === OTHER_LEVELDEVELOP_ID){
                                    return <div>{ projectLevel.note }</div>
                                }
                                else {
                                    return Object.values(levels).map(level => {
                                        if(level.id === projectLevel.developmentLevelId){
                                            return <div>{ level.name }</div>
                                        }
                                        return null
                                    })
                                }
                            })
                        : ''
                    ) 
                : '' 
        },
        name: {
            text: props.project ? props.project.name: '' 
        },
        phoneNumber: {
            text: props.project ? props.project.phoneNumber: '' 
        },
        price: {
            text: props.project ? props.project.price: '' 
        },
        process: {
            text: props.project ? props.project.process: '' 
        },
        scope: {
            text: props.project ? props.project.scope: '' 
        },
        shortDescription: {
            text: props.project ? props.project.shortDescription: '' 
        },
        status: {
            text: props.project ? props.project.status: '' 
        },
        comTransMethod: {
            text: props.project.comTransMethod
                ?   (
                        props.project.comTransMethod.length
                        ?   props.project.comTransMethod.map(projectTransmission => {
                                if(projectTransmission.transmissionMethodId === OTHER_TRANSMISSION_ID){
                                    return <div>{ projectTransmission.note }</div>
                                }
                                else {
                                    return Object.values(transmissions).map(transmission => {
                                        if(transmission.id === projectTransmission.transmissionMethodId){
                                            return <div>{ transmission.name }</div>
                                        }
                                        return null
                                    })
                                }
                            })
                        : ''
                    ) 
                : ''
        },
        user: {
            text: props.project ? props.project.user: '' 
        },
        website: {
            text: props.project ? props.project.website: '' 
        },
        productImage: {
            // text: props.project ? props.project.productImage: '' 
            imageSrc: props.project ? props.project.productImage: '' ,
            caption: 'Product caption',
            title: 'Product title'
        }
    }
    const renderInitDataProjectResearch = {
        address: {
            text: props.project ? props.project.address : '' 
        },
        author: {
            text: props.project ? props.project.author: '' 
        },
        benefit: {
            text: props.project ? props.project.benefit: '' 
        },
        challenge: {
            text: props.project ? props.project.challenge: '' 
        },
        companyName: {
            text: props.project ? props.project.companyName: '' 
        },
        email: {
            text: props.project ? props.project.email: '' 
        },
        fieldIdList: {
            text: props.project ? props.project.fieldIdList : '' 
        },
        name: {
            text: props.project ? props.project.name: '' 
        },
        phoneNumber: {
            text: props.project ? props.project.phoneNumber: '' 
        },
        price: {
            text: props.project ? props.project.price: '' 
        },
        scope: {
            text: props.project ? props.project.scope: '' 
        },
        shortDescription: {
            text: props.project ? props.project.shortDescription: '' 
        },
        solution: {
            text: props.project ? props.project.solution: '' 
        },
        status: {
            text: props.project ? props.project.status: '' 
        },
        user: {
            text: props.project ? props.project.user: '' 
        },
        website: {
            text: props.project ? props.project.website: '' 
        }
    }

    const [pageContent, setPageContent] = useState(initData);
    const [state, setState] = useState({ theme: theme });
    const [templateNumber, setTemplateNumber] = useState(1);
    const [template, setTemplate] = useState({
        1: <Template1 project={props.project} type={TYPE_TEMPLATE_PREVIEW} projectType={props.type === 0 ? 'CP' : 'RP'} />,
        2: <Template2 project={props.project} type={TYPE_TEMPLATE_PREVIEW} projectType={props.type === 0 ? 'CP' : 'RP'} />,
    })

    useEffect(() => {
        if(props.project){
            console.log('props.project', props.project);
            console.log('props.type', props.type);
            const initData = props.type === 0 ? renderInitDataCommercialProject : renderInitDataProjectResearch 
            setPageContent(initData);
        }
        setState({
            showEditingControls: false,
            theme: theme,
        })
        console.log('pageContent', pageContent);
        console.log('state', state);
    }, [])

    
    const handleContentChange = field => content => {
        console.log('content : ', content);
        setPageContent({
            ...pageContent,
            [field]: content
        })
        console.log('handleContentChange setPageContent: ', pageContent);
        props.onSave(field, content);
    }
    
    // const toggleEditingControls = event => {
    //     event.stopPropagation()
    //     setState({ showEditingControls: !state.showEditingControls, theme: theme });
    // }

    const uploadImage = image => {
        return new Promise(resolve => {
      
          const FR = new FileReader();
      
          FR.addEventListener("load", function(e) {
            resolve(e.target.result)
          });
      
          FR.readAsDataURL(image);
        })
      }
    
    // const { pageContent } = this.state;

    const fieldsGeneral = [
        {
            name: 'Tên đơn vị/ doanh nghiệp',
            value: pageContent ? pageContent.companyName : {},
            fieldName: 'companyName', 
            isUseEditor: false
        },
        {
            name: 'Địa chỉ',
            value: pageContent ? pageContent.address : {},
            fieldName: 'address', 
            isUseEditor: false
        },
        {
            name: 'Số điện thoại',
            value: pageContent ? pageContent.phoneNumber : {},
            fieldName: 'phoneNumber', 
            isUseEditor: false
        },
        {
            name: 'Fax',
            value:pageContent ?  pageContent.fax : {},
            fieldName: 'fax', 
            isUseEditor: false
        },
        {
            name: 'Email',
            value: pageContent ? pageContent.email : {},
            fieldName: 'email', 
            isUseEditor: false
        },
        {
            name: 'Website',
            value: pageContent ? pageContent.website : {},
            fieldName: 'website', 
            isUseEditor: false
        }
    ]
    const fieldsDetailCommercialProject = [
        {
            name: 'Tên giải pháp',
            value: pageContent ? pageContent.name: {},
            fieldName: 'name', 
            isUseEditor: false
        },
        {
            name: 'Mô tả ngắn',
            value: pageContent ? pageContent.shortDescription: {},
            fieldName: 'shortDescription', 
            isUseEditor: false
        },
        {
            name: 'Lĩnh vực áp dụng',
            value: pageContent ? pageContent.fieldIdList: {},
            fieldName: 'fieldIdList', 
            isUseEditor: false
        },
        {
            name: 'Mức độ phát triển',
            value: pageContent ? pageContent.comDevLevel : {},
            fieldName: 'comDevLevel', 
            isUseEditor: false
        },
        {
            name: 'Phương thức chuyển giao',
            value: pageContent ? pageContent.comTransMethod : {},
            fieldName: 'comTransMethod', 
            isUseEditor: false
        },
        {
            name: 'Mô tả quy trình công nghệ',
            value: pageContent ? pageContent.process: {},
            fieldName: 'process', 
            isUseEditor: true
        },
        {
            name: 'Ưu điểm',
            value: pageContent ? pageContent.advantage: {},
            fieldName: 'advantage', 
            isUseEditor: true
        },
        {
            name: 'Phạm vi thương mại hóa',
            value: pageContent ? pageContent.scope: {},
            fieldName: 'scope', 
            isUseEditor: false
        },
        {
            name: 'Chào giá tham khảo',
            value: pageContent ? pageContent.price: {},
            fieldName: 'price', 
            isUseEditor: false
        },
        {
            name: 'Hình ảnh sản phẩm',
            value: pageContent ? (
                                <EditableImageUpload
                                    content={pageContent ? pageContent.productImage : ''}
                                    onSave={handleContentChange("productImage")}
                                    maxSize={1024*1024*2}
                                    showCaption={true}
                                    uploadImage={uploadImage}
                                />
                                ) 
                                : {},
            fieldName: 'productImage',
            isUseEditor: false
        }
    ]
    const fieldsDetailResearchProject = [
        {
            name: 'Tên giải pháp',
            value: pageContent ? pageContent.name: {},
            fieldName: 'name',
            isUseEditor: false
        },
        {
            name: 'Mô tả ngắn',
            value: pageContent ? pageContent.shortDescription: {},
            fieldName: 'shortDescription',
            isUseEditor: false
        },
        {
            name: 'Lĩnh vực áp dụng',
            value: pageContent ? pageContent.fieldIdList: {},
            fieldName: 'fieldIdList',
            isUseEditor: false
        },
        {
            name: 'Thách thức',
            value: pageContent ? pageContent.challenge: {},
            fieldName: 'challenge',
            isUseEditor: true
        },
        {
            name: 'Giải pháp',
            value: pageContent ? pageContent.solution: {},
            fieldName: 'solution',
            isUseEditor: true
        },
        {
            name: 'Thuận lợi',
            value: pageContent ? pageContent.benefit: {},
            fieldName: 'benefit',
            isUseEditor: true
        },
        {
            name: 'Hình ảnh sản phẩm',
            value: pageContent ? (
                                <EditableImageUpload
                                    content={pageContent ? pageContent.productImage : ''}
                                    onSave={handleContentChange("productImage")}
                                    maxSize={1024*1024*2}
                                    showCaption={true}
                                    uploadImage={uploadImage}
                                />
                                ) 
                                : {},
            fieldName: 'productImage',
            isUseEditor: false
        }
    ]

    const renderProjectGeneralInfo = () => {
        return fieldsGeneral.map((field, index) => {
            return (
                <div key={index} className="flex flex-col mt-2">
                    <span className="text-xl">{field.name}</span>
                    <EditableText 
                        content={field.value} 
                        onSave={handleContentChange(field.fieldName)}
                    />
                </div>
            )
        })
    }   
    const renderProjectDetailInfo = () => {
        const details = props.type === 0 ? fieldsDetailCommercialProject : fieldsDetailResearchProject
        return details.map((field, index) => {
            if(!field.isUseEditor){
                return (
                    <div key={index} className="flex flex-col mt-2">
                        <span className="text-xl">{field.name}</span>
                        <EditableText 
                            content={field.value} 
                            onSave={handleContentChange(field.fieldName)}
                        />
                    </div>
                )
            }
            return (
                <div key={index} className="flex flex-col mt-2">
                        <span className="text-xl">{field.name}</span>
                        <EditableParagraph 
                            content={field.value} 
                            onSave={handleContentChange(field.fieldName)}
                        />
                    </div>
            )
        })
    } 

    const renderProductImage = () => {
        console.log('renderProductImage: ', fieldsDetailCommercialProject.slice(-1)[0])
        const productImage = props.type === 0 ? fieldsDetailCommercialProject.slice(-1)[0] : fieldsDetailResearchProject.slice(-1)[0]
        if(productImage){
            return (
                <EditableImageUpload
                    content={pageContent ? pageContent.productImage : ''}
                    onSave={handleContentChange("productImage")}
                    maxSize={1024*1024*2}
                    showCaption={true}
                    uploadImage={uploadImage}
                />
            )
        }
        return 'Nothing to show';
    }

    const renderTemplate1 = () => {
        return (
            <div className="grid px-2 py-4 border-2 place-content-center">
                {/* Thông tin chung */}
                <div>
                    <span className="text-3xl font-bold">Thông tin chung</span>
                        { renderProjectGeneralInfo() }
                </div>
                
                        
                    {/* Thông tin chi tiết */}
                <div className="mt-2">
                    <span className="text-3xl font-bold">Thông tin chi tiết</span>
                    { renderProjectDetailInfo() }
                </div>
                { renderProductImage() }
            </div>
        );
    }
    const renderTemplate2 = () => {
        return (
            <div 
                className="grid grid-cols-2 gap-4 px-2 py-4 border-2 rounded-lg "
            >
                {/* Thông tin chung */}
                <div className="mx-auto">
                    <span className="text-3xl font-bold text-gray-500">Thông tin chung</span>
                        { renderProjectGeneralInfo() }
                </div>
                        
                    {/* Thông tin chi tiết */}
                    <div className="mx-auto">
                    <span className="text-3xl font-bold text-gray-500">Thông tin chi tiết</span>
                    { renderProjectDetailInfo() }
                    { renderProductImage() }
                </div>
            </div>
        );
    }

    const renderTemplate = () => {
        // if(template){
        //     // return renderTemplate1()
        //     return <Template1 project={props.project} type={TYPE_TEMPLATE_PREVIEW} projectType={props.type === 0 ? 'CP' : 'RP'} />
        // }
        // return renderTemplate2()
        return template[templateNumber]
        
    }

    const onTemplateChange = () => {
        let templateIndex = templateNumber
        if(templateNumber === NUMBER_OF_TEMPLATES) {
            templateIndex = 1
        }
        else templateIndex++

        setTemplateNumber(templateIndex)
        props.onTemplateChange(templateIndex)
    }

    return (
        <>
            <EditablesContext.Provider value={ {...state} }>
                <div className="flex gap-2">
                    {/* <button 
                            className={`btn my-4 ${state.showEditingControls ? 'active' : 'inactive'}`} 
                            onClick={toggleEditingControls}
                    >
                            {`${state.showEditingControls ? 'Dừng chỉnh sửa' : 'Chỉnh sửa'}`}
                    </button> */}

                    {/* <button
                        onClick={() => onTemplateChange()}
                        className={`btn__changeTemplate my-4 bg-green-500`} 
                    >
                        Đổi mẫu
                    </button> */}
                </div>
                
            { renderTemplate() }

            </EditablesContext.Provider>
        </>
        
    );
};

export default ProjectPreview;
