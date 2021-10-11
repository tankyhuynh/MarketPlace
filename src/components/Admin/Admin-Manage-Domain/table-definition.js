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
    field: 'code',
    headerName: 'Mã',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên',
    width: 450,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
  },

];
