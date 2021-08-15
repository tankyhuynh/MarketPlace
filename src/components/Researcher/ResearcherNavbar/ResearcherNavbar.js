import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'
import { alpha, makeStyles } from '@material-ui/core/styles';

import logo from '../../../assets/logo.png'

const ResearcherNavbar = () => {
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

    const classes = useStyles();

    return (
        <>
            <div className="flex items-center justify-center h-16 text-xl font-bold bg-blue-400">
            <AppBar position="static" className={`${classes.headerBackground}`}>
                <Toolbar>

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

                </Toolbar>
            </AppBar>
            </div>
        </>
    );
}

export default ResearcherNavbar;