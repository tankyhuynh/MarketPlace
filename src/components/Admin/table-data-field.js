export const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 650,
      editable: true,
    },
 
  ];
  
  export const rows = [
    { id: 1, code: 'NONG_NGHIEP', name: 'Nông nghiệp' },
    { id: 2, code: 'CHAN_NUOI', name: 'Chăn nuôi' },
    { id: 3, code: 'THUY_SAN', name: 'Thủy sản' }
  ];