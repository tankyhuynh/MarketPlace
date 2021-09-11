import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function DrapAndDrop(props) {
  const handleChange = (file) => {
    props.handleChange(file);
  };
  return (
    <div className="App">
        <h1>Hello To Drag & Drop Files</h1>
        <FileUploader 
            handleChange={handleChange} 
            name="file" 
            types={fileTypes}
            multiple 
        />
    </div>
  );
}
