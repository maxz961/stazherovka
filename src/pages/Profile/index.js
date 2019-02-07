import React from 'react'
import Button from '@material-ui/core/Button';
import {Redirect } from 'react-router'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import OpenDialog from './OpenDialog'
import axios from '../../axios.config'
import AdminProfile from './AdminProfile'
import './Profile.css'

const id = window.localStorage.getItem('rr_id')
const token = window.localStorage.getItem('rr_login')


class Profile extends React.Component {

    state = {
        oldName: 'Имя пользователя',
        oldInfo: 'Информация пользователя',
        nameProfile: 'Имя пользователя',
        infoProfile: 'Информация пользователя',
        isAdmin: false,
        newAdmin: false
    }

    checkUsers = (login) => {
        console.log('login', login);
        
    }

    handleSubmit = () => {
        window.localStorage.clear()
        this.props.history.push('/')
    }

    handleChange = (target) => {
        this.setState({ [target.id]: target.value})

    }

    saveClick = (target) => {
        const {nameProfile, infoProfile} = this.state
        
        // axios.put(`/user/${id}`, token, {isAdmin: true})
        // .then((response) => {
        //     console.log('PUT', response)
        //     this.get_profile(id, token)
        // })
        // .then((error) => {
        //     console.log('PUTR', error);
        // })
        
        this.setState({
            ...this.state, oldName: nameProfile, oldInfo: infoProfile, newAdmin: target.value, isAdmin: target.value
        })
    }

    notSave = () => {
        const {oldName, oldInfo} = this.state
        this.setState({
            ...this.state, nameProfile: oldName, infoProfile: oldInfo
        })
    }

    get_profile = (id, token) => {
        axios.get(`/user/${id}`, token)
        .then((response) => {
            console.log('RES', response)
            this.setState({
                oldName: response.data.name,
                oldInfo: response.data.email,
                nameProfile: response.data.name,
                infoProfile: response.data.email,
                isAdmin: response.data.isAdmin,
                newAdmin: response.data.isAdmin
            })
        })
        .then((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.get_profile(id, token)
    }


    render() {
        console.log('state', this.state)
        
        const {nameProfile, infoProfile, oldName, oldInfo, isAdmin, newAdmin} = this.state
        const token = window.localStorage.getItem('rr_login')
        const isToogle = isAdmin === 'true' ? true : false
        const isRedirect = newAdmin === 'true' ? true : false


        if(isRedirect === false || newAdmin === false) {
   
        return token === null ? ( <Redirect to="/"/>) : (


            <div className="Pages__center">
                <h1>Страница профиля</h1>
                <Grid container justify="center" alignItems="center" className="bg1">
                    <Avatar alt="Remy Sharp" src="https://banner2.kisspng.com/20180630/bo/kisspng-user-profile-computer-icons-button-boy-avatar-5b3823c89f5112.6571683615304058326526.jpg"
                     id='Prof__avatar' />
                </Grid>
                <h1>{oldName}</h1>
                <p>{oldInfo}</p>
                <p>Статус Пользователя: {newAdmin === 'true' ? ' Админ' : ' Пользователь'}</p>
                <OpenDialog  isAdmin={isToogle}
                 propsHuck={this.handleChange} nameProfile={nameProfile}
                  infoProfile={infoProfile} saveClick={this.saveClick} notSave={this.notSave}/>

                <Button type="submit"
                    variant="outlined" 
                    color="primary"
                    onClick={this.handleSubmit}>
                Выход
           </Button>
            </div>
        )
        }

        if(isRedirect === true || newAdmin === true) {
            return token === null ? ( <Redirect to="/"/>) : ( <AdminProfile />)
                   
        }
    }
}

export default Profile