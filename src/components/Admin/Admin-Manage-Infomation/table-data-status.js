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
  { id: 1, code: 'NHAP', name: 'Nháp' },
  { id: 2, code: 'DA_DUYET', name: 'Đã duyệt' },
  { id: 3, code: 'CHUA_DUYET', name: 'Chưa duyệt' }
];