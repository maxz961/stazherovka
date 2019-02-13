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
import Chat from './pages/Chat/ChatItem'





class App extends Component {

  state = {
    tokenApp: window.localStorage.getItem('rr_login')
  }

  relogKey = () => {
    this.setState({
      tokenApp: null
    })
  }

  relogkeyLogin = () => {
    this.setState({
      tokenApp: window.localStorage.getItem('rr_login')
    })
  }

  render() {
    const {tokenApp} = this.state
    return (


      <Router>
        <div>
        <Tabs tokenApp={tokenApp}/>
          <Route exact path="/" component={Obautus} />
          <Route path="/Login" render={() => <Login tokenApp={tokenApp} relogkeyLogin={this.relogkeyLogin}/>} />
          <Route exact path="/Posts" component={Posts} />
          <Route path="/Profile/:id" render={() => <Profile relogKey={this.relogKey}/>}/>
          <Route path="/Registration" component={Registration} />
          <Route path={`/Posts/:post`} component={PostPage} />
          <Route path={`/Chat`} component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
