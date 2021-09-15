import './modal.css'

import React, { useState } from 'react';

import { Confirm } from 'react-st-modal';

const ConfirmModal = (props) => {

    const { title, content } = props.modal;
    const [message, setMessage] = useState('');

    const onClick = async() => {
        const result = await Confirm(title, content);
        result ? setMessage('You confirm') : setMessage('You cancel')
    }

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={onClick}
                className="bg-green-400 modal--btn"
            >
                Confirm
            </button>
            <span className="text-green-400">{ message }</span>
        </div>
    );
}

export default ConfirmModal;