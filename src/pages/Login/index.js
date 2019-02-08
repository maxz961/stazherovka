import React, {Component} from 'react'
import FormsLogin from '../../components/FormsLogin'
import {Redirect } from 'react-router'
// import axios from '../../axios.config'
import './Login.css'


// const id = window.localStorage.getItem('rr_id')
// const token = window.localStorage.getItem('rr_login');


class Login extends Component {


    state = {
        id: 'id'
      }
    
    //   get_profile = (id, token) => {
    //     axios.get(`/user/${id}`, token)
    //     .then((response) => {
    //         console.log('RES', response)
    //         this.setState({
    //           id: response.data._id
    //         })
    
    //     })
    //     .then((error) => {
    //         console.log(error)
    //     })
    // }
    
    // componentDidMount() {
    //   console.log('login', token)
    //   if(token !== null) {
    //     console.log('loginIf', token)
    //     this.get_profile(id, token)
    //   }
    // }
    

    checkLogin = (login) => {
        console.log('TOKLOG', login)
        if(login.token !== null) {
            console.log('Прыгаем')
            // this.props.history.push('/Profile/:id')
            window.localStorage.setItem('rr_id', login.user._id)
            this.setState({
                id: login.user._id
            })
            this.props.relogkeyLogin()
        }
    }
 
    render() {
        const {tokenApp} = this.props
        const {id} = this.state
        return tokenApp !== null ? ( <Redirect to={`/Profile/${id}`}/>) :
             (
            <div className="Pages__center">
                <h1>Логин страница</h1>
                <FormsLogin handleTocken = {this.handleTocken} checkLogin={this.checkLogin} />
            </div>
        )
    }
}

export default Login