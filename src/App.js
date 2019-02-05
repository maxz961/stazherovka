import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { browserHistory } from 'react-router'
import {Redirect } from 'react-router'
import './App.css';
import Login from './pages/Login'
import Obautus from './pages/Obautus'
import Profile from './pages/Profile'
import Registration from './pages/Registration'
import Tabs from './components/Tabs'


class App extends Component {

  // checkLogin = () => {
  //   const login = window.localStorage.getItem('rr_login')
  //   if(login === 'admin') {
  //     console.log('пропусти')
  //   }
  // }

  render() {
    return (


      <Router>
        <div>
        <Tabs />
          <Route exact path="/" component={Obautus} />
          <Route path="/Login" component={Login} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Registration" component={Registration} />
        </div>
      </Router>
    );
  }
}

export default App;
