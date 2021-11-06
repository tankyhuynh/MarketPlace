// const fieldFormatter = ({ value }) => { 
//   return <span style={{textTransform: 'uppercase'}}>{value ? value.name : ''}</span> 
// };
// const actionFormatter = ({ value }) => { 
//   return (
//     <div className="flex">{ value }</div>
//   )
// };
// projectId;
// fullName;
// phoneNumber;
// email;
// content;
export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90,
    type: 'text' ,
    isShow: false,
  }, 
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
  },
  {
    field: 'title',
    headerName: 'Tiêu đề',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
  },
  {
    field: 'content',
    headerName: 'Nội dung liên hệ',
    width: 150,
    editable: true,
    type: 'textarea',
    isShow: true,
    // renderCell: actionFormatter,
  },

];
