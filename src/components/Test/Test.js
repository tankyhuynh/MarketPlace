import React from 'react';

// import Modal from './TestModal'
// import Editable from './TestEditables'
// import DragAndDrop from '../DragAndDropFile/'
// import Joditditor from './TestJoditEditor'
// import QuillEditor from './TestQuillEditor'
import TinyMCEEditor from './TestTinyMCEEditor'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Test = () => {
  return (
    <>
      <TinyMCEEditor />
      <FaHeart style={{color: 'red', fontSize: '50px'}}/>
      <FaRegHeart style={{color: 'green', fontSize: '50px'}}/>
    </>
  )
}

export default Test;