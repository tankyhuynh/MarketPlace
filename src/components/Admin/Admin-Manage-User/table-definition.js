const genderFormatter = ({ value }) => { 
    return <span style={{fontStyle: 'italic'}}>{value === 0 ? 'Nam' : 'Nữ'}</span> 
};
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex">{ value }</div>
  )
};

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90 
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
