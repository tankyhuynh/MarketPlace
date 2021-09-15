import './modal.css'

import { useState } from 'react';
import { CustomDialog, useDialog } from 'react-st-modal';




const InputModal = (props) => {
    const [value, setValue] = useState();

    const { title, content } = props;

    const CustomDialogContent = () => {
        const dialog = useDialog();
      
        return (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <input
              type="text"
              value={content}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <button
              onClick={() => {
                // Сlose the dialog and return the value
                dialog.close(value);
              }}
            >
              Custom button
            </button>
          </div>
        );
      }

    const onClick = async() => {
        await CustomDialog(<CustomDialogContent />, {
            title: 'Custom Dialog',
            showCloseIcon: true,
        });
    }
    
    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={onClick}
                className="bg-yellow-500 modal--btn"
            >
                Custom
            </button>
            <span className="text-yellow-500">{ value }</span>
        </div>
    );
}

export default InputModal;
