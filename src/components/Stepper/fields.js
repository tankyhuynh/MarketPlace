export const fields = {
    generalInfo: {
        companyName: {
            id: 'companyName',
            label: 'Tên doanh nghiệp',
            fieldName: 'companyName',
            type: 'text',
            isRequired: true
        },
        author: {
            id: 'author',
            label: 'Nhóm tác giả',
            fieldName: 'author',
            type: 'text',
            isRequired: true
        },
        address: {
            id: 'address',
            label: 'Địa chỉ',
            fieldName: 'address',
            type: 'text',
            isRequired: true
        },
        phoneNumber: {
            id: 'phoneNumber',
            label: 'Số điện thoại',
            fieldName: 'phoneNumber',
            type: 'text',
            isRequired: true
        },
        fax: {
            id: 'fax',
            label: 'Fax',
            fieldName: 'fax',
            type: 'text',
            isRequired: false
        },
        email: {
            id: 'email',
            label: 'Email',
            fieldName: 'email',
            type: 'email',
            isRequired: true
        },
        website: {
            id: 'website',
            label: 'Website',
            fieldName: 'website',
            type: 'text',
            isRequired: false
        },
    },
    productInfo: {
        commercial: {
            name: {
                id: 'name',
                label: 'Tên giải pháp, sản phẩm',
                fieldName: 'name',
                type: 'text',
                isRequired: true
            },
            shortDescription: {
                id: 'shortDescription',
                label: 'Mô tả ngắn',
                fieldName: 'shortDescription',
                type: 'textarea',
                isRequired: true
            },
            process: {
                id: 'process',
                label: 'Mô tả quy trình công nghệ',
                fieldName: 'process',
                type: 'editor',
                isRequired: true
            },
            fieldIdList: {
                id: 'fieldIdList',
                label: 'Lĩnh vực',
                fieldName: 'fieldIdList',
                type: 'checkboxTreeView',
                isRequired: true
            },
            advantage: {
                id: 'advantage',
                label: 'Ưu điểm',
                fieldName: 'advantage',
                type: 'editor',
                isRequired: true
            },
            comDevLevel: {
                id: 'comDevLevel',
                label: 'Mức độ phát triển',
                fieldName: 'comDevLevel',
                type: 'checkbox',
                isRequired: true
            },
            comTransMethod: {
                id: 'comTransMethod',
                label: 'Phương thức chuyển giao',
                fieldName: 'comTransMethod',
                type: 'checkbox',
                isRequired: true
            },
            scope: {
                id: 'scope',
                label: 'Phạm vi thương mại hóa',
                fieldName: 'scope',
                type: 'text',
                isRequired: true
            },
            price: {
                id: 'price',
                label: 'Chào giá tham khảo',
                fieldName: 'price',
                type: 'text',
                isRequired: false
            },
            productImage: {
                id: 'productImage',
                label: 'Hình ảnh tổng thể',
                fieldName: 'productImage',
                type: 'image',
                isRequired: true
            },
        },
        researching: {
            name: {
                id: 'name',
                label: 'Tên giải pháp, sản phẩm',
                fieldName: 'name',
                type: 'text',
                isRequired: true
            },
            shortDescription: {
                id: 'shortDescription',
                label: 'Mô tả ngắn',
                fieldName: 'shortDescription',
                type: 'textarea',
                isRequired: true
            },
            // fieldIdList: {
            //     id: 'fieldIdList',
            //     label: 'Lĩnh vực',
            //     fieldName: 'fieldIdList',
            //     type: 'checkboxTreeView',
            //     isRequired: true
            // },
            challenge: {
                id: 'challenge',
                label: 'Mô tả thách thức',
                fieldName: 'challenge',
                type: 'editor',
                isRequired: true
            },
            solution: {
                id: 'solution',
                label: 'Mô tả giải pháp',
                fieldName: 'solution',
                type: 'editor',
                isRequired: true
            },
            benefit: {
                id: 'benefit',
                label: 'Mô tả lợi ích',
                fieldName: 'benefit',
                type: 'editor',
                isRequired: true
            },
            productImage: {
                id: 'productImage',
                label: 'Hình ảnh tổng thể',
                fieldName: 'productImage',
                type: 'image',
                isRequired: true
            },
        }
    }
}