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
    width: 90,
    editable: false,
    type: 'text'
  },
  {
    field: 'name',
    headerName: 'Tên',
    width: 750,
    editable: true,
    type: 'text'
  },
  // {
  //   field: 'content',
  //   headerName: 'Nội dung',
  //   width: 500,
  //   editable: true,
  //   type: 'text'
  // },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
  },

];
