import dateFormat from 'dateformat';

// const fieldFormatter = ({ value }) => { 
//   const levelsFormated = value.length ? value.map(level => {
//       return level.developmentLevel.name 
//     })
//     : null

//     return levelsFormated.join(', ')
// };
const dateFormatter = ({ value }) => { 
    return  dateFormat(value, "HH:MM, dddd, mmmm dS, yyyy") 
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
      width: 90 
    }, 
    {
      field: 'name',
      headerName: 'Tên dự án',
      width: 350,
      editable: false,
    },
    {
      field: 'author',
      headerName: 'Tác giả',
      width: 250,
      editable: false,
    },
    // {
    //   field: 'commercialDevelopmentLevelList',
    //   headerName: 'Lĩnh vực',
    //   width: 250,
    //   editable: false,
    //   renderCell: fieldFormatter
    // },
    {
      field: 'createdDate',
      headerName: 'Ngày gửi',
      width: 250,
      editable: false,
      renderCell: dateFormatter
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      editable: false,
      renderCell: actionFormatter
    },
 
  ];
  