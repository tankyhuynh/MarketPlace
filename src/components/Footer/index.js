import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white border-t-2">
            <div className="flex flex-col w-2/3 max-w-lg gap-2 mx-auto italic text-left ">
                <div className="font-bold">
                    Thông tin vui lòng gửi về đơn vị đầu mối của Sở Khoa học và Công nghệ:
                </div>
                <div>
                    Trung tâm Thông tin Khoa học và Công nghệ Cần Thơ
                </div>
                <div>
                    Địa chỉ: Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.
                </div>
                <div>
                    Điện thoại: (84-292) 3832663 Fax: (84-292) 3838474
                </div>
                <div>
                    Email: dhct@ctu.edu.vn
                </div>
            </div>
        </footer>
    )
}

export default Footer;