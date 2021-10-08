const fieldFormatter = ({ value }) => { 
  const levelsFormated =  value.map(level => {
      return level.developmentLevel.name 
    })

    return levelsFormated.join(', ')
};
const actionFormatter = ({ value }) => { 
    return (
      <div>{ value }</div>
    )
};


export const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 10 
    }, 
    {
      field: 'name',
      headerName: 'Tên dự án',
      width: 350,
      editable: false,
    },
    {
      field: 'commercialDevelopmentLevelList',
      headerName: 'Lĩnh vực',
      width: 150,
      editable: false,
      renderCell: fieldFormatter
    },
    {
      field: 'createdDate',
      headerName: 'Ngày gửi',
      width: 150,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      editable: false,
      renderCell: actionFormatter
    },
 
  ];
  