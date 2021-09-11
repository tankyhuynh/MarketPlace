import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import SignIn from "./Auth/SignIn/SignIn";
import Home from "./Home/Home";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

// import Test from "./Test/TestEditables";
// import Test from "./Test/TestCKEditor";
import Test from "./Test/Test";

import SignUp from './Auth/SignUp/SignUp';

import Researcher_Home from './Researcher/Researcher_Home/Researcher_Home';

import ResearcherProject from './Researcher/Researcher_Project/ResearcherProject';

import ProjectCreate from './Projects/ProjectCreate';
import ProjectList from './Projects/ProjectList';
import ProjectShow from './Projects/ProjectShow';
import ReactSlickIntegration from './ImageHoverZoom/ReactSlickIntegration';
import ProjectEdit from './Projects/ProjectEdit';
import FAQ from './FAQ/FAQ';
import OrganizationList from './Organizations/OrganizationList'
import HightLightList from './Hightlights/HightLightList';
import Contact from './Contact/Contact';
import Introduction from './Introduction/Introduction';

import AdminDashboard from './Admin/Admin-Dashboard'
// import GoogleAuth from './GoogleAuth';
// import ProjectShow from './Projects/ProjectDefault/ProjectShow';

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}></Route>

            <Route path="/auth/signin" exact component={SignIn}></Route>
            <Route path="/auth/signup" exact component={SignUp}></Route>

            <Route path="/projects" exact component={ProjectList}></Route>
            <Route path="/projects/show/:id" exact component={ProjectShow}></Route>
            <PrivateRoute path="/projects/edit/:id" exact component={ProjectEdit}></PrivateRoute>
            <PrivateRoute path="/projects/new" exact component={ProjectCreate}></PrivateRoute>

            <Route path="/organizations" exact component={OrganizationList}></Route>

            <Route path="/hightlights" exact component={HightLightList}></Route>

            <Route path="/faq" exact component={FAQ}></Route>
            
            <Route path="/contact" exact component={Contact}></Route>
            
            <Route path="/introduction" exact component={Introduction}></Route>

            <PrivateRoute path="/researchers" exact component={Researcher_Home}></PrivateRoute>
            <PrivateRoute path="/researchers/projects" exact component={ResearcherProject}></PrivateRoute>

            <PrivateRoute path="/streams" exact component={StreamList}></PrivateRoute>
            <PrivateRoute path="/streams/new" exact component={StreamCreate}></PrivateRoute>
            <PrivateRoute path="/streams/edit/:id" exact component={StreamEdit}></PrivateRoute>
            <PrivateRoute path="/streams/delete/:id" exact component={StreamDelete}></PrivateRoute>
            <PrivateRoute path="/streams/:id" exact component={StreamShow}></PrivateRoute>

            <Route path="/adminPage" exact component={AdminDashboard}></Route>


            <Route path="/test" exact component={Test}></Route>
            <Route path="/example" exact component={ReactSlickIntegration}></Route>

        </Switch>
    )
}

export default Router;