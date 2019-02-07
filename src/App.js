import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Obautus from './pages/Obautus'
import Profile from './pages/Profile'
import Registration from './pages/Registration'
import Tabs from './components/Tabs'
import Posts from './pages/Posts'
import PostPage from './pages/PostPage'



class App extends Component {

  render() {
    return (


      <Router>
        <div>
        <Tabs />
          <Route exact path="/" component={Obautus} />
          <Route path="/Login" component={Login} />
          <Route path="/Posts" component={Posts} />
          <Route path="/Post/:post" component={PostPage} />
          <Route path="/Profile/:id" component={Profile}/>
          <Route path="/Registration" component={Registration} />
        </div>
      </Router>
    );
  }
}

export default App;
