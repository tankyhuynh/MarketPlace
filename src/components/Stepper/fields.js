export const fields = {
    generalInfo: {
        companyName: {
            id: 'companyName',
            label: 'Tên doanh nghiệp',
            fieldName: 'companyName',
            type: 'text'
        },
        author: {
            id: 'author',
            label: 'Nhóm tác giả',
            fieldName: 'author',
            type: 'text'
        },
        address: {
            id: 'address',
            label: 'Địa chỉ',
            fieldName: 'address',
            type: 'text'
        },
        phoneNumber: {
            id: 'phoneNumber',
            label: 'Số điện thoại',
            fieldName: 'phoneNumber',
            type: 'text'
        },
        fax: {
            id: 'fax',
            label: 'Fax',
            fieldName: 'fax',
            type: 'text'
        },
        email: {
            id: 'email',
            label: 'Email',
            fieldName: 'email',
            type: 'text'
        },
        website: {
            id: 'website',
            label: 'Website',
            fieldName: 'website',
            type: 'text'
        },
    },
    productInfo: {
        commercial: {
            name: {
                id: 'name',
                label: 'Tên giải pháp, sản phẩm',
                fieldName: 'name',
                type: 'text'
            },
            shortDescription: {
                id: 'shortDescription',
                label: 'Mô tả ngắn',
                fieldName: 'shortDescription',
                type: 'textarea'
            },
            process: {
                id: 'process',
                label: 'Mô tả quy trình công nghệ',
                fieldName: 'process',
                type: 'editor'
            },
            fieldIdList: {
                id: 'fieldIdList',
                label: 'Lĩnh vực',
                fieldName: 'fieldIdList',
                type: 'checkboxTreeView'
            },
            advantage: {
                id: 'advantage',
                label: 'Ưu điểm',
                fieldName: 'advantage',
                type: 'editor'
            },
            comDevLevel: {
                id: 'comDevLevel',
                label: 'Mức độ phát triển',
                fieldName: 'comDevLevel',
                type: 'checkbox'
            },
            comTransMethod: {
                id: 'comTransMethod',
                label: 'Phương thức chuyển giao',
                fieldName: 'comTransMethod',
                type: 'checkbox'
            },
            scope: {
                id: 'scope',
                label: 'Phạm vi thương mại hóa',
                fieldName: 'scope',
                type: 'text'
            },
            price: {
                id: 'price',
                label: 'Chào giá tham khảo',
                fieldName: 'price',
                type: 'text'
            },
            productImage: {
                id: 'productImage',
                label: 'Hình ảnh tổng thể',
                fieldName: 'productImage',
                type: 'image'
            },
        },
        researching: {
            name: {
                id: 'name',
                label: 'Tên giải pháp, sản phẩm',
                fieldName: 'name',
                type: 'text'
            },
            shortDescription: {
                id: 'shortDescription',
                label: 'Mô tả ngắn',
                fieldName: 'shortDescription',
                type: 'textarea'
            },
            fieldIdList: {
                id: 'fieldIdList',
                label: 'Lĩnh vực',
                fieldName: 'fieldIdList',
                type: 'checkbox'
            },
            challenge: {
                id: 'challenge',
                label: 'Mô tả thách thức',
                fieldName: 'challenge',
                type: 'editor'
            },
            solution: {
                id: 'solution',
                label: 'Mô tả giải pháp',
                fieldName: 'solution',
                type: 'editor'
            },
            benefit: {
                id: 'benefit',
                label: 'Mô tả lợi ích',
                fieldName: 'benefit',
                type: 'editor'
            },
        }
    }
}