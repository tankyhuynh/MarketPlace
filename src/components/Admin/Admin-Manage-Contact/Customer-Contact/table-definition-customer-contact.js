const genderFormatter = ({ value }) => { 
  if(value){
    return <span style={{fontStyle: 'italic'}}>{value ? 'Nam' : 'Nu'}</span> 
  }
  return <span style={{fontStyle: 'italic'}}>{value}</span> 
};
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex">{ value }</div>
  )
};

const statusFormatter = ({ value }) => { 
  return (
    <div className={`bg-${value ? (value === true ? 'green' : 'red') : 'yellow'}-500 rounded-2xl text-center w-full mx-4 text-white`}>
        { value ? (value === true ? 'Đã phản hồi' : 'Chưa phản hồi') : '' }
      </div>
  )
};

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90,
    type: 'text' ,
    isShow: false,
  },
  {
    field: 'replied',
    headerName: 'Trạng thái',
    width: 150,
    editable: false,
    renderCell: statusFormatter
  },
  {
    field: 'name',
    headerName: 'Tên sản phẩm',
    width: 450,
    editable: false,
    type: 'text',
    isShow: true,
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
  },
  {
    field: 'content',
    headerName: 'Nội dung liên hệ',
    width: 350,
    editable: true,
    type: 'textarea',
    isShow: true,
    // renderCell: actionFormatter,
  },
  {
    field: 'reply',
    headerName: 'Nội dung phản hồi',
    width: 350,
    editable: true,
    type: 'editor',
    isShow: true,
    // renderCell: actionFormatter,
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
  },

];
