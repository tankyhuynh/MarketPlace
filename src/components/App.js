import './App.css'

import "@material-tailwind/react/tailwind.css";

import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
// import history from "../history";
import SignIn from "./Auth/SignIn/SignIn";
import Header from "./Header";
import Home from "./Home/Home";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Test from "./Test/Test";
import SignUp from './Auth/SignUp/SignUp';

import Researcher_Home from './Researcher/Researcher_Home/Researcher_Home';
import ResearcherNavbar from './Researcher/ResearcherNavbar/ResearcherNavbar';
import ProjectCreate from './Projects/ProjectCreate';
import ProjectList from './Projects/ProjectList';
import ProjectShow from './Projects/ProjectShow';
import ReactSlickIntegration from './ImageHoverZoom/ReactSlickIntegration';
// import GoogleAuth from './GoogleAuth';
// import ProjectShow from './Projects/ProjectDefault/ProjectShow';


export default withRouter(function App({ location }) {
  // const [currentPath, setCurrentPath] = useState(location.pathname);

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

  // useEffect(() => {
  //   const { pathname } = location;
  //   // setCurrentPath(pathname);

  // }, [location.pathname]);

  return (
    <div className="font-Roboto"> 
       <div> { renderHeader() } </div>
       
       <div className="md:mx-28">
            <Switch>
              <Route path="/" exact component={Home}></Route>

              <Route path="/auth/signin" exact component={SignIn}></Route>
              <Route path="/auth/signup" exact component={SignUp}></Route>

              <Route path="/projects" exact component={ProjectList}></Route>
              <Route path="/projects/show/:id" exact component={ProjectShow}></Route>
              <Route path="/projects/new" exact component={ProjectCreate}></Route>

              <Route path="/researchers" exact component={Researcher_Home}></Route>

              <Route path="/streams" exact component={StreamList}></Route>
              <Route path="/streams/new" exact component={StreamCreate}></Route>
              <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
              <Route path="/streams/delete/:id" exact component={StreamDelete}></Route>
              <Route path="/streams/:id" exact component={StreamShow}></Route>

              <Route path="/test" exact component={Test}></Route>
              <Route path="/example" exact component={ReactSlickIntegration}></Route>

            </Switch>
       </div>
    </div>
  );
});