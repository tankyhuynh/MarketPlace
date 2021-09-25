import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

const Basic = ({ onChange }) => {
  const handleChange = () => {
    onChange()
  }

  return (
    <DropzoneArea
      acceptedFiles={['image/*']}
      dropzoneText={"Drag and drop an image here or click"}
      onChange={handleChange}
    />
  )
}

export default Basic;
