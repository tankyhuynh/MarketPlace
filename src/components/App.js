import './App.css'

import "@material-tailwind/react/tailwind.css";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import history from "../history";
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
import { connect } from 'react-redux';
import ProjectShow from './Projects/ProjectShow';
import ProjectList from './Projects/ProjectList';


// Xài class + mapStateToProps thì mới ẩn đc header dựa trên pathname
class App extends React.Component {

  render() {
    return (
      <div className="font-Roboto">
        <BrowserRouter history={history}>
          <div>
            {/* <Navbar /> */}
          {/* <Header /> */}
          { window.location.pathname !== '/auth/signin' && window.location.pathname !== '/auth/signup' ? <Header /> : null }
  
            <div className="md:mx-28">
                <Switch>
                    {/* <Route path="/" component={props => <Home {...props} />} />
                    <Route path="/test" component={props => <Test {...props} />} />
                    <Route path="/auth/signin" component={props => <SignIn {...props} />} /> */}
  
  
                    <Route path="/" exact component={Home}></Route>
  
                    <Route path="/auth/signin" exact component={SignIn}></Route>
                    <Route path="/auth/signup" exact component={SignUp}></Route>
  
                    <Route path="/projects" exact component={ProjectList}></Route>
                    <Route path="/projects/:id" exact component={ProjectShow}></Route>
  
                    <Route path="/streams" exact component={StreamList}></Route>
                    <Route path="/streams/new" exact component={StreamCreate}></Route>
                    <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
                    <Route path="/streams/delete/:id" exact component={StreamDelete}></Route>
                    <Route path="/streams/:id" exact component={StreamShow}></Route>
  
                    <Route path="/test" exact component={Test}></Route>
  
                </Switch>
            </div>
  
            {/* <Route path="/admin" exact component={AdminHome}></Route> */}
  
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);

