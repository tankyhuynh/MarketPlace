const genderFormatter = ({ value }) => { 
    return <span style={{fontStyle: 'italic'}}>{value === 0 ? 'Nam' : 'Nữ'}</span> 
};
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex">{ value }</div>
  )
};
const statusFormatter = ({ value }) => { 
  return (
    <div className={`bg-${value ? (value === true ? 'green' : 'red') : 'yellow'}-500 rounded-2xl text-center w-full mx-4 text-white`}>
        { value ? (value === true ? 'Đã kích hoạt' : 'Chưa kích hoạt') : 'Chưa kích hoạt' }
      </div>
  )
};

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90 
  },
  {
    field: 'isEnabled',
    headerName: 'Trạng thái',
    width: 150,
    editable: false,
    renderCell: statusFormatter,
    isShow: true,
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 300,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 200,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    width: 300,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 150,
    editable: true,
    renderCell: genderFormatter
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
  },

];
