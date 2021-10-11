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
    headerName: 'Mã',
    width: 150,
    editable: true,
    type: 'text'
  },
  {
    field: 'name',
    headerName: 'Tên',
    width: 250,
    editable: true,
    type: 'text'
  },
  {
    field: 'category',
    headerName: 'Thể loại',
    width: 250,
    editable: true,
    renderCell: categoryFormatter,
    type: 'combobox'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 100,
    editable: false,
    renderCell: actionFormatter,
    type: 'text'
  },

];
