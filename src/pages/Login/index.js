import React, {Component} from 'react'
import FormsLogin from '../../components/FormsLogin'
import './Login.css'


class Login extends Component {

    checkLogin = (login) => {
        console.log('TOKLOG', login.user._id)
        if(login.token !== null) {
            console.log('Прыгаем', this.context)
            this.props.history.push('/Profile/:id')
            window.localStorage.setItem('rr_id', login.user._id)
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