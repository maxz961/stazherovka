import React, {Component} from 'react'
import { Redirect } from 'react-router'
import FormsLogin from '../../components/FormsLogin'
import './Login.css'


class Login extends Component {

    checkLogin = (login) => {
        console.log('TOKLOG', login)
        if(login !== null) {
            console.log('Прыгаем', this.context)
            this.props.history.push('/Profile')
        }
        if(login !== 'admin') {
            console.log('Не прыгаем')
        }
    }
 
    render() {
        
        return (
            <div className="Pages__center">
                <h1>Логин страница</h1>
                <FormsLogin handleTocken = {this.handleTocken} checkLogin={this.checkLogin} />
            </div>
        )
    }
}

export default Login