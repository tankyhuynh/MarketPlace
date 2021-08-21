// import environment from '../../../environments/environment';
// import axios from 'axios';
import React from 'react';
// import { useHistory } from "react-router-dom";

import Stepper from '../Stepper/Stepper';


const ProjectCreate = () => {
    // let history = useHistory();
    // const variables = {
    //     ten: "demo",
    //     hightlight: "hightlight",
    //     content: "test"
    // };

    // const onStepperFinished = () => {
    //     axios.post(environment.url.node + '/projects/createProject', variables)
    //         .then(response => {
    //             if (response) {

    //                 setTimeout(() => {
    //                     history.push('/projects')
    //                 }, 500);
    //             }
    //         })
    // };

    const steps = [
        'Thông tin chung', 
        'Thông tin về giải pháp, sản phẩm, công nghệ, thiết bị sẵn sàng chuyển giao', 
        'Xem kết quả'
    ];

    return (
        <>
            <Stepper steps={steps}  />
        </>
    );
};

export default ProjectCreate;