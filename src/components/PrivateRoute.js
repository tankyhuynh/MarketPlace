/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';


const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = useSelector(state => state.auth.isSignedIn);
  const userDataLocalStorage = localStorage.getItem("userData");
  const user = JSON.parse(userDataLocalStorage);
  const userProfile = user ? user.role.code : undefined

  return (
    <Route
      {...rest}
      render={props =>
        (isLoggedIn || userProfile) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute