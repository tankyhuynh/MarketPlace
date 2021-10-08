const fieldFormatter = ({ value }) => { 
  return <span style={{textTransform: 'uppercase'}}>{value ? value.name : ''}</span> 
};
const actionFormatter = ({ value }) => { 
  return (
    <div>{ value }</div>
  )
};

export const columns = [
    { field: 'id', headerName: 'ID', width: 10 }, 
    {
      field: 'name',
      headerName: 'Tên dự án',
      width: 350,
      editable: true,
    },
    {
      field: 'field',
      headerName: 'Lĩnh vực',
      width: 150,
      editable: true,
      renderCell: fieldFormatter
    },
    {
      field: 'date',
      headerName: 'Ngày gửi',
      width: 150,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      editable: true,
      renderCell: actionFormatter
    },
 
  ];
  