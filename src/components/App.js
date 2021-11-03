
import "@material-tailwind/react/tailwind.css";

import React from 'react';
import { withRouter } from 'react-router-dom';
import Router from './Router'

import Header from "./Header/HeaderUser";
import HeaderAdmin from "./Header/HeaderAdmin";
import Footer from './Footer'
import ResearcherNavbar from './Researcher/ResearcherNavbar/ResearcherNavbar';
import AdminNavbar from './Admin/Admin-Navbar';
import Loader from './Loader';

import { useSelector } from "react-redux";


export default withRouter(function App() {
  // const [currentPath, setCurrentPath] = useState(location.pathname);

  const isLoadingSelector = useSelector(state => state.load.isLoading);

  const renderHeader = () =>{
        if( window.location.pathname !== '/auth/signin' 
            && window.location.pathname !== '/auth/signup'
            // && window.location.pathname !== '/researchers' 
        ){
              return <Header />
        }
        if( window.location.pathname === '/researchers' ){
          return <ResearcherNavbar />
        }
        if( window.location.pathname === '/admin' ){
          return <AdminNavbar />
        }
  };

  const renderApp = () => {
    if( window.location.pathname.startsWith('/admin')){
      return renderAppAdmin();
    }
    return renderAppUser();
  }
  const renderAppUser = () => {
    return (
      <div className="xl:w-full font-Roboto"> 
          <div className="">{ renderHeader() }</div>
          <div className="container min-h-screen mx-auto">
              <Router />
          </div>
          <div>
            <Footer />
          </div>
      </div>
    )
  }
  const renderAppAdmin = () => {
    return (
      <div className="container flex mx-auto debug-screens" id="layout">
        <AdminNavbar />
        <div 
          className="w-full border-l-2 sm:w-3/4 lg:w-5/6 xl:w-full" 
          id="mainContainer"
        >
            <HeaderAdmin />
            <div className="m-12">
              <Router />
            </div>
        </div>
      </div>

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




