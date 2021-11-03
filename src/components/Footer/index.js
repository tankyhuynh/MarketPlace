import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="text-base bg-white border-t-2">
            <div className="flex flex-col max-w-lg mx-auto italic">    
                {/* <div className="font-bold">
                    Thông tin vui lòng gửi về Trường Đại học Cần Thơ:
                </div> */}
                <div className="text-xl font-bold">
                    Trường Đại học Cần Thơ
                </div>
                <div>
                    Địa chỉ: Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.
                </div>
                <div>
                    Điện thoại: (84-292) 3832663 Fax: (84-292) 3838474
                </div>
                <Link to={'/'} target="_blank">
                    Email: dhct@ctu.edu.vn
                </Link>
            </div>
        </footer>
    )
}

export default Footer;