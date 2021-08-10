import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from '../core/Profile';
import Logout from '../core/Logout';
import SignIn from '../core/SignIn';
import SignUp from '../core/SignUp';
import Home from '../core/Home';
import EditProfile from '../core/EditProfile';
import CreatePost from '../core/CreatePost';
import ProfileA from '../core/ProfileA';
import ProfileF from '../core/ProfileF';
import Search from '../core/Search';
import Main from '../core/Main';
import User from '../core/User';


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component = {Home} />
        <Route path="/signin" exact component = {SignIn} />
        <Route path="/signup" exact component = {SignUp} />
        <Route path="/logout" exact component = {Logout} />
        <Route path="/profile" exact component = {Profile} />
        <Route path="/profile/P" exact component = {Profile} />
        <Route path="/profile/A" exact component = {ProfileA} />
        <Route path="/profile/F" exact component = {ProfileF} />
        <Route path="/profile/edit" exact component = {EditProfile} />
        <Route path="/profile/newpost" exact component = {CreatePost} />
        <Route path="/main" exact component = {Main} />
        <Route path="/search/:word" exact component = {Search} />
        <Route path="/user/:Userid" exact component = {User} />

      </Switch>
    </BrowserRouter>
  )
}

export default Routes;