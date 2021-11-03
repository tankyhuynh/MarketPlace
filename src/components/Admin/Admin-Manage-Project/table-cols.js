import dateFormat from 'dateformat';

// const fieldFormatter = ({ value }) => { 
//   const levelsFormated = value.length ? value.map(level => {
//       return level.developmentLevel.name 
//     })
//     : null

//     return levelsFormated.join(', ')
// };

const colors = {
  1: {
      color: 'green'
  },
  2: {
      color: 'orange'
  },
  3: {
      color: 'red'
  },
  4: {
      color: 'gray'
  }
}

const statusFormatter = ({ value }) => { 
  return (
    <div className={`bg-${value ? colors[value.id].color : 'yellow'}-500 rounded-2xl text-center w-full mx-4 text-white`}>
        { value ? value.name : '' }
      </div>
  )
};

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
    // {
    //   field: 'projectStatus',
    //   headerName: 'Trạng thái',
    //   width: 150,
    //   editable: false,
    //   renderCell: statusFormatter
    // },
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
      headerName: 'Hành động',
      width: 150,
      editable: false,
      renderCell: actionFormatter
    },
    
 
  ];
  