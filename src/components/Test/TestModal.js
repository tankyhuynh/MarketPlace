import React from 'react';

import ConfirmModal from '../Modal/ConfirmModal';
import InputModal from '../Modal/InputModal';

const TestModal = () => {

    const modal = {
        title: 'Title',
        content: 'Content'
    }
    return (
        <div className="flex gap-2 mt-2">
            <ConfirmModal modal={modal} />
            <InputModal />
        </div>
    )
}

export default TestModal;