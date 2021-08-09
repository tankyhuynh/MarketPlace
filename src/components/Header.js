import './Header.css'

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import GoogleAuth from './GoogleAuth';
import logo from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
  headerBackground: {
    backgroundColor: '#0065C1'
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
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const renderUserProfile = () =>{
    if(props.currentUserId){
      return (
        <div className="flex items-center gap-2">
          {props.currentUsername}
          <GoogleAuth />
          
        </div>
      );
    }
    else {
      return (
        <>
          {/* <GoogleAuth /> */}
          <div className="flex gap-1">
              <Link to="/auth/signin" className="p-3 bg-green-500 rounded-lg ">Login</Link>
              <Link to="/auth/signup" className="p-3 bg-gray-500 rounded-lg ">SignUp</Link>
          </div>
        </>
      )
    }
  }

  const renderAccountMenu = () => {
    if(props.isSignedIn){
      return (
        <div>
          <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                  <Badge color="secondary">
                    <ExitToAppIcon />
                  </Badge>
                </IconButton>
                <p>Sign out</p>
          </MenuItem>
          <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                  <Badge color="secondary">
                    <AccountCircle />
                  </Badge>
                </IconButton>
                <p>Profile</p>
          </MenuItem>
        </div>
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
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      
      {renderAccountMenu()}

      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  

  return (
    <div className={`${classes.grow} debug-screens`}>
      <AppBar position="static" className={`${classes.headerBackground}`}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Link 
              className="flex items-center"
              to="/"
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

          <div className={`${classes.search} space-x-16 mx-8 h-10 flex`}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={`${classes.sectionDesktop} flex gap-2`}>
            <div className="m-auto">
                { renderUserProfile() }
                {/* Hello Tran Van A */}
            </div>
                {renderAccount()}
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
      <section className={`${classes.headerBackground} px-4 md:px-8`}>
        <div className={`flex text-white`}>
          <Link to="/" className="header--link">Trang chủ</Link>
          <Link to="/projects" className="header--link">Dự án</Link>
          <Link to="/" className="header--link">Nhóm nghiên cứu</Link>
          <Link to="/" className="header--link">Nổi bật</Link>
          <Link to="/" className="header--link">FAQ</Link>
          <Link to="/" className="header--link">Liên hệ</Link>
          <Link to="/" className="header--link">Giới thiệu</Link>
          {/* <Link to="/streams" className="header--link">Streams</Link> */}
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
      currentUsername: state.auth.username,
      isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, {})(Header)
