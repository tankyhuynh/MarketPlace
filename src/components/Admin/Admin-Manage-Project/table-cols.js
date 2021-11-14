import dateFormat from 'dateformat';

const userFormatter = ({ value }) => { 
  return (
    <div>{ value ? value.fullName : '' }</div>
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
    {
      field: 'author',
      headerName: 'Tác giả',
      width: 250,
      editable: false,
    },
    {
      field: 'user',
      headerName: 'Người gửi',
      width: 250,
      editable: false,
      renderCell: userFormatter
    },
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
  