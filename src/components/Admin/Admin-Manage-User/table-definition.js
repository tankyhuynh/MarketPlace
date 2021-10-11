// const fieldFormatter = ({ value }) => { 
//   return <span style={{textTransform: 'uppercase'}}>{value ? value.name : ''}</span> 
// };
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
    width: 300,
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
    width: 300,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
  },

];
