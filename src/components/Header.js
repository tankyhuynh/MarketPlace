import './Header.css'

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

import { signOut } from '../actions';

import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import logo from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "6px 0",
  },
  headerBackground: {
    backgroundColor: '#0065C1',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: 50,
    backgroundColor: alpha(theme.palette.common.white, 0.95),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.75),
    },
    color: 'black',

  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: 0,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = (props) => {
  console.log(props);
  const [cookies, setCookie, removeCookie] = useCookies(['fullName']);
  if(props.currentFullName){
    setCookie('fullName', props.currentFullName, { path: '/' });
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const renderUserOptions = (className) => {
    return (
        <>
          <Link to="/" className={`header--link ${className}`}>Trang chủ</Link>
          <Link to="/projects" className={`header--link ${className}`}>Dự án</Link>
          <Link to="/" className={`header--link ${className}`}>Nhóm nghiên cứu</Link>
          <Link to="/" className={`header--link ${className}`}>Nổi bật</Link>
          <Link to="/" className={`header--link ${className}`}>FAQ</Link>
          <Link to="/" className={`header--link ${className}`}>Liên hệ</Link>
          <Link to="/" className={`header--link ${className}`}>Giới thiệu</Link>
          {/* <Link to="/streams" className="header--link">Streams</Link> */}
        </>
    )
  }
  const renderResearcherOptions = (className) => {
    return (
        <>
            { renderUserOptions(className) }
            <Link to="/projects/new" className={`header--link ${className}`}>Tạo dự án</Link>
        </>
    )
  }

  const renderOptions = (className) => {
    if(!props.isSignedIn) return renderUserOptions(className); 
    
    const roleCode = props.userProfile.role.code;
    console.log('roleCode', roleCode)
    if(roleCode === 'NNC'){
        return renderResearcherOptions(className)
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const onSiginClick = () => {
  //   handleMobileMenuOpen();
  // };

  

  const renderAccount = () => {
    if(props.isSignedIn){
      return (
        <IconButton
          edge="start"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen} 
          color="inherit"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
      );
    }
  }

  const onLogOut = () => {
    removeCookie("fullName");
    props.signOut();
  }

  const renderUserProfile = () =>{
    // console.log('cookieFullName',props.cookieFullName)
    return (
      <>
        {/* <GoogleAuth /> */}
        {
          cookies["fullName"]
          ? (
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                
                <button 
                  onClick={ () => onLogOut() }
                  className="px-4 py-2 bg-red-500 rounded-lg"
                >
                    Đăng xuất
                </button>
              </div>
            )
          : <Link to="/auth/signin" className="px-4 py-2 bg-green-500 rounded-lg ">Đăng nhập</Link>
        }
      </>
    )
  }

  const renderAccountMenu = () => {
    if(props.isSignedIn){
      return (
        <>
          <div className="flex flex-col gap-4 p-2">
            { renderOptions('header--btn') }
            <button 
                className="header--btn"
                onClick={() => onLogOut()}  
              >
                <ExitToAppIcon />
                Đăng xuất
            </button>
            <button 
                className="header--btn"
                onClick={() => onLogOut()}  
              >
                <AccountCircle />
                Profile
            </button>

          </div>
        </>
      );
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      {/* <MenuItem onClick={handleMenuClose}>Sign In</MenuItem> */}
      {/* <Link className="mx-4" to="/auth/signin">Sign In</Link> */}

      {renderAccountMenu()}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      {renderAccountMenu()}

    </Menu>
  );

  

  

  return (
    <div className={`${classes.grow} debug-screens`}>
      <AppBar position="static" className={`${classes.headerBackground}`}>
        <Toolbar>
          <Link 
              to="/"
              className="flex items-center"
          >
            <img 
              className="w-16" 
              src={logo}
              alt="logo"
            />
            <div className="header--title">
              ctu market place
            </div>
          </Link>
          
          {/* divide header with left and right  */}
          <div className={classes.grow} />

          <div className={`${classes.search} space-x-16 h-10 md:mr-4 flex`}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Bạn muốn tìm kiếm gì...?"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={`${classes.sectionDesktop} flex gap-2`}>
              <div className="m-auto">
                  { cookies["fullName"] ? cookies["fullName"] : props.currentFullName } 
              </div>
              <div>
                  {renderAccount()}
              </div>
              <div className="m-auto">
                  { renderUserProfile() }
              </div>
             
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      
      <hr className="h-1" />

          <section className={`${classes.headerBackground} ${classes.header} invisible md:visible`}>
              <div className={`flex gap-2 md:gap-6 text-white px-4 md:px-8`}>
                  {renderOptions()}
              </div>
          </section>
     

      {renderMobileMenu}
      {renderMenu}
      
    </div>
  );  
}



const mapStateToProps = (state) => {
  return { 
      currentUserId: state.auth.userId,
      currentFullName: state.auth.fullName,
      isSignedIn: state.auth.isSignedIn,
      userProfile: state.auth.userProfile
  };
}

export default connect(mapStateToProps, { signOut })(Header)
