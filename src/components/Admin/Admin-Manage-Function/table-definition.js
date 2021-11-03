const roleFormatter = ({ value }) => { 
  console.log('roleFormatter: ', value)
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
    width: 90,
    type: 'text' 
  },
  {
    field: 'name',
    headerName: 'Tên',
    width: 150,
    editable: true,
    type: 'text'
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    width: 350,
    editable: true,
    type: 'text'
  },
  {
    field: 'role',
    headerName: 'Vai trò',
    width: 150,
    editable: true,
    renderCell: roleFormatter,
    type: 'combobox',
    data: 'roles'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
  },

];
