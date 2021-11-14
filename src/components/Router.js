import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import SignIn from "./Auth/SignIn/SignIn";
import Home from "./Home";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

// import Test from "./Test/TestEditables";
// import Test from "./Test/TestCKEditor";
import Test from "./Test/Test";

import SignUp from './Auth/SignUp';

// import Researcher_Home from './Researcher/Researcher_Home/Researcher_Home';
import Researcher_Home from './Researcher/Researcher_Account';

import ResearcherProject from './Researcher/Researcher_Project/ResearcherProject';
import ResearcherGroup from './Researcher/Researcher_Group';

import ProjectCreate from './Projects/ProjectCreate';
import ProjectList from './Projects/ProjectList';
import ProjectShow from './Projects/ProjectShow';
import ReactSlickIntegration from './ImageHoverZoom/ReactSlickIntegration';
import ProjectEdit from './Projects/ProjectEdit';
import FAQ from './FAQ';
import GroupList from './Group/GroupList'
import GroupShow from './Group/GroupShow'
import GroupMemberShow from './Group/Member/index'
import HightLightList from './Hightlights/ProjectList';
import Contact from './Contact';
import About from './About';

import Admin from './Admin';
import AdminDashboard from './Admin/Admin-Manage-Infomation';
import AdminManageProject from './Admin/Admin-Manage-Project';
import AdminManageProject_Edit from './Admin/Admin-Manage-Project/ProjectEdit';
import AdminManageUser from './Admin/Admin-Manage-User';
import AdminManageAddUser from './Admin/Admin-Manage-User/AddUser';
import AdminManageEditUser from './Admin/Admin-Manage-User/EditUser';
import AdminManageDomain from './Admin/Admin-Manage-Domain';
import AdminManageFunction from './Admin/Admin-Manage-Function';
import AdminManageRole from './Admin/Admin-Manage-Role';
import AdminManageAbout from './Admin/Admin-Manage-About';
import AdminAddAbout from './Admin/Admin-Manage-About/AddAbout';
import AdminEditAbout from './Admin/Admin-Manage-About/EditAbout';
import AdminManageGroup from './Admin/Admin-Manage-Group';
import AdminManageAddGroup from './Admin/Admin-Manage-Group/AddGroup';
import AdminManageEditGroup from './Admin/Admin-Manage-Group/EditGroup';
import AdminManageEditGroupAddMember from './Admin/Admin-Manage-Group/EditGroup/AddMember';
import AdminManageContact from './Admin/Admin-Manage-Contact';
import AdminManageFAQ from './Admin/Admin-Manage-FAQ';

// import GoogleAuth from './GoogleAuth';
// import ProjectShow from './Projects/ProjectDefault/ProjectShow';

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}></Route>

            <Route path="/auth/signin" exact component={SignIn}></Route>
            <Route path="/auth/signup" exact component={SignUp}></Route>

            <Route path="/projects" exact component={ProjectList}></Route>
            {/* <Route path="/projects/show/:id" exact component={ProjectShow}></Route> */}
            <Route path="/projects/show/:type/:id" exact component={ProjectShow}></Route>
            {/* <PrivateRoute path="/projects/edit/:id" exact component={ProjectEdit}></PrivateRoute> */}
            <PrivateRoute path="/projects/edit/:type/:id" exact component={ProjectEdit}></PrivateRoute>
            <PrivateRoute path="/projects/new" exact component={ProjectCreate}></PrivateRoute>

            <Route path="/groups" exact component={GroupList}></Route>
            <Route path="/groups/show/:id" exact component={GroupShow}></Route>
            <Route path="/groups/member/show/:id/:roleId" exact component={GroupMemberShow}></Route>

            <Route path="/hightlights" exact component={HightLightList}></Route>

            <Route path="/faq" exact component={FAQ}></Route>
            
            <Route path="/contact" exact component={Contact}></Route>
            
            <Route path="/about" exact component={About}></Route>

            <PrivateRoute path="/researchers" exact component={Researcher_Home}></PrivateRoute>
            <PrivateRoute path="/researchers/projects" exact component={ResearcherProject}></PrivateRoute>
            <PrivateRoute path="/researchers/groups" exact component={ResearcherGroup}></PrivateRoute>

            <PrivateRoute path="/streams" exact component={StreamList}></PrivateRoute>
            <PrivateRoute path="/streams/new" exact component={StreamCreate}></PrivateRoute>
            <PrivateRoute path="/streams/edit/:id" exact component={StreamEdit}></PrivateRoute>
            <PrivateRoute path="/streams/delete/:id" exact component={StreamDelete}></PrivateRoute>
            <PrivateRoute path="/streams/:id" exact component={StreamShow}></PrivateRoute>

            <PrivateRoute path="/admin" exact component={Admin}></PrivateRoute>
            <PrivateRoute path="/admin/informations" exact component={AdminDashboard}></PrivateRoute>
            <PrivateRoute path="/admin/projects" exact component={AdminManageProject}></PrivateRoute>   
            <PrivateRoute path="/admin/projects/edit/:type/:id" exact component={AdminManageProject_Edit}></PrivateRoute>
            <PrivateRoute path="/admin/users" exact component={AdminManageUser}></PrivateRoute>
            <PrivateRoute path="/admin/users/new" exact component={AdminManageAddUser}></PrivateRoute>
            <PrivateRoute path="/admin/users/edit/:id" exact component={AdminManageEditUser}></PrivateRoute>
            <PrivateRoute path="/admin/users/:id" exact component={AdminManageEditUser}></PrivateRoute>
            <PrivateRoute path="/admin/domains" exact component={AdminManageDomain}></PrivateRoute>
            <PrivateRoute path="/admin/functions" exact component={AdminManageFunction}></PrivateRoute>
            <PrivateRoute path="/admin/roles" exact component={AdminManageRole}></PrivateRoute>
            <PrivateRoute path="/admin/faqs" exact component={AdminManageFAQ}></PrivateRoute>
            <PrivateRoute path="/admin/contacts" exact component={AdminManageContact}></PrivateRoute>
            <PrivateRoute path="/admin/abouts" exact component={AdminManageAbout}></PrivateRoute>
            <PrivateRoute path="/admin/abouts/new" exact component={AdminAddAbout}></PrivateRoute>
            <PrivateRoute path="/admin/abouts/edit/:id" exact component={AdminEditAbout}></PrivateRoute>
            <PrivateRoute path="/admin/groups" exact component={AdminManageGroup}></PrivateRoute>
            <PrivateRoute path="/admin/groups/new" exact component={AdminManageAddGroup}></PrivateRoute>
            <PrivateRoute path="/admin/groups/edit/:id" exact component={AdminManageEditGroup}></PrivateRoute>
            <PrivateRoute path="/admin/groups/:id/add-member" exact component={AdminManageEditGroupAddMember}></PrivateRoute>


            <Route path="/test" exact component={Test}></Route>
            <Route path="/example" exact component={ReactSlickIntegration}></Route>

        </Switch>
    )
}

export default Router;