const roleFormatter = ({ value }) => { 
  return <span style={{textTransform: 'uppercase'}}>{value ? value.name : ''}</span> 
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
    field: 'name',
    headerName: 'Tên',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    width: 350,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Vai trò',
    width: 150,
    editable: true,
    renderCell: roleFormatter,
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 130,
    editable: false,
    renderCell: actionFormatter,
  },

];
