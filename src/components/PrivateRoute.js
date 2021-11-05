/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';

import {
  ROLE_SUPER_ADMIN,
  ROLE_ADMIN,
  ROLE_NNC,
  ROLE_USER

} from '../environments/constraints'

const navItems = {
  1: {
      name: 'Quản lý thông tin',
      path: '/admin/informations',
     
  },
  2: {
      name: 'Quản lý dự án',
      path: '/admin/projects',
  },
  3: {
      name: 'Quản lý người dùng',
      path: '/admin/users',
  },
  4: {
      name: 'Quản lý vai trò',
      path: '/admin/roles',
  },
  5: {
      name: 'Quản lý domain',
      path: '/admin/domains',
  },
  6: {
      name: 'Quản lý chức năng',
      path: '/admin/functions',
  },
  7: {
      name: 'Quản lý nhóm nghiên cứu',
      path: '/admin/groups',
  },
  8: {
      name: 'Quản lý FAQ',
      path: '/admin/faqs',
  },
  9: {
      name: 'Quản lý liên hệ',
      path: '/admin/contacts',
  },
  10: {
      name: 'Quản lý dự án',
      path: '/admin/projects',
  },
  12: {
      name: 'Quản lý giới thiệu',
      path: '/admin/abouts',
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = useSelector(state => state.auth.isSignedIn);
  const userDataLocalStorage = localStorage.getItem("userData");
  const user = JSON.parse(userDataLocalStorage);
  const userRole = user ? user.role.code : undefined
  const userFunctions = user ? user.userFunctionList : undefined

  console.log('PrivateRoute: ', Component)

  const renderComponents = (props) => {
    console.log('PrivateRoute location: ', props.location)

    if(isLoggedIn || userRole){
      if(userRole){
        if(props.location.pathname.startsWith('/projects/edit/') || props.location.pathname === '/projects/new'){
            if(userRole !== ROLE_NNC){
              return <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
            }
        }
        if(props.location.pathname.startsWith('/admin')){
            if(userRole !== ROLE_ADMIN && userRole !== ROLE_SUPER_ADMIN){
              return <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
            }

            let canRouterTo = false;
            if(props.location.pathname !== '/admin'){
              if(userFunctions.length){
                canRouterTo = userFunctions.some( userFunction => props.location.pathname.startsWith(navItems[userFunction.function.id].path) && userFunction.isEnable )
              }
              if(!canRouterTo){
                return <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
              }
            }
        }
      }

      return <Component {...props} />
    }

    return <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
  }

  return (
    <Route
      {...rest}
      render={props =>
        // isLoggedIn || userRole
        //   ? (
        //     <Component {...props} />
        //   ) 
        //   : (
        //     <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
        //   )
        renderComponents(props)
      }
    />
  )
}

export default PrivateRoute