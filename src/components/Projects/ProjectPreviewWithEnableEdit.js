/* eslint-disable react-hooks/exhaustive-deps */
import '../editor/editables.css'

import React, { useEffect, useState } from 'react';
// import { render } from 'react-dom';
import { EditablesContext, theme } from '../editor/editables/EditablesContext';

import EditableParagraph from '../editor/editables/EditableParagraph';
import EditableText from '../editor/editables/EditableText';
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
    field: {
        text: '' 
    },
    levelDevelopment: {
        text: 1 
    },
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
    transmissionMethod: {
        text: 1 
    },
    user: {
        text: 1 
    },
    website: {
        text: '' 
    }
}

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

  
  const ProjectPreview = (props) => {

    console.log(props.project)
    //   const fields = useSelector(state => state.fields);
    //   const levels = useSelector(state => state.levels);
    //   const transmissions = useSelector(state => state.transmissions);

    const renderInitData = {
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
        field: {
            text: props.project ? props.project.field : '' 
        },
        levelDevelopment: {
            text: props.project ? props.project.levelDevelopment : '' 
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
        transmissionMethod: {
            text: props.project ? props.project.transmissionMethod : '' 
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
    const [template, setTemplate] = useState(1);

    useEffect(() => {
        if(props.project){
            console.log('props.project', props.project);
            setPageContent(renderInitData);
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
    
    const toggleEditingControls = event => {
        event.stopPropagation()
        setState({ showEditingControls: !state.showEditingControls, theme: theme });
    }
    
    // const { pageContent } = this.state;

    const fieldsGeneral = [
        {
            name: 'Tên đơn vị/ doanh nghiệp',
            value: pageContent ? pageContent.companyName : {},
            fieldName: 'companyName'
        },
        {
            name: 'Địa chỉ',
            value: pageContent ? pageContent.address : {},
            fieldName: 'address'
        },
        {
            name: 'Số điện thoại',
            value: pageContent ? pageContent.phoneNumber : {},
            fieldName: 'phoneNumber'
        },
        {
            name: 'Fax',
            value:pageContent ?  pageContent.fax : {},
            fieldName: 'fax'
        },
        {
            name: 'Email',
            value: pageContent ? pageContent.email : {},
            fieldName: 'email'
        },
        {
            name: 'Website',
            value: pageContent ? pageContent.website : {},
            fieldName: 'website'
        }
    ]
    const fieldsDetail = [
        {
            name: 'Tên giải pháp',
            value: pageContent ? pageContent.name: {},
            fieldName: 'name'
        },
        {
            name: 'Mô tả ngắn',
            value: pageContent ? pageContent.shortDescription: {},
            fieldName: 'shortDescription'
        },
        {
            name: 'Lĩnh vực áp dụng',
            value: pageContent ? pageContent.field: {},
            fieldName: 'field'
        },
        {
            name: 'Mức độ phát triển',
            value: pageContent ? pageContent.levelDevelopment: {},
            fieldName: 'levelDevelopment'
        },
        {
            name: 'Phương thức chuyển giao',
            value: pageContent ? pageContent.transmissionMethod: {},
            fieldName: 'transmissionMethod'
        },
        {
            name: 'Mô tả quy trình công nghệ',
            value: pageContent ? pageContent.process: {},
            fieldName: 'process'
        },
        {
            name: 'Ưu điểm',
            value: pageContent ? pageContent.advantage: {},
            fieldName: 'advantage'
        },
        {
            name: 'Phạm vi thương mại hóa',
            value: pageContent ? pageContent.scope: {},
            fieldName: 'scope'
        },
        {
            name: 'Chào giá tham khảo',
            value: pageContent ? pageContent.price: {},
            fieldName: 'price'
        },
        {
            name: 'Hình ảnh sản phẩm',
            value: pageContent ? pageContent.image: {},
            fieldName: 'image'
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
        return fieldsDetail.map((field, index) => {
            if(field.fieldName !== 'process' && field.fieldName !== 'advantage'){
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
                </div>
            </div>
        );
    }

    const renderTemplate = () => {
        if(template){
            return renderTemplate1()
        }
        return renderTemplate2()
        
    }

    return (
        <>
            <EditablesContext.Provider value={ {...state} }>
                <div className="flex gap-2">
                    <button 
                            className={`btn my-4 ${state.showEditingControls ? 'active' : 'inactive'}`} 
                            onClick={toggleEditingControls}
                    >
                            {`${state.showEditingControls ? 'Dừng chỉnh sửa' : 'Chỉnh sửa'}`}
                    </button>

                    <button
                        onClick={() => setTemplate(!template)}
                        className={`btn__changeTemplate my-4 bg-green-500`} 
                    >
                        Đổi mẫu
                    </button>
                </div>
                
            { renderTemplate() }

            </EditablesContext.Provider>
        </>
        
    );
};

export default ProjectPreview;
