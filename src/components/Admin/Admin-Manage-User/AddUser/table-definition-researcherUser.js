const genderFormatter = ({ value }) => { 
  return <span style={{fontStyle: 'italic'}}>{value ? 'Nam' : 'Nu'}</span> 
};
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex">{ value }</div>
  )
};

// private String fullName;
// private String avatar;
// private String email;
// private String phoneNumber;
// private String address;
// private String dob;
// private String bio;
// private String website;
// private String qualification;
// private Integer gender;
// private Long domainId;
// private String username;

export const columns = [
  // { 
  //   field: 'id', 
  //   headerName: 'ID', 
  //   width: 90 
  // },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'website',
    headerName: 'Website',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 150,
    editable: true,
    renderCell: genderFormatter,
    type: 'combobox'
  },

  {
    field: 'domainId',
    headerName: 'Tên miền',
    width: 300,
    editable: true,
    type: 'combobox',
    data: 'domains',
    parent: 'domain'
  },
  {
    field: 'roleId',
    headerName: 'Vai trò',
    width: 300,
    editable: false,
    type: 'combobox',
    data: 'roles',
    parent: 'role'
  },
  {
    field: 'dob',
    headerName: 'Ngày sinh',
    width: 150,
    editable: true,
    isShow: true,
    // renderCell: genderFormatter,
    type: 'date'
  },
  {
    field: 'qualification',
    headerName: 'Trình độ chuyên môn',
    width: 150,
    editable: true,
    isShow: true,
    // renderCell: genderFormatter,
    type: 'text'
  },
  {
    field: 'username',
    headerName: 'Tên đăng nhập',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'password',
    headerName: 'Mật khẩu',
    width: 300,
    editable: true,
    isShow: true,
    type: 'password'
  },
  // {
  //   field: 'confirm_password',
  //   headerName: 'Xác nhận mật khẩu',
  //   width: 300,
  //   editable: true,
  //   type: 'password'
  // },

  {
    field: 'bio',
    headerName: 'Tiểu sử',
    width: 150,
    editable: true,
    isShow: true,
    // renderCell: genderFormatter,
    type: 'editor'
  },

  {
    field: 'isEnabled',
    headerName: 'Kích hoạt',
    width: 300,
    editable: true,
    type: 'checkbox'
  },
  {
    field: 'avatar',
    headerName: 'Hình đại diện',
    width: 300,
    editable: true,
    type: 'image'
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
