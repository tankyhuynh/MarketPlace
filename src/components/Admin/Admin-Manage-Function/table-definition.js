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
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 350,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    editable: true,
    renderCell: roleFormatter,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 130,
    editable: false,
    renderCell: actionFormatter,
  },

];
