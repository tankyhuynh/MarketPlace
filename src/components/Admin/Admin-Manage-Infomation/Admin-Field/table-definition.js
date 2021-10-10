const categoryFormatter = ({ value }) => { 
  return <span style={{textTransform: 'uppercase'}}>{value ? value.name : ''}</span> 
};
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex my-1">{ value }</div>
  )
};

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 100,
    type: 'text'
  },
  {
    field: 'code',
    headerName: 'Code',
    width: 150,
    editable: true,
    type: 'text'
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    editable: true,
    type: 'text'
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 250,
    editable: true,
    renderCell: categoryFormatter,
    type: 'combobox'
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    editable: false,
    renderCell: actionFormatter,
    type: 'text'
  },

];
