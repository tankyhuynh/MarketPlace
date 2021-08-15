import environment from '../../../environments/environment';
import React, { useState } from 'react'
import QuillEditor from '../../editor/QuillEditor';
import axios from 'axios';
import Label from "@material-tailwind/react/Label";


const ProjectCreateQuill = (props) => {

    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [hightlight, setHightlight] = useState("")
    // const [thumbnail, setThumbnail] = useState("")
    // const [files, setFiles] = useState([])

    const onEditorChange = (value) => {
        setContent(value)
    }

    // const onFilesChange = (files) => {
    //     setFiles(files)
    // }

    const onSubmit = (event) => {
        event.preventDefault();

        setName("");
        setHightlight("");
        setContent("");

        // if (user.userData && !user.userData.isAuth) {
        //     return alert('Please Log in first');
        // }

        const variables = {
            name: name,
            hightlight,
            content: content,
            // thumbnail: thumbnail,
            // files: files
            // userID: user.userData._id
        }

        axios.post(environment.url.node + '/projects/createProject', variables)
            .then(response => {
                if (response) {
                   <Label>Successed</Label>

                    setTimeout(() => {
                        props.history.push('/projects')
                    }, 500);
                }
            })
    }


    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto' }} className="flex flex-col gap-4 p-4" >
            <div className="flex justify-between">
                <label className="self-center block mb-2 mr-4 text-sm font-bold text-gray-700" for="username">
                    Project Name
                </label>
                <input
                    onChange={(e) => { setName(e.target.value) }} 
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" 
                />
            </div>
            <div className="flex justify-between">
                <label className="self-center block mb-2 mr-4 text-sm font-bold text-gray-700" for="username">
                   Hightlight
                </label>
                <input
                    onChange={(e) => { setHightlight(e.target.value) }} 
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" 
                />
            </div>
            {/* <div className="flex justify-between">
                <label className="self-center block mb-2 mr-4 text-sm font-bold text-gray-700" for="username">
                   Thumbnail
                </label>
                <input
                    onChange={(e) => { setThumbnail(e.target.value) }} 
                    id="username" 
                    type="file" 
                    className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                />
            </div> */}
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                // onFilesChange={onFilesChange}
            />
            

            <button onClick={onSubmit} className="p-4 bg-green-500 rounded-lg">
                Submit
            </button>
        </div>
    )
}

export default ProjectCreateQuill;
