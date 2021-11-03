import environment from '../../../environments/environment';

import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { CKEditor } from 'ckeditor4-react';

import { TextField  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const filebrowserUploadUrl = environment.url.java +  '/fileUploads/ckeditor';
const removeButtons = 'PasteFromWord'

const AdminIntroduction = (props) => {

    const [value, setValue] = useState(props.about ? props.about : {});

    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    } 

    const handleCKEditorChange = (event, editor) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        
        handleChange(name, data)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(value)
    }

    

    return (
        <div className="flex flex-col gap-6">
             <Link to={'/admin/abouts'}>
                <ArrowBackIcon />
            </Link>
            <div className="mx-6">
                <div className="mb-4 text-xl font-bold text-center uppercase">
                    { props.about ? 'Sửa giới thiệu' : 'Thêm giới thiệu' }
                </div>
                <div className="flex flex-col gap-2">
                    <TextField 
                        id="outlined-basic" 
                        label={`Tên`} 
                        variant="outlined"
                        fullWidth
                        className="w-full"
                        defaultValue={value ? value.name : ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <CKEditor 
                        id={'content'}
                        name={'content'}
                        activeClass={'content'}
                        initData={value ? value.content : ''}
                        editorUrl="https://cdn.ckeditor.com/4.16.2/full/ckeditor.js"
                        config={{
                            filebrowserUploadUrl: filebrowserUploadUrl,
                            removeButtons: removeButtons,
                            isReadOnly: true,
                            height: 400
                        }}
                        onChange={handleCKEditorChange}
                    />
                </div>
                <button 
                    onClick={e => onSubmit(e)}
                    className="float-right px-4 py-2 mt-2 text-white bg-green-500 rounded-lg"
                >
                    { props.about ? 'Sửa' : 'Thêm' }
                </button>
            </div>
        </div>
    )
}

export default AdminIntroduction;