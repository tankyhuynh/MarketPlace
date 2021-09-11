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
  { id: 1, code: 'THEO_DON_DAT_HANG', name: 'Theo đơn đặt hàng' },
  { id: 2, code: 'BAN_TRUC_TIEP', name: 'Bán trực tiếp' },
  { id: 3, code: 'DAO_TAO', name: 'Đào tạo' }
];