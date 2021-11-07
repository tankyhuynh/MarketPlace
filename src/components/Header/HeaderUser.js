/* eslint-disable react-hooks/exhaustive-deps */
import './Header.css'
import { ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_NNC, ROLE_USER } from '../../environments/constraints';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { useCookies } from 'react-cookie';

import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import HomeIcon from '@material-ui/icons/Home';
import AndroidIcon from '@material-ui/icons/Android';
import GroupIcon from '@material-ui/icons/Group';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ForwardIcon from '@material-ui/icons/Forward';

import { signOut } from '../../actions/auth';

import Searchbar from '../SearchBar/test';

import logo from '../../assets/logo.png';

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
  // const [cookies, setCookie, removeCookie] = useCookies(['fullName', 'roleCode']);
  // if(props.currentFullName){
  //   setCookie('fullName', props.currentFullName, { path: '/' });
  // }
  // if(props.currentRoleCode){
  //   setCookie('roleCode', props.currentRoleCode, { path: '/' });
  // }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [roleCode, setRoleCode] = useState(null);
  let userDataLocalStorage = localStorage.getItem("userData");
  let user = JSON.parse(userDataLocalStorage);
  let userProfile = user ? user : undefined

  useEffect(() => {
    if(props.userProfile){
      setRoleCode(props.userProfile.role.code)
    }
    userDataLocalStorage = localStorage.getItem("userData");
    user = JSON.parse(userDataLocalStorage);
    userProfile = user ? user : undefined
  }, [userDataLocalStorage])

  const links = [
    {
      path: '/',
      name: 'Trang chủ',
      icon: <HomeIcon />
    },
    {
      path: '/projects',
      name: 'Dự án',
      icon: <AndroidIcon />
    },
    {
      path: '/groups',
      name: 'Nhóm nghiên cứu',
      icon: <GroupIcon /> 
    },
    {
      path: '/hightlights',
      name: 'Nổi bật',
      icon: <Brightness7Icon />
    },
    {
      path: '/faq',
      name: 'FAQ',
      icon: <LiveHelpIcon />
    },
    {
      path: '/contact',
      name: 'Liên hệ',
      icon: <PermContactCalendarIcon />
    },
    {
      path: '/about',
      name: 'Giới thiệu',
      icon: <AnnouncementIcon />
    },
  ]

  const renderLinks = (links, mode, className) => {
    return links.map((link, index) => {
      if(mode === 'web'){
        return (
          <Link to={link.path} className={`header--link ${className}`} key={index}>
            {link.name}
          </Link>
        )
      }
      return (
        <Link to={link.path} className={`header--link ${className}`} key={index}>
          {link.icon}
          {link.name}
        </Link>
      )
    })
  }

  const renderUserOptionsWeb = (className) => {
    return (
        <>
          {renderLinks(links, 'web', className)}
        </>
    )
  }
  const renderUserOptionsMobile = (className) => {
    return (
        <>
          {renderLinks(links, 'mobile', className)}
        </>
    )
  }
  const renderResearcherOptionsWeb = (className) => {
    return (
        <>
            { renderUserOptionsWeb(className) }
        </>
    )
  }

  const renderAdminOptionsWeb = (className) => {
    return (
        <>
            { renderUserOptionsWeb(className) }
        </>
    )
  }

  const renderResearcherOptionsMobile = (className) => {
    return (
        <>
            { renderUserOptionsMobile(className) }
        </>
    )
  }

  const renderOptions = (mode, className) => {
    if(!props.isSignedIn){
      if(mode === 'web'){
        return renderUserOptionsWeb(className);
      }
      return renderUserOptionsMobile(className);
    } 
    
    if(roleCode === ROLE_NNC || roleCode === ROLE_ADMIN || roleCode === ROLE_SUPER_ADMIN){
        if(mode === 'web'){
          if(roleCode === ROLE_NNC){
            return renderResearcherOptionsWeb(className)
          }
          return renderAdminOptionsWeb(className)
        }
        return renderResearcherOptionsMobile(className)
    }
    if(roleCode === ROLE_USER){
        if(mode === 'web'){
          return renderUserOptionsWeb(className)
        }
        return renderUserOptionsMobile(className)
    }
  }

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


  const renderAccount = () => {

    if(props.isSignedIn || userProfile){
      let link = '';
      if(userProfile.role.code === ROLE_NNC){
        link = '/researchers';
      }
      if(userProfile.role.code === ROLE_ADMIN || userProfile.role.code === ROLE_SUPER_ADMIN ){
        link = '/admin';
      }

      return (
        <Link to={link}>
          <IconButton
            edge="start"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen} 
            color="inherit"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Link>
      );
    }
  }

  const onLogOut = () => {
    // removeCookie("fullName");
    props.signOut();
  }

  const renderUserProfile = () =>{
    return (
      <>
        {
          userProfile
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


  const renderAccountMenuMobile = () => {
    if(props.isSignedIn || userProfile){
      return (
        <>
          <div className="flex flex-col gap-4 p-2">
            { renderOptions('mobile', 'header--btn') }
            <button 
                className="header--link header--btn"
                onClick={() => onLogOut()}  
              >
                <ForwardIcon />
                Đăng xuất
            </button>
            <button 
                className="header--link header--btn"
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
      {renderAccountMenuMobile()}
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
      
      {renderAccountMenuMobile()}

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

          {/* Search */}
          {/* <div className={`${classes.search} space-x-16 h-10 md:mr-4 flex`}>
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
          </div> */}
          
          <Searchbar />

           {/* end Search */}
           

          <div className={`${classes.sectionDesktop} flex gap-2`}>
              <div className="m-auto">
                  {/* { cookies["fullName"] ? cookies["fullName"] : props.currentFullName }  */}
                  { userProfile ? userProfile.fullName : props.currentFullName}
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
                  {renderOptions('web')}
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
      currentRoleCode: state.auth.userProfile ? state.auth.userProfile.role.code : undefined,
      isSignedIn: state.auth.isSignedIn,
      userProfile: state.auth.userProfile
  };
}

export default connect(mapStateToProps, { signOut })(Header)
