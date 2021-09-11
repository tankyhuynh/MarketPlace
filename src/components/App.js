
import "@material-tailwind/react/tailwind.css";

import React from 'react';
import { withRouter } from 'react-router-dom';
import Router from './Router'

import Header from "./Header";
import ResearcherNavbar from './Researcher/ResearcherNavbar/ResearcherNavbar';
import Loader from './Loader';

import { useSelector } from "react-redux";

import AdminDashboard from "./Admin/Admin-Dashboard"


export default withRouter(function App() {
  // const [currentPath, setCurrentPath] = useState(location.pathname);

  const isLoadingSelector = useSelector(state => state.load.isLoading);

  const renderHeader = () =>{
        if( window.location.pathname !== '/auth/signin' 
            && window.location.pathname !== '/auth/signup'
            && window.location.pathname !== '/researchers' ){
              return <Header />
        }
        else if( window.location.pathname === '/researchers' ){
          return <ResearcherNavbar />
        }
  };

  const renderApp = () => {
    if( window.location.pathname === '/admin'){
      return renderAppAdmin();
    }
    return renderAppUser();
  }
  const renderAppUser = () => {
    return (
      <div className="font-Roboto"> 
          <div className="">{ renderHeader() }</div>
          <div className="md:mx-28">
              <Router />
          </div>
      </div>
    )
  }
  const renderAppAdmin = () => {
    return (
      <AdminDashboard />
    )
  }

  const renderLoading = () => {
    return <Loader />
  }

  return (
    <>
        <div>
            { isLoadingSelector 
              ? (
                  <div className="flex items-center justify-center h-screen">
                    { renderLoading() }
                  </div>
                ) 
              : renderApp()
            }
           
        </div>
        
    </>
  );
});




