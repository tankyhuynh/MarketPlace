/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

import { createContact } from '../../actions/contact'

import Form from './FormSubmit'
import { columns } from './table-definition'

const items = [
    {
        name: 'Địa chỉ của chúng tôi',
        icon: <LocationOnIcon color="primary" fontSize="large" />,
        value: (
            <section className="font-medium">
                Đại học Cần Thơ
                Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
            </section>
        )
    },
    {
        name: 'Email chúng tôi',
        icon: <EmailIcon color="primary" fontSize="large" />,
        value: (
            <section className="font-medium">
                dhct@ctu.edu.vn
            </section>
        )
    },
    {
        name: 'Gọi cho chúng tôi',
        icon: <CallIcon color="primary" fontSize="large" />,
        value: (
            <section className="font-medium">
                Điện thoại: (84-292) 3832663 Fax: (84-292) 3838474
            </section>
        )
    }
]

const formConfig = {
    title: "Thông tin liên hệ",
    button_text_ok: 'Gửi',
    button_text_cancel: 'Hủy'
}

const Contact = (props) => {

    const alertUseAlert = useAlert()
 
    // Muốn canh giữa nội dung trong 1 block = items-center justify-center
    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <section key={index} className="grid items-center justify-center grid-cols-12 gap-2 bg-white">
                    <section className="col-span-1 col-start-2">
                        { item.icon }
                    </section>
                    <section className="col-span-10">
                        {/* <section className="text-2xl">
                            { item.name }
                        </section> */}
                        <section className="text-xl">
                            { item.value }
                        </section>
                    </section>
                </section>
                // <section key={index} className="flex flex-col items-center justify-center gap-2 bg-white">
                //     <section>
                //         { item.icon }
                //     </section>
                //     <section className="text-2xl">
                //         { item.name }
                //     </section>
                //     <section className="text-xl">
                //         { item.value }
                //     </section>
                // </section>
            )
        })
    }

    const onSubmit = (value) => {
        console.log('FormEdit onSubmit contact: ', value);
        props.createContact(value)
        alertUseAlert.show('Đã gửi liên hệ thành công!')
    }
 
    return (
        <div className="flex flex-col gap-12 mt-4">
            <div className="flex flex-col gap-4">
                <div className="text-3xl font-extrabold text-center text-blue-500">
                    Liên hệ với chúng tôi
                </div> 
                {/* <div className="font-bold text-center">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </div>  */}
            </div>
            <div className="flex gap-4 mx-auto">
                <section className="flex items-center justify-center text-center bg-white">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841518408644!2d105.76842661474251!3d10.029933692830634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1634910577020!5m2!1svi!2s" 
                        width="600" 
                        height="600" 
                        style={{ border: 0 }} 
                        allowfullscreen="" 
                        loading="lazy"
                    ></iframe>
                </section>
                <section className="flex flex-col gap-4 my-auto ">
                    <section className="flex flex-col gap-2 px-1">
                        { renderItems() }
                    </section>
                    <section className="">
                        <Form 
                            formConfig={formConfig}
                            domains={columns} 
                            onSubmit={onSubmit}
                        />
                    </section>
                </section>
                
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return { 
//         contacts:  Object.values(state.contacts),
//     };
// }

export default connect(
    null, 
    { createContact }
)(Contact);