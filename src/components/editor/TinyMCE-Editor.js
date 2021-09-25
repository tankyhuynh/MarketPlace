import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const API_KEY = 'syuqwfs5tbdh646gel0tn1dgss75z5hqguv5n3aydee2zkhs';
const initialValues = "<p>This is the initial content of the editor.</p>"

const TinyMCEEditor = ({ name, value, onChange }) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleEditorChange = (editorContent) => {
    onChange({ target: { name, value: editorContent } });
  }

  return (
    <>
      <Editor
        apiKey= {API_KEY}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={ value ? value : initialValues }
        value={value}
        tagName={name}
        init={{
            height: 500,
            menubar: 'insert',
            plugins: [
                'advlist autolink lists link image imagetools image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'media textcolor',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
                'bold italic forecolor backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'link image |' +
                'media |' +
                'removeformat | help',
            images_upload_url: 'https://marketplace-v2-main.herokuapp.com/api/v2/fileUploads/tinymce',

            file_picker_callback: function(callback, value, meta) {
              console.log(callback)
              console.log(value)
              console.log(meta)
              if (meta.filetype === 'file') {
                  //callback('mypage.html', {text: 'My text'});
              }
              if (meta.filetype === 'image') {

              }
              if (meta.filetype === 'media') {
                    // var input = document.getElementById('my-file');
                    // input.click();
                    // input.onchange = function () {
                    //     var file = input.files[0];
                    //     var reader = new FileReader();
                    //     reader.onload = function (e) {
                    //         console.log('name',e.target.result);
                    //         callback(e.target.result, {
                    //             alt: file.name
                    //         });
                    //     };
                    //     reader.readAsDataURL(file);
                    // };
                }
              },
              
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}  
        // onChange={handleEditorChange}
        onChange={handleEditorChange}
      />
      <button onClick={log}>Log editor content</button>
      <input id="my-file" type="file" name="my-file" style={{display:"none"}} onChange="" />
    </>
  );
}

export default TinyMCEEditor;