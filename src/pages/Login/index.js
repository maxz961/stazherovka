import React, {Component} from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { browserHistory } from 'react-router'
import FormsLogin from '../../components/FormsLogin'
import './Login.css'
import { exact } from 'prop-types';


class Login extends Component {

    checkLogin() {
        const login = window.localStorage.getItem('rr_login')
        if(login === 'admin') {
            console.log('Прыгаем')
            return <Redirect to="/Profile"/>; 
        }
        if(login !== 'admin') {
            console.log('Не прыгаем')
        }
    }

    
    render() {
        // const login = window.localStorage.getItem('rr_login')
        // if(login === 'admin') {
        //     console.log('Прыгаем')
        //     return <Redirect to="/Profile"/>; 
        // }
        return (
            <div className="Pages__center">
                <h1>Логин страница</h1>
                <FormsLogin checkLogin={this.checkLogin} />
            </div>
        )
    }
}

export default Login