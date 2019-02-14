import React from 'react'
import Button from '@material-ui/core/Button';
import {Redirect } from 'react-router'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import OpenDialog from './OpenDialog'
import axios from '../../axios.config'
import Admin from './AdminProfile/Admin'
import './Profile.css'

class Profile extends React.Component {

    state = {
        oldName: 'Имя пользователя',
        oldInfo: 'Информация пользователя',
        nameProfile: 'Имя пользователя',
        infoProfile: 'Информация пользователя',
        isAdmin: false,
        newAdmin: false,
        imageFile: '',
        password: ''
    }

    // checkUsers = (login) => {
    //     console.log('login', login);
        
    // }

    handleSubmit = () => {
        window.localStorage.clear()
        this.props.relogKey()
    }

    handleChange = (target) => {
        this.setState({ [target.id]: target.value})

    }

    saveClick = () => {
        const {nameProfile, infoProfile, imageFile} = this.state
        const id = window.localStorage.getItem('rr_login')
        const fd = new FormData()
      
        fd.append('name', nameProfile)
        fd.append('email', infoProfile)
        fd.append('imageFile', imageFile)

        axios.request().put(`user/${id}`)
        .then(res=>{
            console.log(res)
            this.componentDidMount()
        })
        .then(err=>{
            console.log(err)
        })
    }

    notSave = () => {
        const {oldName, oldInfo} = this.state
        this.setState({
            ...this.state, nameProfile: oldName, infoProfile: oldInfo
        })
    }

    saveImgState = (img) => {
        this.setState({
            imageFile: img
        })
    }

    get_profile = (id) => {
        console.log('IDGET', id);
        axios.request().get(`/user/${id}`)
        .then((response) => {
            console.log('RABOTAET',response)
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
        const id = window.localStorage.getItem('rr_id')
        const token = window.localStorage.getItem('rr_login')
        console.log('ID', id)
        console.log('TOKEN', token);
        
        // this.get_profile(id, token)
        if(id ) {
            this.get_profile(id)
        }
    }


    render() {    
        const {nameProfile, infoProfile, oldName, oldInfo, isAdmin, newAdmin} = this.state
        const token = window.localStorage.getItem('rr_login')


        if(newAdmin === false) {
   
        return token === null ? ( <Redirect to="/"/>) : (


            <div className="Pages__center">
                <h1>Страница профиля</h1>
                <Grid container justify="center" alignItems="center" className="bg1">
                    <Avatar alt="Remy Sharp" src="https://banner2.kisspng.com/20180630/bo/kisspng-user-profile-computer-icons-button-boy-avatar-5b3823c89f5112.6571683615304058326526.jpg"
                     id='Prof__avatar' />
                </Grid>
                <h1>{oldName}</h1>
                <p>{oldInfo}</p>
                <p>Статус Пользователя: {newAdmin === true ? ' Админ' : ' Пользователь'}</p>
                <OpenDialog  isAdmin={isAdmin}
                 propsHuck={this.handleChange} nameProfile={nameProfile}
                  infoProfile={infoProfile} saveClick={this.saveClick} notSave={this.notSave}
                  saveImgState={this.saveImgState}
                  />
                  

                <Button type="submit"
                    variant="outlined" 
                    color="primary"
                    onClick={this.handleSubmit}
                    >
                    Выход
                </Button>
            </div>
        )
        }

        if(newAdmin === true) {
            return token === null ? ( <Redirect to="/"/>) : ( <Admin handleSubmit={this.handleSubmit} />)
                   
        }
    }
}

export default Profile