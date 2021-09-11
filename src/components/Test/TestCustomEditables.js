import '../editor/editables.css'

import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { EditablesContext, theme } from '../editor/editables/EditablesContext';

import EditableParagraph from '../editor/editables/EditableParagraph';
import EditableText from '../editor/editables/EditableText';
import EditableTextArea from '../editor/editables/EditableTextArea';
import EditableNumber from '../editor/editables/EditableNumber';
import EditableLink from "../editor/editables/EditableLink";
import EditableImageUpload from "../editor/editables/EditableImageUpload";
import EditableFileUpload from "../editor/editables/EditableFileUpload";
import EditableBackgroundImage from "../editor/editables/EditableBackgroundImage";
import EditableTimeline from "../editor/editables/EditableTimeline";
import EditableEmbeddedIframe from "../editor/editables/EditableEmbeddedIframe";
import EditableLightboxImageUpload from "../editor/editables/EditableLightboxImageUpload";
import EditableCollection from "../editor/editables/EditableCollection";


// const defaultPageContent = {
//     backgroundImg: { 
//         imageSrc: "https://www.nomadiclabs.ca/img/nomadic-04.jpg" 
//     },
//     title: { 
//         text: "Editable Fields Demo!" 
//     },
//     textarea: { 
//         text: "Check the README on Github for the documentation \n\nHappy editing!" 
//     },
//     subtitle: { 
//         text: "Go ahead and edit this page!" 
//     },
//     paragraph: { 
//         text: "<p>This package makes it easy to implement on-page editing in your awesome React project. Feel free to test it out!</p><p>Toggle <strong>Show editable fields</strong> to switch between the editing interface and the default view.</p>" 
//     },
//     link: { 
//         link: "https://github.com/nomadic-labs/react-easy-editables", anchor: "Source code on Github"
//     },
//     image: { 
//         imageSrc: "https://placekitten.com/400/300", caption: "Picture of an adorable kitten courtesy of https://placekitten.com" 
//     },
//     lightboxImage: { 
//         imageSrc: "https://placekitten.com/600/300", caption: "Picture of an adorable kitten courtesy of https://placekitten.com" 
//     },
//     file: { 
//         filepath: "https://www.nomadiclabs.ca/img/nomadic-04.jpg", filename: "Uploaded file (jpg)" 
//     },
//     timeline: { 
//         spreadsheetId: '1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ', timelines: "Toy Story Movies, Jurassic Park Movies", apiKey: "AIzaSyBT0ozOMS-9tV6HqqMUHsUxqovZ-Jp7UZ8" 
//     },
//     youtubeVideo: {
//       src: "https://www.youtube.com/embed/5qap5aO4i9A",
//       title: "lofi hip hop radio",
//       height: '300',
//       width: '560'
//     },
//     collection: {
//       exItem1: {
//         content: {
//           text: "I'm item 1"
//         }
//       },
//       exItem2: {
//         content: {
//           text: "I'm item 2"
//         }
//       }
//     }
// }

const defaultPageContent = {
    paragraph: { 
        text: "<p>This package makes it easy to implement on-page editing in your awesome React project. Feel free to test it out!</p><p>Toggle <strong>Show editable fields</strong> to switch between the editing interface and the default view.</p>" 
    }
}
  
  
  const collectionItemDefaultContent = {
    content: {
      text: "I'm a new item!"
    }
  }
  
  const RepeatedComponent = ({ content, onSave, ...rest }) => {
    return(
      <div className="demo-items">
        <EditableText content={content} onSave={onSave} {...rest} />
      </div>
    )
  }
  
  const uploadImage = image => {
    return new Promise(resolve => {
  
      const FR = new FileReader();
  
      FR.addEventListener("load", function(e) {
        resolve(e.target.result)
      });
  
      FR.readAsDataURL(image);
    })
  }

  const Test = (props) => {

    // const state = {
    //     showEditingControls: false,
    //     theme: theme,
    //     pageContent: defaultPageContent,
    // }

    const [pageContent, setPageContent] = useState({ paragraph: {text: ''} });
    const [state, setState] = useState('');

    useEffect(() => {
        setPageContent({
            paragraph: {
                text: props.project.author
            }
        });
        setState({
            showEditingControls: false,
            theme: theme,
        })
        console.log('pageContent', pageContent);
        console.log('state', state);
    }, [])

    
    const handleContentChange = field => content => {
        this.setState({
            pageContent: {
            ...this.state.pageContent,
            [field]: content
            }
        })
        console.log('pageContent: ', this.state.pageContent);
    }
    
    const toggleEditingControls = event => {
        event.stopPropagation()
        this.setState({ showEditingControls: !this.state.showEditingControls });
    }
    
    // const { pageContent } = this.state;

    return(
        <EditablesContext.Provider value={ {...state} }>
            <button 
                    className={`btn my-4 ${state.showEditingControls ? 'active' : 'inactive'}`} 
                    onClick={toggleEditingControls}
            >
                    {`${state.showEditingControls ? 'Stop Editing' : 'Start Editing'}`}
            </button>
            <div className="grid-container">
                <div className="flex-item desc">
                    <div className="demo-items">
                        <EditableParagraph 
                            content={pageContent.paragraph} 
                            onSave={handleContentChange("paragraph")}
                        />
                    </div>
                </div>
            </div>


            <footer>
                <small>
                    Footer
                </small>
            </footer>
        </EditablesContext.Provider>
    );
};

export default Test;
