import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

// const API_KEY = 'syuqwfs5tbdh646gel0tn1dgss75z5hqguv5n3aydee2zkhs';
const API_KEY = '6n4fi31o2yc4c5pu6nd2a6cvzzy0td26ju6yiftndwd9ngdo';
// const initialValues = "<p>This is the initial content of the editor.</p>"

const TinyMCEEditor = ({ name, value, onChange }) => {
  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log('editorRef.current.getContent()', editorRef.current.getContent());
  //   }
  // };

  const handleEditorChange = (editorContent) => {
    onChange({ target: { name, value: editorContent } });
  }

  return (
    <>
      <Editor
        apiKey= {API_KEY}
        // key={key}
        onInit={(evt, editor) => editorRef.current = editor}
        // initialValue={ value ? value : "initialValue" }
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
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}  
        // onChange={handleEditorChange}
        onChange={handleEditorChange}
      />
      {/* <button onClick={log}>Log editor content</button> */}
      <input id="my-file" type="file" name="my-file" style={{display:"none"}} onChange="" />
    </>
  );
}

export default TinyMCEEditor;