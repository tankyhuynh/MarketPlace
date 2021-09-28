/* eslint-disable no-unused-vars */
import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'

import { signOut } from '../../../actions/auth';
import { connect } from 'react-redux';

const ResearcherNavbar = (props) => {
    
    const [cookies, setCookie, removeCookie] = useCookies(['fullName']);
    const onLogOut = () => {
      removeCookie("fullName");
      props.signOut();
    }

    return (

      <nav 
        className="relative flex flex-wrap items-center justify-between px-2 mb-3"
        style={{ backgroundColor: '#0065C1' }}
      >
          <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
            <div className="relative flex justify-between w-full px-4 lg:w-auto lg:static lg:block lg:justify-start">
              <Link 
                to={'/'}
                className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-nowrap" 
              >
                  <div className="flex">
                      <img 
                        className="h-16" 
                        src={logo}
                        alt="logo"
                      />
                      <div className="self-center header--title">
                        ctu market place
                      </div>
                  </div>
              </Link>
              <button className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none" type="button">
                <span className="relative block w-6 h-px bg-white rounded-sm"></span>
                <span className="relative block w-6 h-px mt-1 bg-white rounded-sm"></span>
                <span className="relative block w-6 h-px mt-1 bg-white rounded-sm"></span>
              </button>
            </div>
            <div className="items-center flex-grow lg:flex" id="example-navbar-warning">
              <ul className="flex flex-col ml-auto list-none lg:flex-row">
                  <li className="nav-item">
                      <button  
                        onClick={ () => onLogOut() }
                        className="hidden float-right px-4 py-2 text-white bg-red-500 rounded-lg lg:block"
                      >
                          Đăng xuất
                      </button>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
    );
}

export default connect(null, { signOut })(ResearcherNavbar)