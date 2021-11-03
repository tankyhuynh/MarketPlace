import environment from '../../environments/environment'

import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import axios from 'axios';


import image from '../../assets/ReseacherG/infectious-disease-researcher-lab-test-petri-microscope.jpg'

class MyEditor extends React.Component {

    state = {
        imageURL: ''
    }

    config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    formData = new FormData();
    
   

    onClickSave = (e) => {
        e.preventDefault()
        console.log('!this.editor: ', this.editor);
        if (this.editor) {
        // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
        // drawn on another canvas, or added to the DOM.
            const canvas = this.editor.getImage().toDataURL()

            this.formData.append("upload", canvas);

            // axios.post(environment.url.java + '/fileUploads/ckeditor', this.formData, this.config)
            //     .then(response => {
            //         console.log('onClickSave response: ', response);
            //     })
            
            fetch(canvas)
                .then(res => res.blob())
                // .then(blob => {
                //     console.log('onClickSave blob: ', blob);
                // })
                .then(blob => (this.setState({ imageURL : window.URL.createObjectURL(blob) })))
                .then(result => console.log('result: ', result));


        // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = this.editor.getImageScaledToCanvas()

            console.log('this.editor: ', this.editor);
            console.log('canvas: ', canvas);
            console.log('canvasScaled: ', canvasScaled);
        }
    }

  setEditorRef = (editor) => (this.editor = editor)

  render() {
    console.log('this.editor this.imageURL: ', this.state.imageURL);

    return (
      <>
        <div className='flex gap-6'>
            <AvatarEditor
                ref={this.setEditorRef}
                image={image}
                width={250}
                height={250}
                border={50}
                scale={1.2}
            />
            <div className="bg-gray-500">
                Img preview
                <img 
                    src={this.state.imageURL}
                    alt={this.state.imageURL}
                    style={{ width: '250px', height: '250px'}}
                />
            </div>
        </div>
        <button
            onClick={e => this.onClickSave(e)}
        >
            Save
        </button>
      </>
    )
  }
}

export default MyEditor