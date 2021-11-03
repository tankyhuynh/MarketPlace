const genderFormatter = ({ value }) => { 
  return <span style={{fontStyle: 'italic'}}>{value ? 'Nam' : 'Nu'}</span> 
};
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
    field: 'question',
    headerName: 'Câu hỏi',
    width: 400,
    editable: true,
    type: 'text'
  },
  {
    field: 'answer',
    headerName: 'Câu trả lời',
    width: 400,
    editable: true,
    type: 'text'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
    type: 'text'
  },

];
